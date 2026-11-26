# LIID ESTUDIO — Frontend Architecture & Motion Engineering Spec

> **Note:** Unofficial portfolio concept study. All studio branding and contact details use sanitized placeholders.

**Concept Subject:** `LIID ESTUDIO | Creative Essence` (Unofficial Concept Study — Spain, Bilingual ES / EN)  
**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS 3.4 + GSAP (`ScrollTrigger` + `@gsap/react`) + Framer Motion 11 + W3C Design Tokens

---

## 01. Architectural Decisions & Motion Engineering Contract

To prevent GSAP and Framer Motion from competing on the same DOM `transform` properties, this codebase enforces a strict **Animation Ownership Contract**:

1. **GSAP + `ScrollTrigger` (`useGSAP` scoped)** owns continuous scroll-linked choreography & opening timelines:
   - Hero editorial masked line-reveal & dappled Mediterranean sunlight drift
   - Full-bleed `#8B8563` **ESENCIA** manifesto typographic scrub & pinned chapter reveal
   - Editorial showcase parallax cards & 4-step methodology scrubbed vertical hairline
2. **Framer Motion (`motion`, `AnimatePresence`, `LayoutGroup`)** owns discrete reactive UI state & tactile micro-interactions:
   - Bilingual `ES | EN` `layoutId` pill toggle & `AnimatePresence` copy crossfade
   - `Sunlit Atelier` (Light) <-> `Evening Studio` (Dark) theme toggle
   - Interactive 3-pillar Services Atelier tabs & spring-damped Magnetic CTA buttons
3. **Accessibility, Security & Token Discipline:**
   - Consumes `./brand-kit/tokens/design-tokens.css` directly (60% Sunlit Neutrals, 30% Olive Essence & AAA Umber/Moss Ink, 10% Conscious Terracotta CTA).
   - `<MotionConfig reducedMotion="user">` + `prefers-reduced-motion` media query checks in all GSAP hooks.
   - Shared pure diagnosis engine (`src/services/essenceCore.ts`) validated on both server middleware (`/api/essence-diagnosis`) and client fallback with strict allowlist checks and bounded request payloads.

---

## 02. Production Folder Structure

```text
agency-studio/
├── .github/workflows/ci.yml
├── BRAND_BOOK.md
├── FRONTEND_ARCHITECTURE_AND_PROMPT.md
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── brand-kit/
│   ├── logos/
│   ├── tokens/
│   └── templates/
├── design-system/liid-estudio/MASTER.md
├── public/
│   ├── favicon.svg
│   ├── brand-portal.html
│   └── brand-kit/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── config/studioConfig.ts
│   ├── styles/globals.css
│   ├── types/content.ts
│   ├── services/
│   │   ├── essenceCore.ts
│   │   └── essenceAiEngine.ts
│   ├── i18n/
│   │   ├── translations.ts
│   │   └── LanguageContext.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── AtelierStateContext.tsx
│   └── components/
│       ├── brand/BrandMonogram.tsx
│       ├── ui/
│       ├── layout/
│       └── sections/
└── tests/
    └── essenceCore.test.ts
```

---

## 03. Verification & Production Readiness

- **Type Safety:** `tsc -b` strict TypeScript compilation (`noUnusedLocals`, `noUnusedParameters`, `strict: true`).
- **Automated Testing:** Unit and middleware security tests via `npm test` (`node --test`).
- **Containerized Delivery:** Multi-stage Docker build serving the static bundle from non-root Nginx with hardened CSP and HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
