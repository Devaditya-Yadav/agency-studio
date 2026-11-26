import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const AtelierPreloader: React.FC = () => {
  const [done, setDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Failsafe unmount guard in case browser tab throttles rAF
  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(() => setDone(true), 2300);
    return () => window.clearTimeout(timer);
  }, [done]);

  useGSAP(
    () => {
      if (done || !rootRef.current) return;

      const counterObj = { val: 0 };
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        '.preloader-stroke',
        { strokeDasharray: 420, strokeDashoffset: 420 },
        { strokeDashoffset: 0, duration: 0.95, ease: 'power3.inOut' },
        0
      )
        .fromTo(
          '.preloader-dot',
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          { scale: 1, opacity: 1, duration: 0.32, ease: 'back.out(2)' },
          0.68
        )
        .to(
          counterObj,
          {
            val: 100,
            duration: 0.95,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counterObj.val)).padStart(2, '0');
              }
            },
          },
          0
        )
        .call(
          () => {
            if (rootRef.current) {
              rootRef.current.style.pointerEvents = 'none';
            }
          },
          [],
          0.96
        )
        .to(
          rootRef.current,
          {
            yPercent: -100,
            duration: 0.78,
            ease: 'expo.inOut',
          },
          0.98
        );
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{ backgroundColor: 'var(--preloader-bg)', color: 'var(--preloader-fg)' }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-between py-10 px-8 select-none will-change-transform"
    >
      <div className="text-[11px] uppercase tracking-[0.3em] opacity-80">
        LIID ESTUDIO • CONCEPT ATELIER
      </div>

      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 180 180" width={92} height={92}>
          <g transform="translate(-31, -24)">
            <path
              className="preloader-stroke"
              d="M 73 56 H 93 M 83.5 56 V 138.8 H 128 C 134 138.8 136.8 134 138.5 124"
              fill="none"
              stroke="#FAF8F4"
              strokeWidth="4.2"
              strokeLinecap="square"
            />
            <path
              className="preloader-stroke"
              d="M 107.4 131 V 85.4 H 123 C 148 85.4 164.5 102 164.5 126.5 C 164.5 151 147 167.5 122 167.5 H 100"
              fill="none"
              stroke="#FAF8F4"
              strokeWidth="4.2"
              strokeLinecap="square"
            />
            <circle className="preloader-dot" cx="107.4" cy="151.5" r="4" fill="#FAF8F4" />
          </g>
        </svg>
        <div className="font-display text-sm uppercase tracking-[0.34em] opacity-90">
          Creative Essence
        </div>
      </div>

      <div className="w-full max-w-md flex items-center justify-between text-xs font-mono opacity-85">
        <span className="uppercase tracking-[0.22em] font-sans">Marketing Consciente</span>
        <span>
          <span ref={counterRef}>00</span>%
        </span>
      </div>
    </div>
  );
};
