import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check, Minus } from 'lucide-react';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { ClipRevealBlock, MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const BrandDiagnosisSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.diag-point-row',
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.diag-cards-grid',
            start: 'top 80%',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [lang] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface dappled-sunlight border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium mb-3">
            {t.diagnosis.eyebrow}
          </div>
          <EditorialHeadline
            as="h2"
            prefix={t.diagnosis.titlePrefix}
            scriptWord={t.diagnosis.titleScript}
            suffix={t.diagnosis.titleSuffix}
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
          />
          <MaskedRevealWords
            text={t.diagnosis.intro}
            className="mt-5 text-base sm:text-lg text-ink-secondary font-light"
          />
        </div>

        <ScrollHairline className="mb-12" />

        <div className="diag-cards-grid grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card A: Logo Only */}
          <ClipRevealBlock className="rounded-2xl p-8 sm:p-10 bg-canvas border border-[var(--border-subtle)] flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-ink-secondary px-3 py-1 rounded-full bg-surface border border-[var(--border-subtle)] mb-5">
                {t.diagnosis.logoOnlyTag}
              </span>
              <h3 className="font-display text-3xl text-ink-heading mb-6">
                {t.diagnosis.logoOnlyTitle}
              </h3>
              <ul className="space-y-4">
                {t.diagnosis.logoOnlyPoints.map((pt) => (
                  <li
                    key={pt}
                    className="diag-point-row flex items-start gap-3.5 text-sm sm:text-base text-ink-secondary"
                  >
                    <span className="mt-1 w-5 h-5 rounded-full border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                      <Minus size={12} strokeWidth={1.6} />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ClipRevealBlock>

          {/* Card B: True Brand with Essence */}
          <ClipRevealBlock
            delay={0.12}
            cursorType="explore"
            className="rounded-2xl p-8 sm:p-10 bg-editorial travertine-surface border border-[var(--border-strong)] shadow-editorial flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.2em] text-[var(--action-cta-fg)] px-3 py-1 rounded-full bg-[var(--action-cta-bg)] mb-5">
                {t.diagnosis.trueBrandTag}
              </span>
              <h3 className="font-display text-3xl text-ink-heading mb-6">
                {t.diagnosis.trueBrandTitle}
              </h3>
              <ul className="space-y-4">
                {t.diagnosis.trueBrandPoints.map((pt) => (
                  <li
                    key={pt}
                    className="diag-point-row flex items-start gap-3.5 text-sm sm:text-base text-ink-primary"
                  >
                    <span className="mt-1 w-5 h-5 rounded-full bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={2} />
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 pt-6 border-t border-[var(--border-subtle)]">
              <MagneticButton variant="terracotta" href="#diagnostico-ia">
                {t.diagnosis.ctaPrompt}
              </MagneticButton>
            </div>
          </ClipRevealBlock>
        </div>
      </div>
    </section>
  );
};
