import {
  MAX_REQUEST_BODY_BYTES,
  synthesizeDiagnosis,
} from './essenceCore.ts';

export interface MiddlewareRequest {
  method?: string;
  on(event: 'data', listener: (chunk: Uint8Array | string) => void): unknown;
  on(event: 'end', listener: () => void): unknown;
  on(event: 'error', listener: (err: Error) => void): unknown;
  destroy?: () => unknown;
}

export interface MiddlewareResponse {
  writableEnded?: boolean;
  writeHead(statusCode: number, headers?: Record<string, string>): unknown;
  end(body?: string): unknown;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

function concatChunks(chunks: Uint8Array[], totalLength: number): Uint8Array {
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged;
}

function sendJson(
  res: MiddlewareResponse,
  statusCode: number,
  payload: Record<string, unknown>,
  extraHeaders?: Record<string, string>
): void {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  };
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(payload));
}

export function handleEssenceDiagnosisRequest(
  req: MiddlewareRequest,
  res: MiddlewareResponse
): void {
  if (req.method !== 'POST') {
    sendJson(
      res,
      405,
      { ok: false, error: 'Method not allowed' },
      { Allow: 'POST' }
    );
    return;
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  let exceededLimit = false;
  let responded = false;

  const finishTooLarge = () => {
    if (responded) return;
    responded = true;
    sendJson(
      res,
      413,
      { ok: false, error: 'Payload too large' },
      { Connection: 'close' }
    );
  };

  req.on('data', (chunk) => {
    const bytes = typeof chunk === 'string' ? textEncoder.encode(chunk) : chunk;
    totalBytes += bytes.byteLength;

    if (totalBytes > MAX_REQUEST_BODY_BYTES) {
      exceededLimit = true;
      if (totalBytes > MAX_REQUEST_BODY_BYTES * 4) {
        finishTooLarge();
        req.destroy?.();
      }
      return;
    }

    chunks.push(bytes);
  });

  req.on('end', () => {
    if (responded) return;
    if (exceededLimit) {
      finishTooLarge();
      return;
    }

    const raw = textDecoder.decode(concatChunks(chunks, totalBytes)).trim();
    let parsed: unknown = {};

    if (raw.length > 0) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        responded = true;
        sendJson(res, 400, { ok: false, error: 'Invalid JSON payload' });
        return;
      }

      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
        responded = true;
        sendJson(res, 400, { ok: false, error: 'Expected a JSON object body' });
        return;
      }
    }

    const diagnosis = synthesizeDiagnosis(parsed);
    responded = true;
    sendJson(res, 200, {
      ok: true,
      engine: 'liid-essence-synthesizer-v1',
      ...diagnosis,
    });
  });

  req.on('error', () => {
    if (!responded && !res.writableEnded) {
      responded = true;
      sendJson(res, 400, { ok: false, error: 'Request stream error' });
    }
  });
}
