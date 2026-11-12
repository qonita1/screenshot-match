---
applyTo: "src/**"
---

# Architecture boundaries

## Read before changes
Read root `AGENTS.md` and `.github/copilot-instructions.md`.
Read docs: ARCHITECTURE.md, API_CONTRACTS.md, MIGRATION_GUIDE.md.
Inspect current implementation before editing; the parallel build may be incomplete.

## Implementation rules
1. Preserve the modular monolith and existing dependency direction.
2. Routes compose features; features call platformApi; adapters implement PlatformApi.
3. Domain types live in src/shared/types/domain.ts; do not duplicate them.
4. Use shared/contracts/api.contract.ts and agent.contract.ts as stable boundaries.
5. platformApi currently exports the mock implementation from services/index.ts.
6. A real adapter must replace mocks without changing dashboard imports.
7. Agent UI calls hooks/services; only provider adapters handle provider integrations.
8. Real AI must use createServerFn; keys never enter browser code.
9. Lovable AI Gateway is planned default; obey root AGENTS.md gateway rules.
10. Cloudflare Workers requires edge-compatible APIs and dependencies.
11. URL role switching is mock; production needs server authorization and RLS.
12. Football ID remains player-owned; organization access follows relationships.
13. Approve architecture/library changes explicitly; never silently replace routing.
14. Review all consumers before changing contracts or shared component names.
15. No parallel pages, feature trees, design systems, or database migration edits.

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
