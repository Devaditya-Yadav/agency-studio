import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface EditorialHeadlineProps {
  as?: 'h1' | 'h2' | 'h3';
  prefix: string;
  scriptWord: string;
  suffix?: string;
  scriptColorClass?: string;
  className?: string;
  scrollReveal?: boolean;
}

export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  as: Tag = 'h2',
  prefix,
  scriptWord,
  suffix = '',
  scriptColorClass = 'text-ink-accent',
  className = '',
  scrollReveal = Tag !== 'h1',
}) => {
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const words = rootRef.current.querySelectorAll('.eh-word');
      if (!words.length) return;

      if (scrollReveal) {
        gsap.fromTo(
          words,
          { yPercent: 108, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.82,
            stagger: 0.045,
            ease: 'expo.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        gsap.fromTo(
          words,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.05,
            ease: 'expo.out',
            clearProps: 'transform',
          }
        );
      }
    },
    { scope: rootRef, dependencies: [lang, prefix, scriptWord, suffix, scrollReveal] }
  );

  const prefixWords = prefix.trim().split(/\s+/);
  const cleanSuffix = suffix.trim();
  const suffixPunctuationOnly = /^[.,?!:;]+$/.test(cleanSuffix);
  const suffixWords = cleanSuffix && !suffixPunctuationOnly ? cleanSuffix.split(/\s+/) : [];

  return (
    <div ref={rootRef}>
      <Tag className={`font-display font-medium text-ink-heading tracking-[-0.01em] ${className}`}>
        {prefixWords.map((w, i) => (
          <span key={`p-${i}-${w}`} className="inline-block overflow-hidden align-bottom mr-[0.25em] pb-[0.06em]">
            <span className="eh-word inline-block">{w}</span>
          </span>
        ))}
        <span className="inline-block overflow-hidden align-bottom px-[0.04em] pb-[0.1em]">
          <span className={`eh-word liid-script-word ${scriptColorClass}`}>
            {scriptWord}
            {suffixPunctuationOnly ? cleanSuffix : ''}
          </span>
        </span>
        {suffixWords.map((w, i) => (
          <span
            key={`s-${i}-${w}`}
            className={`inline-block overflow-hidden align-bottom pb-[0.06em] ${
              i === 0 && (w.startsWith(',') || w.startsWith('.')) ? 'mr-[0.25em]' : 'ml-[0.22em]'
            }`}
          >
            <span className="eh-word inline-block">{w}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
};
