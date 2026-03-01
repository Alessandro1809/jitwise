# Jitwise — Agent Instructions

## Project Overview

Jitwise is a scope-first software estimation tool for developers.

The product focuses on:
- Structured project scoping
- Risk-aware estimation
- Transparent pricing logic
- Defendable client summaries

Jitwise is NOT:
- An AI auto-pricing tool
- A generic SaaS template
- A marketing-heavy product

It is an engineering-grade estimation framework implemented as a modern web application.

---

## Tech Stack

- Next.js (App Router)
- TypeScript (strict mode enabled)
- pnpm
- TailwindCSS (utility-first styling)
- Zod (validation)
- No unnecessary dependencies

---

## Architectural Principles

### 1. Separation of Concerns

The project follows strict layer separation:

- `/app` → routing and layout only
- `/components` → UI components
- `/lib/catalog` → module definitions & scoring metadata
- `/lib/engine` → pure estimation logic (no UI, no side effects)
- `/lib/schema` → validation and type definitions
- `/lib/summary` → client-facing output generation

The estimation engine must remain:
- Pure
- Deterministic
- UI-independent

Never couple engine logic with React components.

---

### 2. Estimation Engine Rules

The engine must:

- Be fully typed
- Contain no UI logic
- Avoid side effects
- Accept structured input
- Return structured output

Core function example:


calculateEstimation(input: EstimationInput): EstimationResult


No formatting. No JSX. No DOM usage.

---

### 3. UI Guidelines

Landing:
- Minimal
- Professional
- Engineering-focused
- No hype language
- No AI buzzwords

App UI:
- Clean
- Functional
- Structured
- Clear hierarchy

Avoid:
- Unnecessary animations
- Marketing fluff
- Heavy component libraries

---

### 4. Naming Conventions

- Files: kebab-case
- Components: PascalCase
- Functions: camelCase
- Types/Interfaces: PascalCase
- Constants: UPPER_CASE

Examples:

- `calculateRiskMultiplier`
- `EstimationInput`
- `MODULE_CATALOG`

---

### 5. Folder Structure


app/
(marketing)/
(app)/
estimate/

components/
landing/
estimate/
ui/
shared/

lib/
catalog/
engine/
schema/
summary/


Do not mix responsibilities.

---

### 6. Code Quality Expectations

All generated code must:

- Use strict TypeScript
- Avoid `any`
- Avoid implicit returns in complex functions
- Be readable
- Prefer explicit over clever

Never generate:
- Over-abstracted patterns
- Premature optimization
- Over-engineered state management

---

### 7. State Management

For MVP:
- Local React state is preferred.
- No global state unless strictly required.
- Avoid Redux, Zustand, etc., unless explicitly requested.

---

### 8. Form Handling

Prefer:
- Controlled inputs
- Explicit state mapping
- Zod validation before engine execution

No silent assumptions.

---

### 9. Engine Constraints

Estimation must always include:

- Base scope points
- Risk multiplier
- Urgency multiplier
- Hours range (min / probable / max)
- Pricing range

Output must be structured and deterministic.

---

### 10. What to Avoid

Do NOT:

- Introduce AI-based auto estimation
- Add database layers unless explicitly requested
- Add authentication unless requested
- Add unnecessary configuration files
- Add Docker or infra prematurely

Jitwise is MVP-first.

---

### 11. Design Philosophy

The product tone must reflect:

- Clarity
- Precision
- Discipline
- Engineering maturity

Avoid hype.
Avoid startup buzzwords.
Avoid exaggerated claims.

---

### 12. When Generating Code

Always:

- Keep functions small
- Use descriptive variable names
- Add light inline comments explaining reasoning
- Preserve architectural boundaries

Never generate code that:
- Mixes UI and engine logic
- Violates folder separation
- Adds hidden side effects

---

### 13. Long-Term Direction

Future expansion may include:

- CLI interface
- Saved project snapshots
- Team collaboration
- Exportable PDF summaries

Engine must remain reusable for these future directions.

---

## Final Directive

Codex should prioritize:

1. Clarity over cleverness
2. Structure over speed
3. Determinism over automation
4. Maintainability over abstraction

Jitwise is a professional engineering tool.

All output must reflect that standard.