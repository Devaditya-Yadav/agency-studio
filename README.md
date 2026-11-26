# LIID ESTUDIO — Quiet Luxury Digital Atelier & Design System (Concept Study)

> **Portfolio Disclaimer:** This repository is an **unofficial, non-commercial portfolio concept study** built to showcase bilingual (`ES / EN`) frontend architecture, WCAG 2.1 AA/AAA design token engineering, scroll-choreographed GSAP + Framer Motion animations, and production security/CI hygiene. All contact details, domains, and handles are RFC 2606 placeholders.

---

## Highlights

- **Bilingual (`ES / EN`) & Dual-Atmosphere (`Sunlit Atelier` / `Evening Studio`):** Instant language switching and dark mode driven by 3-layer CSS custom properties (`Primitive -> Semantic -> Component`).
- **Animation Ownership Contract:** Strict DOM ownership separation between **GSAP 3 + `ScrollTrigger`** (scroll-scrubbed reveals, pinned manifesto chapter, parallax depth) and **Framer Motion** (layout pill transitions, spring-damped magnetic buttons, accessible `MotionConfig reducedMotion="user"`).
- **Interactive Brand Essence Synthesizer (`/api/essence-diagnosis`):** Deterministic bilingual brand archetype & 60·30·10 palette recommender with a hardened Vite dev middleware (bounded payload size, allowlist validation, `X-Content-Type-Options: nosniff`) and local fallback engine.
- **Standalone Brand Kit & Interactive Portal:**
  - [`BRAND_BOOK.md`](./BRAND_BOOK.md) — Concept positioning, typography hierarchy (`Cormorant Garamond` + `Alex Brush` + `Plus Jakarta Sans`), and 60·30·10 WCAG AA/AAA palette.
  - [`FRONTEND_ARCHITECTURE_AND_PROMPT.md`](./FRONTEND_ARCHITECTURE_AND_PROMPT.md) — Architecture and motion contract documentation.
  - [`design-system/liid-estudio/MASTER.md`](./design-system/liid-estudio/MASTER.md) — Design system rules and tokens.
  - Interactive portals at `/brand-portal.html` and `/brand-kit/templates/social-and-stationery-kit.html`.
- **Production Security & Engineering Hygiene:**
  - Hardened non-root multi-stage Docker container (`nginx-unprivileged`) with strict CSP and HTTP security headers (`nginx.conf`).
  - Zero-dependency unit + live HTTP API middleware tests (`npm test`) and automated PII/secret regression checks (`npm run check:pii`).
  - GitHub Actions CI pipeline (`.github/workflows/ci.yml`).

---

## Tech Stack

- **Frontend:** React 18, TypeScript 5, Vite 6, Tailwind CSS 3.4, Lucide React
- **Motion:** GSAP (`ScrollTrigger`, `@gsap/react`), Framer Motion 11
- **Testing & Quality:** Node native test runner (`node --test`), strict TypeScript (`tsc --noEmit`), custom PII/secret scanner
- **Container & CI:** Multi-stage Docker + non-root Nginx (`read_only` compose setup), GitHub Actions

---

## Quick Start

### Option 1: Docker (1 Command)

```bash
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080).

### Option 2: Local Development (Node.js 22+ / 24 LTS)

```bash
# Install dependencies
npm ci

# Optional: customize placeholder contact labels locally
cp .env.example .env

# Start development server (includes /api/essence-diagnosis middleware)
npm run dev
```

---

## Verification & Quality Scripts

```bash
npm run check:pii   # Scan repo for leaked secrets, PII, or boilerplate
npm run typecheck   # Strict TypeScript check
npm test            # Unit + HTTP API middleware integration tests
npm run build       # Production TypeScript + Vite build
```

---

## Environment Configuration

All variables are optional; safe placeholders from [`.env.example`](./.env.example) are used by default:

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `VITE_STUDIO_EMAIL` | `hello@example.com` | Placeholder studio email |
| `VITE_STUDIO_PHONE` | `+34 600 000 000` | Placeholder phone label |
| `VITE_STUDIO_SOCIAL_HANDLE` | `@studio.concept` | Placeholder social handle |
| `VITE_STUDIO_SOCIAL_URL` | `https://studio.example.com` | HTTPS-validated external link |
| `VITE_STUDIO_WEBSITE_LABEL` | `studio.example.com` | Display domain label |
| `PORT` | `8080` | Host port used by `docker compose` |

---

## License

Source code in this repository is licensed under the [MIT License](./LICENSE).
