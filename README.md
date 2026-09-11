# Mahmudul Hasan (MK) — Developer Portfolio

A bespoke, production-grade developer portfolio engineered with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **GSAP (ScrollTrigger & SplitText)**, **React Three Fiber (R3F)**, and **MongoDB (Mongoose 9)**.

Designed with a dark-mode-first terminal-meets-editorial aesthetic, featuring precise grids, monospace accents, subtle noise textures, interactive 3D particle geometry, and fluid scroll animations.

---

## Architecture & Tech Stack

- **Framework:** Next.js 16+ (App Router with Turbopack, React 19)
- **Styling:** Tailwind CSS v4 with custom design tokens (`@theme inline` in `app/globals.css`)
- **Animations:** GSAP 3.15 + ScrollTrigger + SplitText (with `prefers-reduced-motion` compliance)
- **3D Graphics:** React Three Fiber 9 + Drei (interactive particle icosahedron with mobile fallback)
- **Typography:** Space Grotesk (geometric headings), Geist (body), JetBrains Mono & Geist Mono (code)
- **Database:** MongoDB via Mongoose 9 (serverless connection pooling on `globalThis`)
- **API Handlers:** Next.js Route Handlers (`app/api/**`) with Zod v4 schema validation
- **Icons:** Lucide React + custom SVG icons for brand identities
- **Deployment:** Vercel-ready with edge metadata, OpenGraph cards, sitemap, and robots.txt

---

## Getting Started

### 1. Prerequisites

- Node.js 20.x or later
- npm or pnpm

### 2. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your variables:

```env
# MongoDB Connection String (Atlas or local)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Production Domain for SEO & OpenGraph tags
NEXT_PUBLIC_SITE_URL=https://mkmahmud.dev
```

> **Note on Offline Mode:** If `MONGODB_URI` is not provided, the application automatically runs in graceful offline mode using typed fallback project data (Codex Edumine, SalesPilot, VCAD) so everything renders seamlessly.

### 4. Database Seeding

Once you have set your `MONGODB_URI` in `.env.local`, seed your projects into MongoDB:

```bash
npx tsx scripts/seed.ts
```

This inserts your initial featured projects:
- **Codex Edumine** (School ERP & OMR Scanner)
- **SalesPilot** (Multi-tenant AI Sales Automation SaaS)
- **VCAD** (Planet Education Networks build)
- Placeholder projects for future additions

### 5. Running Locally

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build

To build and test the production artifact:

```bash
npm run build
npm run start
```

---

## Design System Tokens

| Token | Hex / Value | Description |
|---|---|---|
| `--color-base` | `#0A0E0C` | Deep charcoal/graphite with faint green undertone |
| `--color-surface` | `#121611` | Surface & card container background |
| `--color-elevated` | `#1A1F1C` | Input fields, active cards, hover states |
| `--color-accent` | `#39FF88` | Confident neon-green accent |
| `--color-accent-muted` | `#22C55E` | Calibrated secondary green for badges & labels |
| `--color-secondary` | `#D4A853` | Warm amber accent (<5% usage for hierarchy) |
| `--color-text` | `#E8ECEA` | High-contrast primary off-white |
| `--color-text-muted` | `#8A928D` | Secondary body & metadata text |

---

## Deployment to Vercel

1. Push your repository to GitHub (`github.com/mkmahmud/my-portfolio`).
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Set your Environment Variables in the Vercel Project Settings:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy! Next.js will automatically generate optimized static routes and serverless API endpoints.
