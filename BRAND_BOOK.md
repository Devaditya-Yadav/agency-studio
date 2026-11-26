# LIID ESTUDIO — Unofficial Concept Brand Book & Website Design System

> **Portfolio Concept Disclaimer:** This repository is an **unofficial, non-commercial portfolio concept study** exploring quiet-luxury brand systems, WCAG 2.1 AA/AAA design tokens, and bilingual React + GSAP frontend engineering. It is not affiliated with, endorsed by, or officially representing any real-world business or individual. All contact details, domains, and handles in this project are fictitious placeholders.

**Creative Essence • Estudio Boutique • Marketing Consciente**  
**Concept Location:** Spain (Bilingual ES / EN)  
**Placeholder Contact:** `hello@example.com` • `+34 600 000 000` • `studio.example.com` • `@studio.concept`

---

## 01. Concept Direction & Positioning Study

This concept study models a **quiet-luxury boutique creative studio** transitioning into a full digital flagship (*Agenda Proyectos 2026*), rejecting high-volume agency templates in favor of bespoke, introspective brand crafting.

### Core Concept Pillars

| Dimension | Concept Signal | Strategic Takeaway |
| :--- | :--- | :--- |
| **Concept Name & Descriptor** | `LIID ESTUDIO \| Creative Essence` | Balances boutique Spanish warmth (*Estudio*) with international creative authority (*Creative Essence*). |
| **Leadership Voice** | **Creative Direction** (*Boutique Studio Lead*) | Founder-led, human-first studio voice grounded in calm strategic partnership. |
| **Positioning** | *Estudio boutique • Marcas con esencia propia* / *Dirección creativa • Comunicación de marca* | Rejects volume-agency templates in favor of bespoke, high-touch brand crafting rooted in identity. |
| **Core Service Trilogy** | **Diseño visual • Social media • Comunicación** | Unified service architecture spanning identity systems, digital curation, and conscious communication. |
| **Editorial Anchor Philosophy** | **MARKETING CONSCIENTE** & **ESENCIA** — *"Antes de construir tu marca, siéntela."* | Introspection precedes aesthetics: brands must be *felt* and aligned with human truth before visual execution. |
| **Demo Contact & Location** | `hello@example.com` • `+34 600 000 000` • Spain (Placeholder) | Configurable via environment variables (`VITE_STUDIO_*`). |

---

## 02. Brand Heart: Essence, Goal, Vision, Mission & Values

- **Brand Essence:** **Creative Essence (*Esencia Creativa*)** — Translating the intangible soul of a project into a tangible, coherent, and timeless visual and verbal universe.
- **Brand Goal (*Objetivo*):** Help purpose-driven founders, personal brands, and boutique businesses evolve from *"having just a logo"* (*"¿Tienes una marca o solo un logo?"*) into owning a complete, coherent brand ecosystem where visual design, social media, and conscious strategy work in harmony.
- **Brand Vision (*Visión*):** Serve as a benchmark boutique creative & conscious-marketing atelier for soul-led businesses across Spain and international markets.
- **Brand Mission (*Misión*):** Guide brands from the inside out—combining introspective brand strategy, elevated visual design, and conscious communication (*Marketing Consciente*) so every touchpoint speaks with clarity, beauty, and emotional resonance.
- **Core Values (*Valores*):**
  1. **Esencia Propia** (Authentic Essence)
  2. **Coherencia** (Holistic Coherence)
  3. **Consciencia** (Conscious, Human-First Marketing)
  4. **Cuidado Boutique** (Artisanal Craft & Accompaniment)
  5. **Belleza con Propósito** (Editorial Elegance Serving Clarity)

---

## 03. Positioning, Archetype & Verbal Identity

- **Archetype Mix:** **70% The Creator** (editorial craft, bespoke beauty) × **30% The Sage** (introspection, strategic clarity, *Marketing Consciente*).
- **Signature Headline Formula:** Combine an upright high-contrast Display Serif phrase with **1 single lowercase keyword in flowing calligraphy script**:
  - `Social` + *`media`* — *"Comunica con coherencia y una estrategia que impulse tu marca."*
  - `Diseño` + *`visual`* — *"Da forma a una idea para que comunique con coherencia."*
  - `¿Tienes una` + *`marca`* + `o solo un logo?`

