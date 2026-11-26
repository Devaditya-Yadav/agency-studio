import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const EssenceMarquee: React.FC = () => {
  const { lang } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items =
    lang === 'es'
      ? [
          { serif: 'MARCAS CON ESENCIA PROPIA', script: 'autenticidad' },
          { serif: 'MARKETING CONSCIENTE', script: 'calma' },
          { serif: 'DISEÑO VISUAL & IDENTIDAD', script: 'belleza' },
          { serif: 'SOCIAL MEDIA ESTRATÉGICO', script: 'coherencia' },
        ]
      : [
          { serif: 'BRANDS WITH OWN ESSENCE', script: 'authenticity' },
          { serif: 'CONSCIOUS MARKETING', script: 'serenity' },
          { serif: 'VISUAL DESIGN & IDENTITY', script: 'craft' },
          { serif: 'STRATEGIC SOCIAL MEDIA', script: 'coherence' },
        ];

  useGSAP(
    () => {
      if (!trackRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 34,
        ease: 'none',
      });

      const st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocityBoost = Math.min(Math.abs(self.getVelocity()) / 900, 2.4);
          const dir = self.direction >= 0 ? 1 : -1;
          gsap.to(tween, {
            timeScale: dir * (1 + velocityBoost),
            duration: 0.35,
            overwrite: true,
          });
        },
      });

      return () => {
        tween.kill();
        st.kill();
      };
    },
    { scope: wrapRef }
  );

  const repeated = [...items, ...items];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="py-5 bg-surface border-b border-[var(--border-subtle)] overflow-hidden select-none"
    >
      <div ref={trackRef} className="flex items-center whitespace-nowrap w-max">
        {repeated.map((entry, idx) => (
          <div key={idx} className="inline-flex items-center gap-6 px-6">
            <span className="font-display text-lg sm:text-xl tracking-[0.2em] text-ink-heading uppercase">
              {entry.serif}
            </span>
            <span className="liid-script-word text-2xl text-ink-accent">
              {entry.script}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-liid-olive opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};
