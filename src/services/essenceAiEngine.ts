import {
  type BrandEnergy,
  type BrandFocus,
  type BrandLang,
  type BrandStage,
  type EssenceDiagnosisResult,
  synthesizeDiagnosis,
} from './essenceCore';

export type { BrandEnergy, BrandFocus, BrandLang, BrandStage };

export interface EssenceDiagnosisInput {
  lang: BrandLang;
  stage: BrandStage;
  energy: BrandEnergy;
  focus: BrandFocus;
  brandName?: string;
}

export interface EssenceDiagnosisOutput extends EssenceDiagnosisResult {
  source: 'api' | 'local-engine';
}

function isValidApiResponse(data: unknown): data is { ok: true } & EssenceDiagnosisResult {
  if (!data || typeof data !== 'object') return false;
  const candidate = data as Record<string, unknown>;
  return (
    candidate.ok === true &&
    typeof candidate.archetype === 'string' &&
    typeof candidate.recommendedServiceIndex === 'number' &&
    Array.isArray(candidate.palette) &&
    candidate.palette.every((hex) => typeof hex === 'string' && /^#[0-9A-Fa-f]{6}$/.test(hex)) &&
    typeof candidate.summary === 'string' &&
    Array.isArray(candidate.roadmap) &&
    candidate.roadmap.every((step) => typeof step === 'string')
  );
}

function synthesizeLocally(input: EssenceDiagnosisInput): EssenceDiagnosisOutput {
  return {
    ...synthesizeDiagnosis(input),
    source: 'local-engine',
  };
}

export async function runEssenceDiagnosis(
  input: EssenceDiagnosisInput
): Promise<EssenceDiagnosisOutput> {
  try {
    const res = await fetch('/api/essence-diagnosis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) return synthesizeLocally(input);
    const data: unknown = await res.json();
    if (!isValidApiResponse(data)) return synthesizeLocally(input);
    return {
      archetype: data.archetype,
      recommendedServiceIndex: data.recommendedServiceIndex,
      palette: data.palette,
      summary: data.summary,
      roadmap: data.roadmap,
      source: 'api',
    };
  } catch {
    return synthesizeLocally(input);
  }
}
