import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Copy, Globe, Mail, MapPin, Phone, Send, Sparkles } from 'lucide-react';
import { EditorialHeadline } from '../ui/EditorialHeadline';
import { MagneticButton } from '../ui/MagneticButton';
import { ClipRevealBlock, MaskedRevealWords, ScrollHairline } from '../ui/ScrollRevealPrimitives';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAtelierState } from '../../context/AtelierStateContext';
import { studioConfig } from '../../config/studioConfig';

export const ContactAtelierSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const { draft } = useAtelierState();
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [story, setStory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [diagnosisAttached, setDiagnosisAttached] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    setSelectedServiceIdx(draft.serviceIndex);
    if (draft.prefilledStory) {
      setStory(draft.prefilledStory);
      setDiagnosisAttached(true);
    }
    if (draft.brandName && !name) {
      setName(draft.brandName);
    }
  }, [draft]);

  const chosenService = t.contact.form.services[selectedServiceIdx] ?? t.contact.form.services[0];

  const formattedBrief = [
    `${studioConfig.brandName} — ${chosenService}`,
    `${lang === 'es' ? 'Nombre' : 'Name'}: ${name.trim()}`,
    `Email: ${email.trim()}`,
    `${lang === 'es' ? 'Pilar' : 'Service'}: ${chosenService}`,
    '',
    story.trim(),
  ].join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setCopiedSummary(false);
  };

  const handleCopyBrief = () => {
    navigator.clipboard?.writeText(formattedBrief).then(() => {
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2000);
    });
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-canvas dappled-sunlight">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Invitation & Demo Studio Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs uppercase tracking-eyebrow text-liid-olive font-medium">
              {t.contact.eyebrow}
            </div>

            <EditorialHeadline
              as="h2"
              prefix={t.contact.titlePrefix}
              scriptWord={t.contact.titleScript}
              suffix={t.contact.titleSuffix}
              className="text-4xl sm:text-5xl lg:text-6xl leading-[1.12]"
            />

            <MaskedRevealWords
              text={t.contact.subtitle}
              className="text-base text-ink-secondary leading-relaxed font-light"
            />

            <ScrollHairline />

            {/* Placeholder Studio Contact Card */}
            <ClipRevealBlock className="rounded-2xl p-7 bg-surface border border-[var(--border-strong)] space-y-4 shadow-whisper">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs uppercase tracking-eyebrow text-liid-olive">
                  {t.contact.directTitle}
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-0.5 rounded-full bg-editorial text-ink-secondary border border-[var(--border-subtle)]">
                  {lang === 'es' ? 'Demo' : 'Placeholder'}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${studioConfig.email}`}
                  className="flex items-center gap-3 text-ink-primary hover:text-ink-accent transition-colors"
                >
                  <Mail size={16} strokeWidth={1.6} className="text-liid-olive" />
                  <span>{studioConfig.email}</span>
                </a>
                <div className="flex items-center gap-3 text-ink-primary">
                  <Phone size={16} strokeWidth={1.6} className="text-liid-olive" />
                  <span>{studioConfig.phoneDisplay}</span>
                </div>
                <a
                  href={studioConfig.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ink-primary hover:text-ink-accent transition-colors"
                >
                  <Globe size={16} strokeWidth={1.6} className="text-liid-olive" />
                  <span>{studioConfig.socialHandle}</span>
                </a>
                <div className="flex items-center gap-3 text-ink-secondary">
                  <MapPin size={16} strokeWidth={1.6} className="text-liid-olive" />
                  <span>{t.contact.locationValue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] text-xs text-ink-secondary">
                {t.contact.responseNote}
              </div>
            </ClipRevealBlock>
          </div>

          {/* Right Conscious Inquiry Form */}
          <ClipRevealBlock delay={0.12} className="lg:col-span-7">
            <div className="rounded-2xl p-8 sm:p-10 bg-surface border border-[var(--border-strong)] shadow-editorial">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center space-y-5"
                >
                  <CheckCircle2 size={42} strokeWidth={1.5} className="mx-auto text-liid-olive" />
                  <h3 className="font-display text-3xl text-ink-heading">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-ink-secondary max-w-md mx-auto">
                    {t.contact.form.successMessage}
                  </p>

                  <pre className="text-left text-xs font-mono whitespace-pre-wrap break-words rounded-xl p-4 bg-canvas border border-[var(--border-subtle)] text-ink-secondary max-h-48 overflow-y-auto">
                    {formattedBrief}
                  </pre>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <MagneticButton variant="olive" onClick={handleCopyBrief}>
                      {copiedSummary ? <Check size={14} strokeWidth={1.8} /> : <Copy size={14} strokeWidth={1.7} />}
                      <span>
                        {copiedSummary
                          ? lang === 'es'
                            ? 'Resumen copiado'
                            : 'Brief copied'
                          : lang === 'es'
                          ? 'Copiar resumen'
                          : 'Copy brief'}
                      </span>
                    </MagneticButton>
                    <MagneticButton variant="outline" onClick={() => setSubmitted(false)}>
                      {lang === 'es' ? 'Enviar otra consulta' : 'Send another inquiry'}
                    </MagneticButton>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {diagnosisAttached && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-editorial border border-[var(--border-strong)] text-xs text-ink-heading">
                      <Sparkles size={13} strokeWidth={1.6} className="text-ink-accent" />
                      <span>
                        {lang === 'es'
                          ? 'Diagnóstico de Esencia adjuntado automáticamente'
                          : 'Essence Diagnosis automatically attached'}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="liid-name"
                        className="block text-xs uppercase tracking-[0.18em] text-ink-secondary mb-2"
                      >
                        {t.contact.form.nameLabel}
                      </label>
                      <input
                        id="liid-name"
                        type="text"
                        required
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full rounded-lg px-4 py-3 bg-canvas border border-[var(--border-strong)] text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:border-[var(--action-cta-bg)] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="liid-email"
                        className="block text-xs uppercase tracking-[0.18em] text-ink-secondary mb-2"
                      >
                        {t.contact.form.emailLabel}
                      </label>
                      <input
                        id="liid-email"
                        type="email"
                        required
                        maxLength={120}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full rounded-lg px-4 py-3 bg-canvas border border-[var(--border-strong)] text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:border-[var(--action-cta-bg)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Selectable Service Pillar Pills */}
                  <div>
                    <span className="block text-xs uppercase tracking-[0.18em] text-ink-secondary mb-3">
                      {t.contact.form.serviceLabel}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {t.contact.form.services.map((srv, idx) => {
                        const active = idx === selectedServiceIdx;
                        return (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setSelectedServiceIdx(idx)}
                            className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                              active
                                ? 'bg-[var(--action-primary-bg)] text-[var(--action-primary-fg)] border-[var(--action-primary-bg)]'
                                : 'bg-canvas text-ink-secondary border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                            }`}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="liid-story"
                      className="block text-xs uppercase tracking-[0.18em] text-ink-secondary mb-2"
                    >
                      {t.contact.form.storyLabel}
                    </label>
                    <textarea
                      id="liid-story"
                      rows={5}
                      required
                      maxLength={2000}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder={t.contact.form.storyPlaceholder}
                      className="w-full rounded-lg px-4 py-3 bg-canvas border border-[var(--border-strong)] text-sm text-ink-primary placeholder:text-ink-secondary/60 focus:outline-none focus:border-[var(--action-cta-bg)] transition-colors resize-y"
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticButton type="submit" variant="terracotta" className="w-full sm:w-auto">
                      <span>{t.contact.form.submitBtn}</span>
                      <Send size={14} strokeWidth={1.7} />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </ClipRevealBlock>
        </div>
      </div>
    </section>
  );
};
