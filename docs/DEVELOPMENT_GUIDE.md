# Development Guide

## Read first
Read root `AGENTS.md`, `.github/copilot-instructions.md`, applicable scoped
instructions, `ARCHITECTURE.md`, and the relevant feature/contract documentation.
The parallel app build may be incomplete; inspect current files before implementation.
This documentation set uses the supplied architecture, not claims of verified completion.

## Tooling and conventions
Use bun and the existing dependency manifest/lockfile; do not silently replace packages.
Stack: TanStack Start v1, React 19, Vite 7, strict TypeScript, Tailwind v4.
Routing uses TanStack Router; server code targets Cloudflare Workers.
Use canonical domain types, `platformApi`, and feature query options.
UI copy is Bahasa Indonesia; documentation and code identifiers are English.
Do not hardcode business data in pages or create a parallel design system.

## Bounded change workflow
1. Inspect relevant code, dependencies, routes, current components, and integrations.
2. Describe scope, affected files, shared contract impact, and assumptions.
3. Reuse a primitive/pattern and implement the smallest feature-local change.
4. Include loading, empty, error, validation, and successful interaction states.
5. Validate focused tests and relevant regressions; distinguish executed from pending checks.
6. Update docs, assumptions, and handoff notes; stop if critical issues remain.
Coordinate concurrent changes; never overwrite another environment's work unread.

## Tests
Run all tests with `bunx vitest run` or targeted files with
`bunx vitest run <test-file>` after inspecting existing test organization.
Vitest + Testing Library tests live next to code or in `src/test`.
Prioritize consent defaults, permission filtering, relationship scope, agent permission checks,
and meaningful user interactions over exact markup/copy snapshots.
Do not claim tests, accessibility, responsive QA, or deploy readiness without execution evidence.

## Manual QA
Check desktop, tablet, mobile, keyboard navigation, focus, and zoom/reflow.
Exercise direct URLs, invalid IDs, role-specific navigation, search, filtering, pagination,
form validation, dialog focus, notifications, and assistant pending/error behavior.
Review every screen for readability, visual consistency, navigation, and all data states.
Target WCAG 2.2 AA; record remaining gaps rather than claiming certification.

## Foundation definition of done: evidence required
- [ ] Consistent token-driven design system and responsive shell.
- [ ] Public landing page and authentication UI with honest mock labeling.
- [ ] Player, parent, SSB, and tournament dashboards.
- [ ] Role-based navigation and reusable component library.
- [ ] Separated mock data/services and functional interactive prototype.
- [ ] Copilot UI, documented provider abstraction, and defined agent contracts.
- [ ] Copilot main/scoped instructions, agent definitions, reusable prompts.
- [ ] Technical documentation and recorded assumptions.
- [ ] Responsive QA performed with evidence and known gaps.
- [ ] No unnecessary duplicate components or architecture.
- [ ] No unapproved database or security changes.
These are acceptance criteria, not statements that the parallel implementation passes.

## Handoff report
State files changed, user-visible outcome, service/contract impact, tests executed,
manual checks performed, pending work, risks, and the next bounded task.
Reference `MIGRATION_GUIDE.md` before real auth, payments, persistence, or AI integration.
