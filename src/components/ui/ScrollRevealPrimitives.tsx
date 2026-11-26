import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollHairlineProps {
  className?: string;
}

export const ScrollHairline: React.FC<ScrollHairlineProps> = ({ className = '' }) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: 1.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className={`h-px w-full bg-[var(--border-strong)] ${className}`}
    />
  );
};

interface ClipRevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  cursorType?: 'explore' | 'feel';
}

export const ClipRevealBlock: React.FC<ClipRevealBlockProps> = ({
  children,
  className = '',
  delay = 0,
  cursorType,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(
      ref.current,
      {
        clipPath: 'inset(10% 3% 10% 3% round 16px)',
        y: 34,
        opacity: 0,
      },
      {
        clipPath: 'inset(0% 0% 0% 0% round 16px)',
        y: 0,
        opacity: 1,
        duration: 1.0,
        delay,
        ease: 'power3.out',
        clearProps: 'clipPath,transform',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 86%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [delay]);

  return (
    <div ref={ref} data-cursor={cursorType} className={`clip-unroll ${className}`}>
      {children}
    </div>
  );
};

interface MaskedRevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

export const MaskedRevealWords: React.FC<MaskedRevealWordsProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const wrapRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      if (!wrapRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.masked-word-inner',
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.72,
          delay,
          stagger: 0.024,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: wrapRef, dependencies: [text] }
  );

  return (
    <p ref={wrapRef} className={className}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
          <span className="masked-word-inner inline-block">{word}</span>
        </span>
      ))}
    </p>
  );
};
