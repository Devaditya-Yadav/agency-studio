import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 'inicio', num: '01' },
  { id: 'esencia', num: '02' },
  { id: 'diagnostico-ia', num: '03' },
  { id: 'servicios', num: '04' },
  { id: 'universo', num: '05' },
  { id: 'metodo', num: '06' },
  { id: 'estudio', num: '07' },
  { id: 'contacto', num: '08' },
];

export const ScrollProgressSpine: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeNum, setActiveNum] = useState('01');

  useGSAP(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        }
      );
    }

    const triggers = CHAPTERS.map((ch) => {
      const el = document.getElementById(ch.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 52%',
        end: 'bottom 52%',
        onEnter: () => setActiveNum(ch.num),
        onEnterBack: () => setActiveNum(ch.num),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <>
      {/* Top 2px Scrubbed Terracotta Progress Hairline */}
      <div
        aria-hidden="true"
        className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full w-full scale-x-0"
          style={{ backgroundColor: 'var(--progress-bar-bg)' }}
        />
      </div>

      {/* Subtle Fixed Chapter Counter Spine (Desktop XL) */}
      <aside
        aria-hidden="true"
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 pointer-events-none select-none opacity-75"
      >
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-heading font-medium">
          {activeNum}
        </span>
        <span className="w-px h-10 bg-[var(--border-strong)]" />
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-secondary">
          08
        </span>
      </aside>
    </>
  );
};
