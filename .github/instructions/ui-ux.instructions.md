---
applyTo: "src/components/**,src/features/**/components/**,src/styles/**"
---

# UI and UX implementation

## Read before changes
Read root `AGENTS.md` and `.github/copilot-instructions.md`.
Read docs: DESIGN_SYSTEM.md, UI_UX_GUIDELINES.md, USER_JOURNEYS.md.
Inspect current implementation before editing; the parallel build may be incomplete.

## Implementation rules
1. Prioritize parent clarity, administrator efficiency, and player identity continuity.
2. Use Plus Jakarta Sans; use JetBrains Mono for Football IDs and numeric data.
3. Use 4px spacing and radius tokens based on --radius: 0.5rem.
4. Tokens live in src/styles/tokens.css; src/styles.css is the Tailwind v4 entry.
5. Never hardcode hex or palette color utilities in components; add semantic tokens.
6. Reuse AppShell, PageHeader, state components, domain cards, and DataTable.
7. Use Lucide consistently; give icon-only controls accessible names.
8. Write Bahasa Indonesia UI copy, such as “Belum ada jadwal latihan”.
9. Desktop sidebar becomes intentional mobile navigation, not compressed desktop UI.
10. Prevent page overflow and provide usable mobile table/card behavior.
11. Target WCAG 2.2 AA: contrast, focus visibility, labels, keyboard, and reflow.
12. Pair status color with text and provide readable chart alternatives.
13. Keep sensitive consent OFF by default and explain purposes plainly.
14. No medical dashboard data; scout UI exposes only consented non-sensitive fields.
15. Label mock AI and simulated actions; never imply real payments or verification.

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
