import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { ClipRevealBlock, MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const FounderSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.to('.founder-arch-inner', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      });

      gsap.fromTo(
        '.founder-value-card',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.founder-values-grid',
            start: 'top 86%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="estudio"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Sculptural Portrait / Atelier Frame with Counter-Parallax */}
          <ClipRevealBlock cursorType="feel" className="lg:col-span-5">
            <div className="relative rounded-2xl p-8 sm:p-10 bg-editorial travertine-surface border border-[var(--border-strong)] shadow-editorial overflow-hidden">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-ink-secondary mb-8">
                <span>CREATIVE FOUNDER</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} strokeWidth={1.6} />
                  <span>SPAIN</span>
                </span>
              </div>

              {/* Architectural Arch Frame */}
              <div
                className="founder-arch-inner mx-auto max-w-[260px] aspect-[4/5] rounded-t-full rounded-b-xl p-8 flex flex-col items-center justify-between text-center border shadow-whisper"
                style={{
                  background: 'linear-gradient(165deg, #8B8563 0%, #6F6A4C 100%)',
                  borderColor: 'rgba(250, 248, 244, 0.25)',
                  color: '#FAF8F4',
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.28em] opacity-80 mt-4">
                  ESTUDIO BOUTIQUE
                </span>
                <BrandMonogram variant="bare" size={88} className="text-liid-alabaster" />
                <div>
                  <div className="font-script text-4xl leading-none text-liid-alabaster">
                    Atelier
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.24em] opacity-80 mt-2">
                    DIRECCIÓN CREATIVA
                  </div>
                </div>
              </div>
            </div>
          </ClipRevealBlock>

          {/* Right Narrative & Studio Ethos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium">
              {t.founder.eyebrow}
            </div>

            <EditorialHeadline
              as="h2"
              prefix={t.founder.titlePrefix}
              scriptWord={t.founder.titleScript}
              suffix="."
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
            />

            <p className="font-display italic text-xl sm:text-2xl text-ink-heading">
              {t.founder.role}
            </p>

            <ScrollHairline />

            <div className="space-y-4 text-base text-ink-secondary leading-relaxed font-light max-w-2xl">
              <MaskedRevealWords text={t.founder.bioParagraph1} />
              <MaskedRevealWords text={t.founder.bioParagraph2} delay={0.12} />
            </div>

            {/* 3 Boutique Commitments */}
            <div className="founder-values-grid pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.founder.values.map((val) => (
                <div
                  key={val.label}
                  className="founder-value-card rounded-xl p-5 bg-canvas border border-[var(--border-subtle)]"
                >
                  <div className="font-display text-xl text-ink-heading mb-1.5">
                    {val.label}
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {val.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
