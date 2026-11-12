---
applyTo: "src/**/*.{ts,tsx}"
---

# Frontend implementation

## Read before changes
Read root `AGENTS.md` and `.github/copilot-instructions.md`.
Read docs: ARCHITECTURE.md, API_CONTRACTS.md, COMPONENT_CATALOG.md.
Inspect current implementation before editing; the parallel build may be incomplete.

## Implementation rules
1. Use React 19 and strict TypeScript; canonical types belong in shared domain/contracts.
2. Use TanStack Start v1 and TanStack Router; do not install React Router.
3. Keep route files thin with head(), loaders, and feature composition.
4. Use flat dot route names; app.ssb.players.index.tsx maps to /app/ssb/players.
5. Put SSB code in organization and tournament code in competition features.
6. Use feature queries.ts queryOptions and platformApi; never import mock data into UI.
7. Use react-hook-form + Zod for forms and preserve input on recoverable errors.
8. Use existing shadcn new-york primitives and cva variants rather than copies.
9. Use semantic Tailwind v4 tokens; no hardcoded palette colors or tailwind.config.js.
10. Account for SSR: browser APIs run only in client-safe contexts.
11. Cloudflare Workers server code must not depend on Node-only APIs.
12. Keep query caches and SSR data isolated by trusted identity/scope.
13. Include loading, empty, error, validation, and success behavior.
14. Use sonner as supplementary feedback, not the sole error explanation.
15. Keep Mode Prototipe visible for mock auth; URL role is not security.

## Workflow
1. Identify affected files, existing reusable patterns, and shared contracts.
2. State impact and missing requirements before architectural changes.
3. Implement the smallest appropriate change; preserve concurrent work.
4. Validate relevant business rules and interactions.
5. Update documentation and explicit assumptions.

## Boundaries
Do not replace libraries, remove working features, or bypass server authorization.
Do not modify managed migrations/generated files; follow root AGENTS.md.
Never present mock auth or mock AI as production integrations.
UI restrictions are not security controls.

## Handoff evidence
Report changed files and any contract/API impact.
List checks actually executed, failures, pending checks, and known limitations.
Do not claim responsive QA or production readiness without evidence.
Continue the existing application; do not create parallel implementations.
