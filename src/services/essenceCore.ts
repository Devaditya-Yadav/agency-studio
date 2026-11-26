export type BrandLang = 'es' | 'en';
export type BrandStage = 'logo' | 'evolve' | 'personal';
export type BrandEnergy = 'calm' | 'editorial' | 'warm';
export type BrandFocus = 'visual' | 'social' | 'holistic';

export interface ValidatedDiagnosisInput {
  lang: BrandLang;
  stage: BrandStage;
  energy: BrandEnergy;
  focus: BrandFocus;
  brandName: string;
}

export interface EssenceDiagnosisResult {
  archetype: string;
  recommendedServiceIndex: number;
  palette: string[];
  summary: string;
  roadmap: string[];
}

export const MAX_BRAND_NAME_LENGTH = 80;
export const MAX_REQUEST_BODY_BYTES = 16 * 1024; // 16 KiB cap

const VALID_LANGS = new Set<string>(['es', 'en']);
const VALID_STAGES = new Set<string>(['logo', 'evolve', 'personal']);
const VALID_ENERGIES = new Set<string>(['calm', 'editorial', 'warm']);
const VALID_FOCUSES = new Set<string>(['visual', 'social', 'holistic']);

const PILLAR_INDEX_MAP: Record<BrandFocus, number> = Object.freeze({
  visual: 0,
  social: 1,
  holistic: 3,
});

const PALETTE_MAP: Record<BrandEnergy, readonly string[]> = Object.freeze({
  calm: Object.freeze(['#FAF8F4', '#DEDAD0', '#8B8563', '#555132']),
  editorial: Object.freeze(['#F2EFE9', '#C8C2B4', '#2A2820', '#983E1B']),
  warm: Object.freeze(['#FAF8F4', '#C9B39B', '#8B8563', '#B65028']),
});

export function sanitizeBrandName(raw: unknown, fallback: string): string {
  if (typeof raw !== 'string') return fallback;
  const cleaned = raw
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_BRAND_NAME_LENGTH);
  return cleaned || fallback;
}

export function validateDiagnosisInput(raw: unknown): ValidatedDiagnosisInput {
  const input =
    raw !== null && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};

  const lang: BrandLang =
    typeof input.lang === 'string' && VALID_LANGS.has(input.lang)
      ? (input.lang as BrandLang)
      : 'es';

  const stage: BrandStage =
    typeof input.stage === 'string' && VALID_STAGES.has(input.stage)
      ? (input.stage as BrandStage)
      : 'logo';

  const energy: BrandEnergy =
    typeof input.energy === 'string' && VALID_ENERGIES.has(input.energy)
      ? (input.energy as BrandEnergy)
      : 'calm';

  const focus: BrandFocus =
    typeof input.focus === 'string' && VALID_FOCUSES.has(input.focus)
      ? (input.focus as BrandFocus)
      : 'holistic';

  const fallbackName = lang === 'en' ? 'Your Brand' : 'Tu Marca';
  const brandName = sanitizeBrandName(input.brandName, fallbackName);

  return { lang, stage, energy, focus, brandName };
}

export function synthesizeDiagnosis(raw: unknown): EssenceDiagnosisResult {
  const { lang, stage, energy, focus, brandName } = validateDiagnosisInput(raw);
  const isEs = lang !== 'en';

  const archetypeMap: Record<BrandEnergy, string> = {
    calm: isEs ? 'El Creador Sereno × El Sabio' : 'The Serene Creator × The Sage',
    editorial: isEs
      ? 'El Creador Editorial × El Soberano Boutique'
      : 'The Editorial Creator × Boutique Sovereign',
    warm: isEs
      ? 'El Guía Consciente × El Creador Humano'
      : 'The Conscious Guide × Human Creator',
  };

  const archetype = archetypeMap[energy];

  const summary = isEs
    ? `${brandName} está lista para trascender ${
        stage === 'logo'
          ? 'la etapa de «tener solo un logo»'
          : stage === 'evolve'
          ? 'una presencia visual fragmentada'
          : 'las fórmulas genéricas de marca personal'
      } hacia un universo propio guiado por el arquetipo ${archetype}.`
    : `${brandName} is ready to move beyond ${
        stage === 'logo'
          ? '“owning just a logo”'
          : stage === 'evolve'
          ? 'a fragmented visual identity'
          : 'generic personal-brand formulas'
      } into a cohesive boutique universe guided by ${archetype}.`;

  const roadmap = isEs
    ? [
        'Inmersión estratégica para escuchar y destilar la verdad diferencial del proyecto.',
        focus === 'visual'
          ? 'Arquitectura visual completa: monograma bespoke, tipografía editorial y sistema 60·30·10.'
          : focus === 'social'
          ? 'Estrategia de Social Media Consciente, narrativa y sistema editorial de plantillas 4:5.'
          : 'Acompañamiento integral 360°: Identidad Visual, Social Media y Dirección Web.',
        'Despliegue de Brand Book y Brand Kit para comunicar con coherencia y calma.',
      ]
    : [
        'Strategic immersion to listen deeply and distill your venture’s authentic differentiation.',
        focus === 'visual'
          ? 'Complete visual architecture: bespoke monogram, editorial typography, and 60·30·10 palette.'
          : focus === 'social'
          ? 'Conscious Social Media strategy, storytelling pillars, and 4:5 editorial grid system.'
          : 'Holistic 360° Creative Partnership: Visual Identity, Social Media, and Web Flagship.',
        'Turnkey Brand Book & Brand Kit deployment for serene, coherent growth.',
      ];

  return {
    archetype,
    recommendedServiceIndex: PILLAR_INDEX_MAP[focus],
    palette: [...PALETTE_MAP[energy]],
    summary,
    roadmap,
  };
}
