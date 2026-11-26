import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Language } from '../../types/content';

interface StudioControlsProps {
  instanceId?: string;
}

export const StudioControls: React.FC<StudioControlsProps> = ({ instanceId = 'main' }) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const langs: Language[] = ['es', 'en'];

  return (
    <div className="flex items-center gap-2">
      {/* Bilingual ES / EN Switcher */}
      <div
        role="group"
        aria-label="Language switcher"
        className="relative inline-flex items-center p-0.5 rounded-full bg-surface border border-[var(--border-subtle)]"
      >
        {langs.map((code) => {
          const active = lang === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={active}
              className={`relative px-2.5 py-1 text-xs uppercase tracking-[0.14em] font-medium transition-colors duration-200 cursor-pointer ${
                active ? 'text-[var(--action-primary-fg)]' : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`${instanceId}-liidLangActivePill`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[var(--action-primary-bg)]"
                />
              )}
              <span className="relative z-10">{code.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Sunlit Atelier / Evening Studio Theme Switcher */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? t.nav.eveningLabel : t.nav.sunlitLabel}
        title={theme === 'light' ? t.nav.eveningLabel : t.nav.sunlitLabel}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface border border-[var(--border-subtle)] text-ink-heading hover:border-[var(--border-strong)] transition-colors cursor-pointer"
      >
        {theme === 'light' ? <Moon size={15} strokeWidth={1.6} /> : <Sun size={15} strokeWidth={1.6} />}
      </button>
    </div>
  );
};
