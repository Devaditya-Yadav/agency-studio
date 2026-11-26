export type Language = 'es' | 'en';

export interface ServicePillar {
  id: string;
  number: string;
  eyebrow: string;
  titlePrefix: string;
  titleScript: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  outcome: string;
  surfaceTone: 'oat' | 'linen' | 'olive';
}

export interface ShowcaseItem {
  id: string;
  category: string;
  title: string;
  scriptTag: string;
  caption: string;
  palette: string[];
  variant: 'seal' | 'agenda' | 'editorial' | 'botanical';
}

export interface MethodStep {
  number: string;
  phase: string;
  scriptWord: string;
  description: string;
}

export interface TranslationDictionary {
  meta: {
    studioDescriptor: string;
    locationBadge: string;
  };
  nav: {
    essence: string;
    services: string;
    universe: string;
    method: string;
    founder: string;
    contact: string;
    cta: string;
    sunlitLabel: string;
    eveningLabel: string;
  };
  hero: {
    eyebrow: string;
    headlinePrefix: string;
    headlineScript: string;
    headlineSuffix: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    pillarsStrip: string[];
    cardTag: string;
    cardQuote: string;
    agendaTitle: string;
    agendaStatus: string;
  };
  manifesto: {
    topLead: string;
    word: string;
    quote: string;
    subcopy: string;
    pillarsLine: string;
  };
  diagnosis: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    titleSuffix: string;
    intro: string;
    logoOnlyTitle: string;
    logoOnlyTag: string;
    logoOnlyPoints: string[];
    trueBrandTitle: string;
    trueBrandTag: string;
    trueBrandPoints: string[];
    ctaPrompt: string;
  };
  services: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    titleSuffix: string;
    intro: string;
    deliverablesLabel: string;
    outcomeLabel: string;
    inquireServiceCta: string;
    items: ServicePillar[];
  };
  showcase: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    titleSuffix: string;
    intro: string;
    instagramCta: string;
    brandBookCta: string;
    items: ShowcaseItem[];
  };
  method: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    titleSuffix: string;
    intro: string;
    steps: MethodStep[];
  };
  founder: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    role: string;
    bioParagraph1: string;
    bioParagraph2: string;
    values: { label: string; detail: string }[];
  };
  contact: {
    eyebrow: string;
    titlePrefix: string;
    titleScript: string;
    titleSuffix: string;
    subtitle: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      serviceLabel: string;
      services: string[];
      storyLabel: string;
      storyPlaceholder: string;
      submitBtn: string;
      successTitle: string;
      successMessage: string;
    };
    directTitle: string;
    locationValue: string;
    responseNote: string;
  };
  footer: {
    tagline: string;
    rights: string;
    brandKitLink: string;
    stationeryLink: string;
  };
}
