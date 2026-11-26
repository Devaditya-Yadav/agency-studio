import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import {
  MAX_BRAND_NAME_LENGTH,
  MAX_REQUEST_BODY_BYTES,
  sanitizeBrandName,
  synthesizeDiagnosis,
  validateDiagnosisInput,
} from '../src/services/essenceCore.ts';
import { handleEssenceDiagnosisRequest } from '../src/services/essenceMiddleware.ts';
import { translations } from '../src/i18n/translations.ts';

function withTestServer(
  run: (baseUrl: string) => Promise<void>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.url === '/api/essence-diagnosis') {
        handleEssenceDiagnosisRequest(req, res);
        return;
      }
      res.writeHead(404);
      res.end();
    });

    server.listen(0, '127.0.0.1', async () => {
      const { port } = server.address() as AddressInfo;
      try {
        await run(`http://127.0.0.1:${port}`);
        server.close(() => resolve());
      } catch (err) {
        server.close(() => reject(err));
      }
    });
  });
}

describe('essenceCore unit tests', () => {
  it('sanitizes control chars, extra spaces, and caps brandName length', () => {
    const dirty = '  Casa\u0000\n\t  Aura   ' + 'X'.repeat(120);
    const cleaned = sanitizeBrandName(dirty, 'Fallback');
    assert.equal(cleaned.length, MAX_BRAND_NAME_LENGTH);
    assert.ok(cleaned.startsWith('Casa Aura '));
    assert.equal(sanitizeBrandName(12345, 'Fallback'), 'Fallback');
    assert.equal(sanitizeBrandName('   ', 'Fallback'), 'Fallback');
  });

  it('rejects Object.prototype keys and unknown enum values safely', () => {
    const validated = validateDiagnosisInput({
      lang: 'toString',
      stage: '__proto__',
      energy: 'constructor',
      focus: 'valueOf',
      brandName: { nested: true },
    });

    assert.deepEqual(validated, {
      lang: 'es',
      stage: 'logo',
      energy: 'calm',
      focus: 'holistic',
      brandName: 'Tu Marca',
    });
  });

  it('synthesizes bilingual Spanish and English recommendations accurately', () => {
    const esRes = synthesizeDiagnosis({
      lang: 'es',
      stage: 'evolve',
      energy: 'editorial',
      focus: 'visual',
      brandName: 'Atelier Sol',
    });
    assert.equal(esRes.recommendedServiceIndex, 0);
    assert.equal(esRes.palette.length, 4);
    assert.ok(esRes.summary.includes('Atelier Sol'));
    assert.equal(esRes.roadmap.length, 3);

    const enRes = synthesizeDiagnosis({
      lang: 'en',
      stage: 'personal',
      energy: 'warm',
      focus: 'social',
      brandName: 'Casa Brisa',
    });
    assert.equal(enRes.recommendedServiceIndex, 1);
    assert.ok(enRes.archetype.includes('Conscious Guide'));
    assert.ok(enRes.summary.includes('Casa Brisa'));
  });
});

describe('essenceMiddleware HTTP API tests', () => {
  it('returns 200 with security headers for valid POST payload', async () => {
    await withTestServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: 'en',
          stage: 'logo',
          energy: 'calm',
          focus: 'holistic',
          brandName: 'Studio Nord',
        }),
      });

      assert.equal(res.status, 200);
      assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
      assert.equal(res.headers.get('cache-control'), 'no-store');
      assert.match(res.headers.get('content-type') ?? '', /application\/json/);

      const data = (await res.json()) as Record<string, unknown>;
      assert.equal(data.ok, true);
      assert.equal(data.recommendedServiceIndex, 3);
      assert.ok(typeof data.summary === 'string' && data.summary.includes('Studio Nord'));
    });
  });

  it('safely handles prototype-key injection payloads over HTTP', async () => {
    await withTestServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          energy: 'constructor',
          focus: 'toString',
          stage: '__proto__',
        }),
      });

      assert.equal(res.status, 200);
      const data = (await res.json()) as Record<string, unknown>;
      assert.equal(data.ok, true);
      assert.equal(data.recommendedServiceIndex, 3);
      assert.equal(typeof data.archetype, 'string');
    });
  });

  it('returns 400 on malformed or non-object JSON', async () => {
    await withTestServer(async (baseUrl) => {
      const badJson = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{invalid-json',
      });
      assert.equal(badJson.status, 400);

      const arrayBody = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '["not", "an", "object"]',
      });
      assert.equal(arrayBody.status, 400);
    });
  });

  it('returns 405 on GET requests with Allow header', async () => {
    await withTestServer(async (baseUrl) => {
      const res = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'GET',
      });
      assert.equal(res.status, 405);
      assert.equal(res.headers.get('allow'), 'POST');
    });
  });

  it('returns 413 on oversized request bodies', async () => {
    await withTestServer(async (baseUrl) => {
      const oversized = JSON.stringify({
        brandName: 'A'.repeat(MAX_REQUEST_BODY_BYTES + 1024),
      });
      const res = await fetch(`${baseUrl}/api/essence-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: oversized,
      });
      assert.equal(res.status, 413);
    });
  });
});

describe('bilingual translations integrity', () => {
  it('maintains parity between ES and EN dictionaries without real PII', () => {
    assert.equal(translations.es.services.items.length, translations.en.services.items.length);
    assert.equal(translations.es.method.steps.length, translations.en.method.steps.length);
    assert.equal(translations.es.showcase.items.length, translations.en.showcase.items.length);

    const serialized = JSON.stringify(translations);
    assert.doesNotMatch(serialized, /\+34[\s-]?6(?!00[\s-]?000[\s-]?000)\d{2}/);
    assert.doesNotMatch(
      serialized,
      /\b[A-Za-z0-9._%+-]+@(?!example\.com\b|ejemplo\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/
    );
    assert.doesNotMatch(serialized, /instagram\.com\//i);
  });
});
