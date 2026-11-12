---
mode: agent
description: Implement a thin TanStack route and role-specific feature composition.
---

# Implement Page

## Request
Implement route ${input:route} for role ${input:role}, with acceptance criteria ${input:acceptanceCriteria}.
Constraints and exclusions: ${input:constraints}.

## Step 1 — Read governing instructions
Read root `AGENTS.md`, `.github/copilot-instructions.md`, and applicable scoped instructions.
Read docs/ARCHITECTURE.md, DESIGN_SYSTEM.md, API_CONTRACTS.md, and relevant journey docs.
Read AI_AGENT_ARCHITECTURE.md for agent work and ASSUMPTIONS.md for missing policy.

## Step 2 — Inspect and scope
Inspect actual source and tests; the parallel build may be incomplete.
Find existing components, routes, service methods, and consumers before proposing additions.
List files to change and explicit impact on shared types/contracts.
Do not assume a missing UI means authorization to invent business policy.

## Step 3 — Plan the smallest change
Use flat dot route naming, head()/loader when appropriate, and compose feature components rather than inline business logic.
Preserve TanStack Start v1 / React 19 / TanStack Router and strict TypeScript.
Keep SSB in organization and tournament in competition features.
Use platformApi for data; never import mock fixtures directly into presentation.

## Step 4 — Implement safely
Use semantic Tailwind v4 tokens and existing components; no second design system.
Write Bahasa Indonesia UI copy and provide loading, empty, failure, and validation states.
Preserve SSR safety and Cloudflare Workers edge compatibility.
Keep sensitive permissions OFF and scouting consent/field filtered.
Label mock auth “Mode Prototipe” and label MockAIProvider as simulated.
Real AI must run behind createServerFn; no browser keys or direct provider calls.
For review-only tasks, present findings before making requested fixes.

## Step 5 — Validate
Add or update meaningful behavior tests, prioritizing consent and permission rules.
Run relevant tests with bunx vitest run and report the actual result.
Check responsive, keyboard, focus, navigation, and error behavior where affected.
Do not claim unexecuted tests or manual checks passed.

## Step 6 — Document and hand off
Update focused docs, catalog entries, and explicit assumptions as appropriate.
Report changed files, contract impact, executed checks, pending checks, and next step.
Never remove working features, edit managed migrations, replace libraries, or overwrite
unread concurrent work; obtain required approval for architectural changes.
