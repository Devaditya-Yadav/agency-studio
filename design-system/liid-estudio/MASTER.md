# MASTER Design System — LIID ESTUDIO (Concept Study Source of Truth)

- **Project:** LIID ESTUDIO | Creative Essence *(Unofficial Portfolio Concept Study)*
- **Narrative Pattern:** Scroll-Triggered Storytelling (Hero Hook → `#8B8563` ESENCIA Manifesto → Logo vs. Brand Diagnosis → Interactive Essence Lab → 3-Pillar Services Atelier → Tactile Universe Grid → 4-Step Scrubbed Conscious Method → Studio Spotlight → Calm Climax Inquiry)
- **Design Dials:** Variance `4/10` (Editorial Equilibrium) • Motion `7/10` (GSAP ScrollTrigger + Framer Motion Spring Physics) • Density `3/10` (Spacious Boutique Atelier)

## 1. Verified 60·30·10 Color Tokens
- **60% Sunlit Surfaces:** `--bg-canvas: #FAF8F4`, `--bg-surface: #F2EFE9`, `--bg-editorial: #DEDAD0`, `--border-strong: #C8C2B4`
- **30% Olive Essence & AAA Ink:** `--liid-olive-500: #8B8563` (large >=24px display & emblems), `--liid-sage-300: #AEB291`, `--text-heading: #555132` (`7.59:1` AAA), `--text-primary: #2A2820` (`13.91:1` AAA), `--text-secondary: #635F52`
- **10% Conscious Terracotta CTA:** `--action-cta-bg: #B65028` (`4.75:1` AA), `--action-cta-hover` / `--text-accent: #983E1B` (`6.51:1` AA+)
- **Evening Studio (`[data-theme="dark"]`):** `--bg-canvas: #1C1B17`, `--bg-surface: #26241E`, `--text-primary: #F2EFE9` (`15.02:1` AAA), `--action-primary-bg: #AEB291` (`7.86:1` AAA), `--action-cta-bg: #C95D33`

## 2. Three-Voice Typography Rules
- **Display Serif:** `Cormorant Garamond` (400, 500, 600) — `+0.16em` uppercase wordmark/manifesto tracking; `-0.01em` editorial H1/H2
- **Calligraphic Keyword Accent:** `Alex Brush` (400) — strictly 1 lowercase emotional keyword inline (`1.28em`, `0em` tracking) + studio sign-off
- **Humanist UI & Body Sans:** `Plus Jakarta Sans` (300, 400, 500, 600) — `+0.26em` uppercase eyebrows; `1.7` body line-height

## 3. Accessibility & Motion Guardrails
- `scroll-padding-top: 88px` on `html` prevents sticky header focus/anchor obscuration (WCAG 2.2 AA `2.4.11`).
- `2px solid var(--action-cta-bg)` with `3px` offset on `:focus-visible`.
- Zero emojis; crisp `1.5px–1.7px` `lucide-react` vector icons and bespoke inline `LD.` monogram SVGs.
- Strict GSAP (`useGSAP` scoped) vs. Framer Motion (`MotionConfig reducedMotion="user"`) DOM ownership separation.
