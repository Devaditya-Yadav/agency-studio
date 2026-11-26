import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const EssenceManifesto: React.FC = () => {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const letters = t.manifesto.word.split('');
  const quoteWords = t.manifesto.quote.split(' ');

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia();

      // Desktop Pinned Scroll-Storytelling Chapter
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=110%',
            pin: true,
            scrub: 0.9,
          },
        });

        tl.fromTo(
          '.manifesto-halo',
          { scale: 0.65, opacity: 0.15 },
          { scale: 1.35, opacity: 0.45, ease: 'none' },
          0
        )
          .fromTo(
            '.manifesto-char',
            { y: 28, opacity: 0.35, rotateX: -35 },
            { y: 0, opacity: 1, rotateX: 0, stagger: 0.04, ease: 'power2.out' },
            0
          )
          .fromTo(
            '.manifesto-quote-word',
            { opacity: 0.25 },
            { opacity: 1, stagger: 0.05, ease: 'none' },
            0.18
          )
          .fromTo(
            '.manifesto-rule',
            { scaleX: 0.2 },
            { scaleX: 1, ease: 'power2.out' },
            0.15
          );
      });

      // Tablet & Mobile Unpinned Smooth Scrubbed Reveal
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.manifesto-char',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );

        gsap.fromTo(
          '.manifesto-quote-word',
          { opacity: 0.28 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              end: 'bottom 65%',
              scrub: 0.6,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [lang] }
  );

  return (
    <section
      id="esencia"
      ref={sectionRef}
      data-cursor="feel"
      className="relative min-h-[88vh] flex items-center py-24 lg:py-28 bg-manifesto text-liid-alabaster overflow-hidden"
    >
      {/* Expanding Botanical Light Aura */}
      <div
        aria-hidden="true"
        className="manifesto-halo pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(250,248,244,0.22) 0%, rgba(174,178,145,0.08) 45%, transparent 72%)',
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-6">
          <BrandMonogram variant="bare" size={56} className="text-liid-alabaster opacity-95" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-liid-linen/80 mb-6">
          {t.manifesto.topLead}
        </p>

        <h2
          aria-label={t.manifesto.word}
          className="font-display font-normal text-5xl sm:text-7xl lg:text-[5.6rem] uppercase tracking-[0.22em] text-liid-alabaster select-none my-4 flex justify-center gap-[0.14em]"
          style={{ perspective: '600px' }}
        >
          {letters.map((ch, idx) => (
            <span key={`${ch}-${idx}`} className="manifesto-char inline-block">
              {ch}
            </span>
          ))}
        </h2>

        <div className="manifesto-rule w-28 h-px bg-liid-linen/45 mx-auto my-8" />

        <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-liid-alabaster max-w-3xl mx-auto">
          {quoteWords.map((w, idx) => (
            <span key={`${w}-${idx}`} className="manifesto-quote-word inline-block mr-[0.26em]">
              {w}
            </span>
          ))}
        </p>

        <p className="mt-7 text-sm sm:text-base text-liid-linen/85 max-w-xl mx-auto font-light leading-relaxed">
          {t.manifesto.subcopy}
        </p>

        <div className="mt-12 pt-6 border-t border-liid-linen/20 text-[11px] uppercase tracking-[0.26em] text-liid-linen/75">
          {t.manifesto.pillarsLine}
        </div>
      </div>
    </section>
  );
};
