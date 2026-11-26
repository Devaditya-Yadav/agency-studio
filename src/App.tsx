import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AtelierStateProvider } from './context/AtelierStateContext';
import { AtelierPreloader } from './components/ui/AtelierPreloader';
import { AtelierCursor } from './components/ui/AtelierCursor';
import { ScrollProgressSpine } from './components/ui/ScrollProgressSpine';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { EssenceMarquee } from './components/sections/EssenceMarquee';
import { EssenceManifesto } from './components/sections/EssenceManifesto';
import { BrandDiagnosisSection } from './components/sections/BrandDiagnosisSection';
import { BrandEssenceAiLab } from './components/sections/BrandEssenceAiLab';
import { ServicesAtelierSection } from './components/sections/ServicesAtelierSection';
import { EditorialShowcaseSection } from './components/sections/EditorialShowcaseSection';
import { ConsciousMethodSection } from './components/sections/ConsciousMethodSection';
import { FounderSection } from './components/sections/FounderSection';
import { ContactAtelierSection } from './components/sections/ContactAtelierSection';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <AtelierStateProvider>
            <div className="min-h-screen flex flex-col bg-canvas text-ink-primary">
              <AtelierPreloader />
              <AtelierCursor />
              <ScrollProgressSpine />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[var(--action-cta-bg)] focus:text-[var(--action-cta-fg)] focus:text-xs focus:uppercase focus:tracking-widest"
              >
                Skip to content
              </a>
              <Navbar />
              <main id="main-content" className="flex-1">
                <HeroSection />
                <EssenceMarquee />
                <EssenceManifesto />
                <BrandDiagnosisSection />
                <BrandEssenceAiLab />
                <ServicesAtelierSection />
                <EditorialShowcaseSection />
                <ConsciousMethodSection />
                <FounderSection />
                <ContactAtelierSection />
              </main>
              <Footer />
            </div>
          </AtelierStateProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
};

export default App;
