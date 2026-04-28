# Jitwise

**Scope-first estimation for software projects.**

Jitwise helps developers structure project scope, model complexity explicitly, generate defendable estimates, and communicate pricing clearly to clients. The system prioritizes structured thinking over automation — the estimation engine is deterministic and predictable, with AI as an optional advisory layer.

---

## Features

- **3-step estimation wizard** — select modules, set risk/urgency/rate, review results
- **Deterministic engine** — same input always produces the same output; no black boxes
- **16 module catalog** — grouped by category (Core, Commerce, Data, Infrastructure, Internal), each with 3 complexity tiers
- **AI Scope Advisor** — per-module analysis of missing considerations, technical complexity, integration risks, and open questions
- **Client Summary Generator** — AI-generated professional narrative enriched with advisor findings
- **Scope Template Generator** — AI-generated developer checklist based on selected modules and advisor output
- **Export system** — PDF brief, Markdown report, JSON export, Project Brief
- **Estimation history** — save, list, filter, edit, and delete estimations
- **Outcome tracking** — log actual hours/cost against estimates; advisor retrospective shows which risks materialized
- **Insights dashboard** — accuracy rate, average deltas, risk-level breakdown across all tracked outcomes
- **Document attachments** — upload specs and requirements; doc titles feed the AI advisor as context

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| UI Primitives | Radix UI, shadcn/ui |
| Animations | Motion |
| Forms | React Hook Form + Zod |
| Auth + Database | Supabase (PostgreSQL + RLS) |
| Storage | Supabase Storage |
| AI | OpenAI API |
| Payments | Stripe |
| Notifications | Sileo |
| PDF | @react-pdf/renderer |
| Package manager | pnpm |
| Deployment | Vercel |

---

## Getting Started

**Prerequisites:** Node.js 20+, pnpm

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
#          SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, OPENAI_MODEL,
#          STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start local development server |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/
│   ├── (marketing)/          # Landing page, pricing, public routes
│   ├── (app)/                # Authenticated app shell
│   │   ├── estimate/         # New estimation wizard
│   │   ├── estimate/[id]/    # Edit existing estimation
│   │   ├── estimations/      # Estimation list + detail view
│   │   └── insights/         # Accuracy metrics dashboard
│   └── api/
│       ├── advisor/          # POST — AI Scope Advisor
│       ├── summary/          # POST — AI Client Summary
│       ├── templates/scope/  # POST — AI Scope Template
│       ├── estimations/      # CRUD + outcome tracking + PDF export
│       └── documents/        # File upload / download
├── components/estimate/      # All estimation UI components
└── lib/
    ├── catalog/modules.ts    # Static module catalog (16 modules)
    ├── engine/               # Deterministic estimation engine
    ├── schema/               # Zod types and validation
    ├── summary/              # Client summary generation + advisor parser
    └── export/               # Markdown, JSON, PDF builders
```

---

## Estimation Engine

The engine is a pure, deterministic function — no external calls, no side effects.

```
baseScopePoints = Σ points[moduleId][complexity]

hoursMin      = baseScopePoints × 1.5 × riskMultiplier × urgencyMultiplier
hoursProbable = baseScopePoints × 2.5 × riskMultiplier × urgencyMultiplier
hoursMax      = baseScopePoints × 4.0 × riskMultiplier × urgencyMultiplier
```

**Risk multipliers:** Low `1.00` · Medium `1.15` · High `1.30`

**Urgency multipliers:** Normal `1.00` · Expedite `1.20` · Rush `1.40`

---

## Roadmap Status

| Phase | Description | Status |
|---|---|---|
| 0 | Foundation (Next.js, Supabase, TypeScript, Tailwind) | ✅ Complete |
| 1 | Core Estimation Engine | ✅ Complete |
| 2 | Estimation Interface (3-step wizard) | ✅ Complete |
| 3 | Persistence Layer (CRUD, history) | ✅ Complete |
| 4 | Client Summary Generator | ✅ Complete |
| 5 | Documents System | ✅ Complete |
| 6 | Estimation Quality Insights | ✅ Complete |
| 7 | AI Scope Advisor | ✅ Complete |
| 8 | Export System (PDF, Markdown, JSON) | ✅ Complete |
| 9 | CLI Tool | 🔲 Not started |
| 10 | Team Collaboration | 🔲 Not started |

---

## Design Principles

- **Deterministic core** — the engine always produces the same output for the same input
- **AI as advisory layer** — AI never replaces the engine; it augments scope clarity
- **Structured thinking** — scope is defined explicitly before any estimate is computed
- **Minimal surface area** — no speculative features; every system exists because it was needed
