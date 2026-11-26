import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { ClipRevealBlock, MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAtelierState } from '../../context/AtelierStateContext';

gsap.registerPlugin(ScrollTrigger);

export const ServicesAtelierSection: React.FC = () => {
  const { t } = useLanguage();
  const { selectServiceForInquiry } = useAtelierState();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const activeService = t.services.items[activeIndex] ?? t.services.items[0];

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.service-pillar-tab',
        { y: 28, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.services-tabs-row',
            start: 'top 84%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-canvas border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium mb-3">
            {t.services.eyebrow}
          </div>
          <EditorialHeadline
            as="h2"
            prefix={t.services.titlePrefix}
            scriptWord={t.services.titleScript}
            suffix={t.services.titleSuffix}
            className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
          />
          <MaskedRevealWords
            text={t.services.intro}
            className="mt-4 text-base sm:text-lg text-ink-secondary font-light"
          />
        </div>

        <ScrollHairline className="mb-10" />

        {/* Interactive Pillar Selector Tabs */}
        <div
          role="tablist"
          aria-label="LIID ESTUDIO Service Pillars"
          className="services-tabs-row grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {t.services.items.map((item, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                data-cursor="explore"
                aria-selected={selected}
                onClick={() => setActiveIndex(idx)}
                className={`service-pillar-tab relative text-left rounded-xl p-6 border transition-colors duration-300 cursor-pointer ${
                  selected
                    ? 'bg-editorial border-[var(--border-strong)] shadow-whisper'
                    : 'bg-surface border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-liid-olive mb-2">
                  <span>{item.number}</span>
                  <span>{item.eyebrow}</span>
                </div>
                <div className="font-display text-3xl text-ink-heading">
                  <span>{item.titlePrefix} </span>
                  <span className="liid-script-word text-ink-accent">{item.titleScript}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-ink-secondary line-clamp-2">
                  {item.subtitle}
                </p>
                {selected && (
                  <motion.div
                    layoutId="serviceActiveUnderline"
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-[var(--action-cta-bg)]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Editorial Stage */}
        <ClipRevealBlock>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeService.id}-${activeService.titlePrefix}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-8 sm:p-12 bg-surface border border-[var(--border-strong)] shadow-editorial"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Narrative */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="text-xs uppercase tracking-eyebrow text-liid-olive">
                    {activeService.number} • {activeService.eyebrow}
                  </div>
                  <h3 className="font-display text-4xl sm:text-5xl text-ink-heading leading-tight">
                    <span>{activeService.titlePrefix} </span>
                    <span className="liid-script-word text-ink-accent">{activeService.titleScript}</span>
                  </h3>
                  <p className="font-display italic text-xl text-ink-heading/90">
                    “{activeService.subtitle}”
                  </p>
                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                    {activeService.description}
                  </p>

                  <div className="pt-3">
                    <MagneticButton
                      variant="olive"
                      onClick={() => selectServiceForInquiry(activeIndex)}
                    >
                      <span>{t.services.inquireServiceCta}</span>
                      <ArrowUpRight size={15} strokeWidth={1.7} />
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Deliverables & Transformation */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="rounded-xl p-6 sm:p-7 bg-canvas border border-[var(--border-subtle)]">
                    <div className="text-xs uppercase tracking-eyebrow text-liid-olive mb-4">
                      {t.services.deliverablesLabel}
                    </div>
                    <ul className="space-y-3">
                      {activeService.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-3 text-sm text-ink-primary">
                          <CheckCircle2
                            size={16}
                            strokeWidth={1.7}
                            className="mt-0.5 text-liid-olive shrink-0"
                          />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl p-5 bg-editorial border border-[var(--border-strong)]">
                    <div className="text-[11px] uppercase tracking-eyebrow text-ink-accent font-semibold mb-1">
                      {t.services.outcomeLabel}
                    </div>
                    <p className="font-display text-xl text-ink-heading leading-snug">
                      {activeService.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ClipRevealBlock>
      </div>
    </section>
  );
};
