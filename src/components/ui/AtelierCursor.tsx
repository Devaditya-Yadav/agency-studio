import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../../i18n/LanguageContext';

export const AtelierCursor: React.FC = () => {
  const { lang } = useLanguage();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'explore' | 'feel'>('default');

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled || !cursorRef.current) return;
    const el = cursorRef.current;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.26, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.26, ease: 'power3.out' });

    const onPointerMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null;
      const attr = target?.getAttribute('data-cursor');
      if (attr === 'explore' || attr === 'feel') {
        setCursorMode(attr);
      } else {
        setCursorMode('default');
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isExpanded = cursorMode !== 'default';
  const label =
    cursorMode === 'feel'
      ? lang === 'es'
        ? 'Sentir'
        : 'Feel'
      : lang === 'es'
      ? 'Explorar'
      : 'Explore';

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[65] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center rounded-full backdrop-blur-xs transition-[width,height,background-color,border-color] duration-300"
      style={{
        width: isExpanded ? 74 : 16,
        height: isExpanded ? 74 : 16,
        backgroundColor: isExpanded ? 'rgba(139, 133, 99, 0.88)' : 'var(--cursor-bg)',
        border: `1px solid ${isExpanded ? 'rgba(250, 248, 244, 0.5)' : 'var(--cursor-border)'}`,
        color: '#FAF8F4',
      }}
    >
      {isExpanded && (
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium select-none">
          {label}
        </span>
      )}
    </div>
  );
};
