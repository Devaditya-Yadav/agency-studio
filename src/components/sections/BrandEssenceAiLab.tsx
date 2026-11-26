import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, Check, Sparkles } from 'lucide-react';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { ClipRevealBlock, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAtelierState } from '../../context/AtelierStateContext';
import {
  BrandEnergy,
  BrandFocus,
  BrandStage,
  EssenceDiagnosisOutput,
  runEssenceDiagnosis,
} from '../../services/essenceAiEngine';

export const BrandEssenceAiLab: React.FC = () => {
  const { lang } = useLanguage();
  const { applyDiagnosisToInquiry } = useAtelierState();
  const isEs = lang === 'es';

  const [brandName, setBrandName] = useState('');
  const [stage, setStage] = useState<BrandStage>('logo');
  const [energy, setEnergy] = useState<BrandEnergy>('calm');
  const [focus, setFocus] = useState<BrandFocus>('holistic');
  const [result, setResult] = useState<EssenceDiagnosisOutput | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    runEssenceDiagnosis({ lang, stage, energy, focus, brandName }).then((res) => {
      if (active) {
        setResult(res);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [lang, stage, energy, focus, brandName]);

  const stageOptions: { id: BrandStage; label: string }[] = isEs
    ? [
        { id: 'logo', label: 'Tengo solo un logo / Empezando' },
        { id: 'evolve', label: 'Evolución / Rebranding boutique' },
        { id: 'personal', label: 'Marca Personal con propósito' },
      ]
    : [
        { id: 'logo', label: 'Just a logo / New venture' },
        { id: 'evolve', label: 'Boutique evolution / Rebrand' },
        { id: 'personal', label: 'Soul-led Personal Brand' },
      ];

  const energyOptions: { id: BrandEnergy; label: string }[] = isEs
    ? [
        { id: 'calm', label: 'Calma Mediterránea & Orgánica' },
        { id: 'editorial', label: 'Autoridad Editorial & Lujo Silencioso' },
        { id: 'warm', label: 'Cercanía Humana & Consciente' },
      ]
    : [
        { id: 'calm', label: 'Mediterranean Organic Calm' },
        { id: 'editorial', label: 'Editorial Authority & Quiet Luxury' },
        { id: 'warm', label: 'Warm Human & Conscious Connection' },
      ];

  const focusOptions: { id: BrandFocus; label: string }[] = isEs
    ? [
        { id: 'visual', label: 'Diseño Visual & Identidad' },
        { id: 'social', label: 'Social Media Consciente' },
        { id: 'holistic', label: 'Dirección Integral 360°' },
      ]
    : [
        { id: 'visual', label: 'Visual Design & Identity' },
        { id: 'social', label: 'Conscious Social Media' },
        { id: 'holistic', label: 'Full 360° Creative Direction' },
      ];

  const handleAttachToInquiry = () => {
    if (!result) return;
    const summaryText = isEs
      ? `[Diagnóstico Atelier de Esencia]\n• Arquetipo sugerido: ${result.archetype}\n• Lectura estratégica: ${result.summary}\n• Hoja de ruta:\n  - ${result.roadmap.join('\n  - ')}\n\nContexto adicional de mi proyecto: `
      : `[Essence Atelier Diagnosis]\n• Suggested Archetype: ${result.archetype}\n• Strategic Reading: ${result.summary}\n• Recommended Roadmap:\n  - ${result.roadmap.join('\n  - ')}\n\nAdditional context about my project: `;

    applyDiagnosisToInquiry({
      serviceIndex: result.recommendedServiceIndex,
      prefilledStory: summaryText,
      brandName,
    });
  };

  return (
    <section
      id="diagnostico-ia"
      className="py-24 lg:py-32 bg-canvas border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-liid-olive font-medium mb-3">
            <Sparkles size={14} strokeWidth={1.6} />
            <span>
              {isEs
                ? 'Atelier Interactivo • Diagnóstico Inteligente de Esencia'
                : 'Interactive Atelier • Intelligent Brand Essence Synthesizer'}
            </span>
          </div>
          <EditorialHeadline
            as="h2"
            prefix={isEs ? 'Descubre la arquitectura de tu' : 'Synthesize the architecture of your'}
            scriptWord={isEs ? 'esencia' : 'essence'}
            suffix="."
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
          />
          <p className="mt-4 text-base sm:text-lg text-ink-secondary font-light">
            {isEs
              ? 'Configura en tres pasos el momento actual de tu proyecto para generar una lectura estratégica instantánea y adjuntarla directamente a tu consulta conceptual.'
              : 'Configure three dimensions of your venture to generate a live strategic reading—and attach it directly to your studio inquiry brief.'}
          </p>
        </div>

        <ScrollHairline className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Interactive Controls */}
          <ClipRevealBlock className="lg:col-span-6 rounded-2xl p-7 sm:p-9 bg-surface border border-[var(--border-subtle)] space-y-6">
            <div>
              <label
                htmlFor="essence-brand-name"
                className="block text-xs uppercase tracking-[0.2em] text-ink-secondary mb-2"
              >
                {isEs ? '00 • Nombre de tu marca o proyecto (opcional)' : '00 • Brand or venture name (optional)'}
              </label>
              <input
                id="essence-brand-name"
                type="text"
                maxLength={80}
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder={isEs ? 'Ej. Casa Aura Estudio' : 'e.g. Casa Aura Studio'}
                className="w-full rounded-lg px-4 py-2.5 bg-canvas border border-[var(--border-strong)] text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:border-[var(--action-cta-bg)]"
              />
            </div>

            {/* Step 1 */}
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-liid-olive mb-2.5">
                {isEs ? '01 • Momento actual' : '01 • Current chapter'}
              </span>
              <div className="flex flex-wrap gap-2">
                {stageOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStage(opt.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      stage === opt.id
                        ? 'bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] border-[var(--action-primary-bg)]'
                        : 'bg-canvas text-ink-secondary border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-liid-olive mb-2.5">
                {isEs ? '02 • Energía sensorial deseada' : '02 • Desired sensory energy'}
              </span>
              <div className="flex flex-wrap gap-2">
                {energyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setEnergy(opt.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      energy === opt.id
                        ? 'bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] border-[var(--action-primary-bg)]'
                        : 'bg-canvas text-ink-secondary border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-liid-olive mb-2.5">
                {isEs ? '03 • Prioridad estratégica' : '03 • Strategic priority'}
              </span>
              <div className="flex flex-wrap gap-2">
                {focusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFocus(opt.id)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      focus === opt.id
                        ? 'bg-[var(--action-cta-bg)] text-[var(--action-cta-fg)] border-[var(--action-cta-bg)]'
                        : 'bg-canvas text-ink-secondary border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </ClipRevealBlock>

          {/* Right Synthesized Brief Output */}
          <ClipRevealBlock
            delay={0.12}
            cursorType="feel"
            className="lg:col-span-6 rounded-2xl p-7 sm:p-9 bg-editorial travertine-surface border border-[var(--border-strong)] shadow-editorial flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={`${stage}-${energy}-${focus}-${lang}-${brandName}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: loading ? 0.6 : 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.26em] text-liid-olive">
                        {isEs ? 'ARQUETIPO RECOMENDADO' : 'RECOMMENDED ARCHETYPE'}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl text-ink-heading mt-0.5">
                        {result.archetype}
                      </h3>
                    </div>

                    {/* Curated 60-30-10 Harmony Pills */}
                    <div className="flex items-center gap-1.5" title="60·30·10 Mood Harmony">
                      {result.palette.map((hex) => (
                        <span
                          key={hex}
                          className="w-6 h-6 rounded-full border border-black/15 shadow-xs"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-display text-xl sm:text-2xl text-ink-heading leading-snug">
                    “{result.summary}”
                  </p>

                  <div className="space-y-2.5">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-liid-olive">
                      {isEs ? 'HOJA DE RUTA SUGERIDA' : 'SUGGESTED BOUTIQUE ROADMAP'}
                    </div>
                    {result.roadmap.map((step) => (
                      <div key={step} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-primary">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] flex items-center justify-center shrink-0">
                          <Check size={10} strokeWidth={2.2} />
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <MagneticButton variant="terracotta" onClick={handleAttachToInquiry}>
                <span>
                  {isEs
                    ? 'Adjuntar diagnóstico a mi consulta'
                    : 'Attach diagnosis to my inquiry'}
                </span>
                <ArrowDownRight size={15} strokeWidth={1.7} />
              </MagneticButton>
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-ink-secondary">
                LIID ESSENCE ENGINE • {result?.source === 'api' ? 'LIVE API' : 'READY'}
              </span>
            </div>
          </ClipRevealBlock>
        </div>
      </div>
    </section>
  );
};
