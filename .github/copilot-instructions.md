# Football Ecosystem Platform: repository instructions

Read root `AGENTS.md` first and respect its Lovable-managed block.
Read this document and relevant `.github/instructions/` files before changes.
Use the same repository and instructions in Lovable and GitHub Copilot.

## 1. Product vision
The player owns the journey. Football ID belongs to the player, not an SSB.
Build Indonesia's Football Identity, Football OS, and Football Competition layers.
MVP roles: player, parent, SSB administrator, tournament organizer.
Coach and scout are future-ready experiences, not complete operational products.
Read `docs/PRODUCT_BLUEPRINT.md`; full Blueprint v0.1 has not been supplied.

## 2. Project structure
Thin routes live in `src/routes/`; reusable UI in `src/components/`.
Feature code lives in `src/features/<feature>/`; domain types in `src/shared/types/domain.ts`.
Shared contracts live in `src/shared/contracts/`; adapters in `src/services/`.
Agent UI and orchestration live in `src/features/agent/`.

## 3. Technology conventions
Use TanStack Start v1, React 19, TypeScript strict, Vite 7, and bun.
Routing is file-based TanStack Router; never add React Router.
Use TanStack Query, react-hook-form, Zod, recharts, sonner, and Lucide.
Cloudflare Workers server code must use edge-compatible APIs, not Node-only APIs.

## 4. Design system
Tailwind v4 is CSS-first: `src/styles.css` imports tokens and typography.
Do not introduce `tailwind.config.js`, another CSS framework, or a second design system.
Use semantic tokens, Plus Jakarta Sans, JetBrains Mono for IDs/numeric data,
4px spacing, and radius tokens based on `--radius: 0.5rem`.
Never hardcode hex values or palette color utilities in components; add semantic tokens.

## 5. Component reuse
Reuse shadcn/ui new-york primitives from `src/components/ui`.
Extend via cva variants instead of copying or forking primitives.
Reuse layout, dashboard, table, football, identity, and competition components.
Check all references before renaming shared components; avoid duplicate implementations.

## 6. Feature modularity
Keep presentation, query options, validation, and service integration separated.
Use feature `queries.ts` for TanStack Query `queryOptions` where needed.
Do not embed business data or service implementations inside pages.

## 7. Naming
Components use PascalCase; hooks use `useX`; feature/service modules use kebab-case.
Routes use flat dot naming: `app.ssb.players.index.tsx` maps to `/app/ssb/players`.
Use established role keys `player`, `parent`, `ssb`, `tournament`, `coach`, `scout`.
User-facing copy is Bahasa Indonesia; code and documentation are English.

## 8. TypeScript
Preserve strict typing; avoid `any`, unjustified assertions, and duplicate domain types.
Validate untrusted boundaries with Zod; narrow unknown input before use.
Use the canonical domain and contract types rather than parallel interfaces.

## 9. API boundary
Consume `platformApi` from `src/services/index.ts` through the `PlatformApi` contract.
The current implementation is mock; real HTTP/server-function adapters replace it without UI changes.
Review all consumers and tests before shared contract changes; document the impact.
Never bypass backend authorization or mistake UI hiding for security.

## 10. AI boundary
Football Ecosystem Copilot uses `useCopilot`, `agent-service`, and `AIProvider`.
Current provider is explicitly labeled `MockAIProvider`; never imply real AI is connected.
Keep definitions, instructions, tools, configuration, and permission checks separate from UI.
A real provider must run behind `createServerFn`; never call providers from components.
Lovable AI Gateway is planned default; follow root gateway rules and keep adapters replaceable.
Never expose keys or pass unrestricted database/context access to agents.

## 11. Privacy
Relationships grant scoped access; organizations never own Football IDs.
Guardian consent is required for minors; sensitive permissions default OFF.
Scouting requires guardian scouting consent and exposes non-sensitive fields only.
No medical data in ordinary dashboards or AI context; minimize identifiers and logs.
URL/role switching and authentication screens are mock, labeled “Mode Prototipe”.
Real auth, server authorization, and row-level security are not connected yet.

## 12. Testing
Run relevant tests using `bunx vitest run`; use Testing Library for interaction behavior.
Tests belong beside code or in `src/test`; prioritize consent and permission business rules.
Check keyboard access, responsive states, validation, navigation, and assistant errors.
Do not claim checks passed unless executed; report commands and remaining gaps.

## 13. Changes requiring approval
Do not replace libraries, routing, design systems, shared contracts, or working features silently.
Do not remove working features, bypass security, or present mock auth as production auth.
Never modify database migrations without task authorization; root AGENTS.md additionally
requires Lovable to manage schema changes. Explicit authorization does not override that rule.
Never overwrite another environment's changes without reading them.

## Handoff workflow: Lovable ↔ Copilot
1. Inspect current files, dependencies, components, routing, and affected integrations.
2. Identify the smallest file set and document architectural/contract impact before editing.
3. Use one component architecture, design system, router, domain model, API contract,
   feature structure, AI contract, and instruction set; no parallel pages or implementations.
4. Implement the smallest appropriate change, preserving concurrent work.
5. Validate affected behavior and regressions; record what was and was not executed.
6. Update relevant documentation, assumptions, and explicit shared-contract impact.
7. Report completed work, pending work, risks, and the next bounded step.
Copilot continuation is not a migration to a different application.
