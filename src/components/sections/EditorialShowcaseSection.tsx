import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShowcaseItem } from '../../types/content';
import { studioConfig } from '../../config/studioConfig';

gsap.registerPlugin(ScrollTrigger);

export const EditorialShowcaseSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        '.showcase-card',
        {
          clipPath: 'inset(14% 4% 14% 4% round 16px)',
          y: 44,
          opacity: 0,
        },
        {
          clipPath: 'inset(0% 0% 0% 0% round 16px)',
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: '.showcase-grid',
            start: 'top 80%',
          },
        }
      );

      // Subtle asymmetric gallery column parallax on desktop
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        gsap.utils.toArray<HTMLElement>('.showcase-parallax-odd').forEach((card) => {
          gsap.to(card, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: '.showcase-grid',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const rx = ((py / rect.height) - 0.5) * -7;
    const ry = ((px / rect.width) - 0.5) * 7;

    card.style.setProperty('--sheen-x', `${px}px`);
    card.style.setProperty('--sheen-y', `${py}px`);
    card.style.setProperty('--sheen-opacity', '1');
    gsap.to(card, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleCardPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--sheen-opacity', '0');
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const renderVisualArt = (item: ShowcaseItem) => {
    switch (item.variant) {
      case 'seal':
        return (
          <div
            className="h-52 rounded-xl flex items-center justify-center relative overflow-hidden border border-[var(--border-subtle)]"
            style={{ background: 'linear-gradient(145deg, #F4F0E8 0%, #E5DFD3 100%)' }}
          >
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#D2CBB9]" />
            <BrandMonogram variant="ivory-seal" size={96} className="relative z-10 drop-shadow-md" />
          </div>
        );
      case 'agenda':
        return (
          <div
            className="h-52 rounded-xl flex items-center justify-center p-6 border border-[var(--border-subtle)]"
            style={{ background: 'linear-gradient(150deg, #EFECE6 0%, #DFD9CE 100%)' }}
          >
            <div
              className="w-40 h-44 rounded-md p-4 flex flex-col justify-between text-center shadow-md -rotate-3"
              style={{ background: 'linear-gradient(160deg, #D5C1AA 0%, #C3AD93 100%)' }}
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#6E5038]">ESTUDIO</span>
              <div className="font-display text-base uppercase tracking-[0.15em] text-[#593E27] leading-tight">
                AGENDA<br />PROYECTOS<br />2026
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#6E5038]">LIID ESTUDIO</span>
            </div>
          </div>
        );
      case 'editorial':
        return (
          <div
            className="h-52 rounded-xl flex flex-col justify-between p-5 text-center border border-[var(--border-subtle)]"
            style={{ background: 'linear-gradient(160deg, #E2DFD4 0%, #CFCBC0 100%)', color: '#555132' }}
          >
            <span className="text-[9px] uppercase tracking-[0.26em] opacity-80">MARKETING CONSCIENTE</span>
            <div>
              <div className="font-display text-3xl">
                Social <span className="liid-script-word">media</span>
              </div>
              <div className="text-[11px] opacity-85 mt-1">Comunica con coherencia</div>
            </div>
            <span className="text-[9px] uppercase tracking-[0.24em] opacity-75">
              {studioConfig.websiteDisplay.toUpperCase()}
            </span>
          </div>
        );
      default:
        return (
          <div
            className="h-52 rounded-xl flex flex-col justify-between p-5 text-center border border-[var(--border-subtle)]"
            style={{ background: 'linear-gradient(155deg, #918B69 0%, #7B7555 100%)', color: '#FAF8F4' }}
          >
            <span className="text-[9px] uppercase tracking-[0.24em] opacity-80">CREATIVE ESSENCE</span>
            <div className="font-display text-3xl tracking-[0.22em] uppercase">ESENCIA</div>
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-80">60 • 30 • 10 SYSTEM</span>
          </div>
        );
    }
  };

  return (
    <section
      id="universo"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-surface border-b border-[var(--border-subtle)]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium mb-3">
              {t.showcase.eyebrow}
            </div>
            <EditorialHeadline
              as="h2"
              prefix={t.showcase.titlePrefix}
              scriptWord={t.showcase.titleScript}
              suffix={t.showcase.titleSuffix}
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
            />
            <MaskedRevealWords
              text={t.showcase.intro}
              className="mt-4 text-base sm:text-lg text-ink-secondary font-light"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="outline"
              href="/brand-kit/templates/social-and-stationery-kit.html"
            >
              <Globe size={14} strokeWidth={1.7} />
              <span>{t.showcase.instagramCta}</span>
            </MagneticButton>
            <MagneticButton variant="olive" href="/brand-portal.html">
              <span>{t.showcase.brandBookCta}</span>
              <ArrowUpRight size={14} strokeWidth={1.7} />
            </MagneticButton>
          </div>
        </div>

        <ScrollHairline className="mb-12" />

        {/* 4-Card Tactile Universe Grid with 3D Specular Sheen & Asymmetric Parallax */}
        <div className="showcase-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {t.showcase.items.map((item, idx) => (
            <div key={item.id} className={idx % 2 === 1 ? 'showcase-parallax-odd lg:mt-6' : ''}>
              <article
                data-cursor="explore"
                onPointerMove={handleCardPointerMove}
                onPointerLeave={handleCardPointerLeave}
                className="showcase-card atelier-sheen-card h-full rounded-2xl p-5 bg-canvas border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors duration-300 flex flex-col justify-between shadow-whisper"
              >
                <div>
                  {renderVisualArt(item)}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-liid-olive">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.palette.map((hex) => (
                        <span
                          key={hex}
                          title={hex}
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-2 font-display text-2xl text-ink-heading">
                    {item.title}{' '}
                    <span className="liid-script-word text-ink-accent text-xl">{item.scriptTag}</span>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
