# Migration and Continuation Guide

## Meaning of migration
Lovable → GitHub Copilot is continuation in the same repository, not a rewrite.
Preserve one router, design system, type model, component tree, API contract,
feature structure, agent contract, and instruction set.
Read root `AGENTS.md`; do not edit managed blocks, generated files, or database migrations.
Do not rewrite published history or overwrite unread concurrent changes.

## Current versus planned
| Area | Current prototype | Planned production integration |
| --- | --- | --- |
| Role/auth | URL/role switcher, “Mode Prototipe” | Trusted auth session and authorization |
| Platform data | `platformApi` → mock adapter | HTTP/server-function adapter |
| Persistence | Demo behavior, not guaranteed | Authorized durable storage |
| Consent | OFF-by-default UI/business rules | Verified relationships, server checks, audit |
| AI | MockAIProvider | Server-side gateway through AIProvider |
| Payments | Demo invoices/status | Confirmed processor and settlement rules |

## Phase 1: preserve contracts
Inspect actual PlatformApi/domain/agent definitions and every consumer.
Inventory mock assumptions and missing error/pagination/concurrency requirements.
Record any proposed contract changes, dependents, compatibility, and test impact.
Do not invent endpoints or implement a second UI to accommodate the backend.

## Phase 2: connect identity and authorization
Planned auth is Lovable Cloud / Supabase-compatible auth; it is not connected yet.
Use trusted server sessions and authorization; add row-level security as defense in depth.
Define guardian verification, organization scope, and event scope with product/security owners.
Test denial, wrong relationships, forged role/ID, and expired sessions before enabling writes.
Clear identity-scoped caches and conversations on account or scope changes.

## Phase 3: replace platform adapter
Implement PlatformApi behind `src/services/index.ts`; keep UI imports unchanged.
Validate input/output and enforce authorization before returning minimized data.
Use edge-compatible fetch/Web APIs for Cloudflare Workers; avoid Node-only dependencies.
Keep mock mode explicit and selectable only through an intentional configuration boundary.
Test equivalent successful behavior and real failure/denial paths before switching defaults.
Do not leak child records through SSR state, caches, logs, or error messages.

## Phase 4: activate real AI safely
Confirm credentials, backend endpoint, privacy/security requirements, and retention first.
Use `createServerFn` and managed secrets; no provider keys/calls in UI code.
Lovable AI Gateway is planned default; respect root gateway rules.
Enforce agent permissions and minimal consent-filtered context server-side.
Retain AIProvider abstraction and test provider failures without changing dashboards.
Do not enable autonomous writes or unrestricted database tools.

## Phase 5: operational gates
Confirm payments, age eligibility, competition format, OTP policy, and consent categories.
Request schema changes through Lovable; explicit task permission alone is not a schema bypass.
Run focused business-rule tests, integration denial tests, and responsive/accessibility QA.
Document rollout selection, rollback to the previous adapter, and any persisted-data risks.
Never treat rollback as permission to send real sensitive data to mock/public contexts.

## Release evidence
Record exact checks executed, open risks, responsible approvals, and unconnected modules.
Do not remove “Mode Prototipe” until the relevant production behavior is genuinely connected.
Use the foundation checklist in `DEVELOPMENT_GUIDE.md` independently from production readiness.
