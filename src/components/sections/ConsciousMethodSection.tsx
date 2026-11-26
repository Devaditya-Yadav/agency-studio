import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const ConsciousMethodSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.method-progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: '.method-steps-wrap',
            start: 'top 72%',
            end: 'bottom 68%',
            scrub: 0.7,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>('.method-step-card').forEach((card) => {
        const dot = card.querySelector('.method-node-dot');

        gsap.fromTo(
          card,
          {
            clipPath: 'inset(8% 3% 8% 3% round 16px)',
            x: 24,
            opacity: 0,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            x: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: {
              trigger: card,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0.85, backgroundColor: 'var(--bg-canvas)' },
            {
              scale: 1.25,
              backgroundColor: 'var(--action-cta-bg)',
              duration: 0.4,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="metodo"
      ref={containerRef}
      className="py-24 lg:py-32 bg-canvas dappled-sunlight border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium mb-3">
            {t.method.eyebrow}
          </div>
          <EditorialHeadline
            as="h2"
            prefix={t.method.titlePrefix}
            scriptWord={t.method.titleScript}
            suffix={t.method.titleSuffix}
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
          />
          <MaskedRevealWords
            text={t.method.intro}
            className="mt-4 text-base sm:text-lg text-ink-secondary font-light"
          />
        </div>

        <ScrollHairline className="mb-14" />

        {/* Scrubbed Hairline Timeline */}
        <div className="method-steps-wrap relative pl-8 sm:pl-12">
          {/* Background Static Hairline */}
          <div
            aria-hidden="true"
            className="absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-px bg-[var(--border-strong)]"
          />
          {/* GSAP Scrubbed Active Terracotta-Olive Line */}
          <div
            aria-hidden="true"
            className="method-progress-line absolute left-2.5 sm:left-3.5 top-2 bottom-2 w-0.5 bg-[var(--action-cta-bg)]"
          />

          <div className="space-y-10">
            {t.method.steps.map((step) => (
              <div
                key={step.number}
                data-cursor="feel"
                className="method-step-card relative rounded-2xl p-7 sm:p-9 bg-surface border border-[var(--border-subtle)] shadow-whisper"
              >
                {/* Node Dot on Spine */}
                <span
                  aria-hidden="true"
                  className="method-node-dot absolute -left-[1.65rem] sm:-left-[2.4rem] top-9 w-3.5 h-3.5 rounded-full bg-canvas border-2 border-[var(--action-cta-bg)]"
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-liid-olive">
                      {step.number}
                    </span>
                    <h3 className="font-display text-3xl text-ink-heading">
                      {step.phase}
                    </h3>
                  </div>
                  <span className="liid-script-word text-2xl text-ink-accent">
                    {step.scriptWord}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-ink-secondary max-w-2xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
