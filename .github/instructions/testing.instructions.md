---
applyTo: "src/**/*.test.{ts,tsx}"
---

# Testing behavior

## Read before changes
Read root `AGENTS.md` and `.github/copilot-instructions.md`.
Read docs: DEVELOPMENT_GUIDE.md, ROLE_PERMISSION_MATRIX.md, AI_AGENT_ARCHITECTURE.md.
Inspect current implementation before editing; the parallel build may be incomplete.

## Implementation rules
1. Use Vitest + Testing Library and bunx vitest run for execution.
2. Tests may live beside code or in src/test; follow existing test conventions.
3. Test business rules and user behavior, not brittle markup or exact prose.
4. Assert sensitive permissions default OFF and absent consent denies scouting.
5. Test guardian and organization scope, including wrong and missing relationships.
6. Test field minimization so scout results cannot contain sensitive data.
7. Test unknown role, agent ID, capability, and unauthorized agent requests.
8. Assert denied agent requests do not call the provider or leak context.
9. Use a fake/mock provider and deterministic fixtures; never real keys or children records.
10. Test loading, empty, failed, retry, validation, filtering, and pagination behavior.
11. Test context changes do not retain another child or organization conversation.
12. Use accessible queries and meaningful keyboard interactions where appropriate.
13. Distinguish component tests from actual server authorization/RLS integration tests.
14. Report exact executed commands and failures; do not claim unrun checks passed.
15. Responsive, contrast, focus, and zoom QA require evidence beyond unit tests.

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
