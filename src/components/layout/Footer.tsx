import React from 'react';
import { ArrowUpRight, Globe, Mail, Phone } from 'lucide-react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { useLanguage } from '../../i18n/LanguageContext';
import { studioConfig } from '../../config/studioConfig';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-[var(--border-strong)] bg-surface py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Colophon Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <BrandMonogram variant="olive-badge" size={44} />
              <div>
                <div className="font-display text-2xl tracking-wordmark text-ink-primary">
                  {studioConfig.brandName}
                </div>
                <div className="text-xs uppercase tracking-eyebrow text-liid-olive">
                  Creative Essence • Concept Study
                </div>
              </div>
            </div>
            <p className="text-sm text-ink-secondary max-w-md leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="mt-3 text-xs text-ink-secondary/85 max-w-md leading-relaxed">
              {lang === 'es'
                ? 'Nota: Proyecto conceptual de portafolio no oficial. Los datos de contacto mostrados son ficticios.'
                : 'Disclaimer: Unofficial portfolio concept study. Contact channels shown are fictional placeholders.'}
            </p>
          </div>

          {/* Demo Studio Channels */}
          <div className="md:col-span-4 space-y-2.5 text-sm">
            <div className="text-xs uppercase tracking-eyebrow text-liid-olive mb-3">
              {t.contact.directTitle}
            </div>
            <a
              href={`mailto:${studioConfig.email}`}
              className="flex items-center gap-2.5 text-ink-primary hover:text-ink-accent transition-colors"
            >
              <Mail size={15} strokeWidth={1.6} />
              <span>{studioConfig.email}</span>
            </a>
            <div className="flex items-center gap-2.5 text-ink-primary">
              <Phone size={15} strokeWidth={1.6} />
              <span>{studioConfig.phoneDisplay}</span>
            </div>
            <a
              href={studioConfig.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ink-primary hover:text-ink-accent transition-colors"
            >
              <Globe size={15} strokeWidth={1.6} />
              <span>{studioConfig.socialHandle}</span>
              <ArrowUpRight size={13} strokeWidth={1.6} />
            </a>
          </div>

          {/* Brand Kit Assets Links */}
          <div className="md:col-span-3 space-y-2.5 text-sm">
            <div className="text-xs uppercase tracking-eyebrow text-liid-olive mb-3">
              Brand System
            </div>
            <a
              href="/brand-portal.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)] text-ink-primary hover:text-ink-accent transition-colors"
            >
              <span>{t.footer.brandKitLink}</span>
              <ArrowUpRight size={14} strokeWidth={1.6} />
            </a>
            <a
              href="/brand-kit/templates/social-and-stationery-kit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-1.5 border-b border-[var(--border-subtle)] text-ink-primary hover:text-ink-accent transition-colors"
            >
              <span>{t.footer.stationeryLink}</span>
              <ArrowUpRight size={14} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
          <span>{t.footer.rights}</span>
          <span className="uppercase tracking-[0.2em]">
            Diseño Visual • Social Media • Comunicación — Concept Demo
          </span>
        </div>
      </div>
    </footer>
  );
};
