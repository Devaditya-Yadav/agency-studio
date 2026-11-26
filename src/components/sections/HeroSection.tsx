import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(
        '.hero-stagger',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, stagger: 0.11, clearProps: 'transform' }
      ).fromTo(
        '.hero-atelier-card',
        { y: 44, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2 },
        '-=0.75'
      );

      gsap.to('.hero-parallax-seal', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 dappled-sunlight border-b border-[var(--border-subtle)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 space-y-7">
            <div className="hero-stagger inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface border border-[var(--border-subtle)]">
              <span className="w-1.5 h-1.5 rounded-full bg-liid-olive" />
              <span className="text-xs uppercase tracking-eyebrow text-ink-secondary font-medium">
                {t.hero.eyebrow}
              </span>
            </div>

            <div className="hero-stagger">
              <EditorialHeadline
                as="h1"
                prefix={t.hero.headlinePrefix}
                scriptWord={t.hero.headlineScript}
                suffix={t.hero.headlineSuffix}
                className="text-5xl sm:text-6xl lg:text-[4.45rem] leading-[1.06]"
              />
            </div>

            <p className="hero-stagger text-base sm:text-lg text-ink-secondary max-w-xl leading-relaxed font-light">
              {t.hero.subheadline}
            </p>

            {/* Dual Magnetic CTAs */}
            <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton variant="terracotta" href="#contacto">
                <span>{t.hero.primaryCta}</span>
                <ArrowDownRight size={15} strokeWidth={1.7} />
              </MagneticButton>
              <MagneticButton variant="outline" href="#servicios">
                <span>{t.hero.secondaryCta}</span>
              </MagneticButton>
            </div>

            {/* Verified Three Pillars Strip */}
            <div className="hero-stagger pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.22em] text-ink-secondary">
              {t.hero.pillarsStrip.map((pillar, idx) => (
                <React.Fragment key={pillar}>
                  <span>{pillar}</span>
                  {idx < t.hero.pillarsStrip.length - 1 && (
                    <span className="text-liid-olive" aria-hidden="true">
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Tactile Atelier Composition (Travertine, Wax Seal & Linen Ledger) */}
          <div className="lg:col-span-5">
            <div
              data-cursor="feel"
              onPointerMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--sheen-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--sheen-y', `${e.clientY - rect.top}px`);
                card.style.setProperty('--sheen-opacity', '1');
              }}
              onPointerLeave={(e) => {
                e.currentTarget.style.setProperty('--sheen-opacity', '0');
              }}
              className="hero-atelier-card atelier-sheen-card relative rounded-2xl p-7 sm:p-9 bg-editorial travertine-surface border border-[var(--border-strong)] shadow-editorial"
            >
              {/* Top Micro Metadata */}
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink-secondary pb-5 border-b border-[var(--border-subtle)]">
                <span>{t.hero.cardTag}</span>
                <span>ES / GLOBAL</span>
              </div>

              {/* Center Tactile Linen Notebook + Floating Wax Seal */}
              <div className="relative my-7 mx-auto max-w-[290px]">
                {/* Raw Kraft Linen Agenda Card */}
                <div
                  className="rounded-lg p-7 text-center border shadow-whisper"
                  style={{
                    background: 'linear-gradient(155deg, #D5C2AC 0%, #C4AE94 100%)',
                    borderColor: 'rgba(166, 124, 91, 0.38)',
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.28em] mb-3"
                    style={{ color: '#6E5038' }}
                  >
                    ESTUDIO BOUTIQUE
                  </div>
                  <div
                    className="font-display text-2xl tracking-[0.14em] uppercase leading-snug"
                    style={{ color: '#5A3E28' }}
                  >
                    {t.hero.agendaTitle}
                  </div>
                  <div
                    className="w-12 h-px mx-auto my-4"
                    style={{ backgroundColor: 'rgba(110, 80, 56, 0.35)' }}
                  />
                  <div
                    className="font-display text-xs tracking-[0.24em] uppercase"
                    style={{ color: '#6E5038' }}
                  >
                    LIID ESTUDIO
                  </div>
                </div>

                {/* Floating Wax-Paper Monogram Seal */}
                <div className="hero-parallax-seal -mt-7 ml-auto mr-3 w-20 h-20 rounded-full shadow-editorial flex items-center justify-center">
                  <BrandMonogram variant="ivory-seal" size={80} />
                </div>
              </div>

              {/* Editorial Quote & Founder Signature */}
              <blockquote className="font-display italic text-lg sm:text-xl text-ink-heading leading-snug">
                {t.hero.cardQuote}
              </blockquote>

              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs text-ink-accent font-medium">
                  <Sparkles size={13} strokeWidth={1.6} />
                  <span>{t.hero.agendaStatus}</span>
                </div>
                <span className="font-script text-2xl text-ink-heading opacity-90 select-none">
                  Atelier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