---

## 04. Logo & Bespoke Monogram System

- **Primary Avatar Badge:** `./brand-kit/logos/ld-monogram-badge-olive.svg` (`#8B8563` circle + `#F2EFE9` `LD.` monogram)
- **Stationery Wax-Seal Badge:** `./brand-kit/logos/ld-monogram-seal-ivory.svg` (`#F2EFE9` seal + `#8B8563` `LD.` monogram)
- **Standalone Dark Mark:** `./brand-kit/logos/ld-monogram-mark-dark.svg` (`#555132` transparent mark)
- **Full Editorial Wordmark:** `./brand-kit/logos/liid-estudio-wordmark.svg`

---

## 05. Brand & Website Color System (UI/UX 60·30·10 Architecture)

### 60% Sunlit Atelier Neutrals
- **Alabaster Veil** (`--bg-canvas`): `#FAF8F4`
- **Porcelain Linen** (`--bg-surface`): `#F2EFE9`
- **Oat Silk** (`--bg-editorial`): `#DEDAD0`
- **Travertine Stone** (`--border-strong`): `#C8C2B4`
- **Raw Kraft Linen** (`--liid-kraft-400`): `#C9B39B`

### 30% Olive Essence & Editorial Ink
- **Olive Essence** (`--liid-olive-500`): `#8B8563` (`3.51:1` with ivory — large display `>=24px`, monograms & surfaces)
- **Botanical Sage** (`--liid-sage-300`): `#AEB291` (`7.86:1` AAA on Evening Dark `#1C1B17`)
- **Deep Olive Moss** (`--text-heading`): `#555132` (`7.59:1` AAA on `#FAF8F4`; `5.77:1` AA on `#DEDAD0`)
- **Espresso Umber** (`--text-primary`): `#2A2820` (`13.91:1` AAA on `#FAF8F4`)
- **Muted Umber** (`--text-secondary`): `#635F52`

### 10% Conscious Terracotta & Warm Bronze
- **Conscious Terracotta** (`--action-cta-bg`): `#B65028` (`4.75:1` AA with `#FAF8F4` button label)
- **Deep Terracotta Clay** (`--text-accent` / CTA hover): `#983E1B` (`6.51:1` AA+ on `#FAF8F4`)
- **Terracotta Blush** (`--liid-terracotta-100`): `#F5E8E1`
- **Warm Bronze Foil** (`--liid-bronze-500`): `#A67C5B`

---

## 06. Typography System

1. **Display Serif:** `Cormorant Garamond` (Weights 400, 500, 600; `+0.16em` uppercase wordmark/manifesto tracking; `-0.01em` editorial titles)
2. **Calligraphic Accent:** `Alex Brush` (Weight 400; `0em` tracking; strictly 1–2 lowercase accent words inline within serif titles + studio sign-off)
3. **UI & Body Sans:** `Plus Jakarta Sans` (Weights 300, 400, 500, 600; `+0.26em` uppercase micro-eyebrows; `1.7` body line-height)

---

## 07. Brand Kit Structure

```text
agency-studio/
├── BRAND_BOOK.md                                      # Concept Brand Book documentation
├── public/brand-portal.html                           # Interactive Brand Book & Design System Portal
└── brand-kit/
    ├── logos/
    │   ├── ld-monogram-badge-olive.svg                # Primary Olive Essence emblem
    │   ├── ld-monogram-seal-ivory.svg                 # Porcelain stationery wax-seal emblem
    │   ├── ld-monogram-mark-dark.svg                  # Transparent Deep Olive Moss mark
    │   └── liid-estudio-wordmark.svg                  # Full editorial wordmark + pillars lockup
    ├── tokens/
    │   ├── design-tokens.css                          # Light & Dark mode CSS custom properties
    │   ├── tailwind.brand.config.js                   # Tailwind CSS theme configuration
    │   └── brand-tokens.json                          # W3C / Figma Tokens Studio JSON
    └── templates/
        └── social-and-stationery-kit.html             # 4:5 Instagram templates, business cards & email signature
```
