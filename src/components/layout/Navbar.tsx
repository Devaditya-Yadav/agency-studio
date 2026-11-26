import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BrandMonogram } from '../brand/BrandMonogram';
import { StudioControls } from '../ui/StudioControls';
import { MagneticButton } from '../ui/MagneticButton';
import { useLanguage } from '../../i18n/LanguageContext';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#esencia', label: t.nav.essence },
    { href: '#servicios', label: t.nav.services },
    { href: '#universo', label: t.nav.universe },
    { href: '#metodo', label: t.nav.method },
    { href: '#estudio', label: t.nav.founder },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-md bg-[color-mix(in_srgb,var(--bg-canvas)_88%,transparent)] border-b border-[var(--border-subtle)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <a href="#inicio" className="group flex items-center gap-3 focus:outline-none">
          <BrandMonogram variant="olive-badge" size={38} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="leading-none">
            <span className="block font-display text-lg sm:text-xl font-medium tracking-wordmark text-ink-primary">
              LIID ESTUDIO
            </span>
            <span className="hidden sm:block text-[10px] uppercase tracking-eyebrow text-ink-secondary mt-1">
              Creative Essence
            </span>
          </div>
        </a>

        {/* Desktop Anchor Navigation */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-ink-secondary hover:text-ink-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls + Primary CTA */}
        <div className="hidden md:flex items-center gap-3">
          <StudioControls instanceId="desktop" />
          <MagneticButton variant="terracotta" href="#contacto" className="!px-5 !py-2.5">
            {t.nav.cta}
          </MagneticButton>
        </div>

        {/* Mobile Drawer Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <StudioControls instanceId="mobile" />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-full border border-[var(--border-subtle)] bg-surface text-ink-primary"
          >
            {mobileOpen ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-surface border-b border-[var(--border-strong)]"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-ink-heading py-1 border-b border-[var(--border-subtle)]"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <MagneticButton
                  variant="terracotta"
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="w-full"
                >
                  {t.nav.cta}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
