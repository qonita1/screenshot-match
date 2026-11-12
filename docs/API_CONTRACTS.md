# API Contracts

## Canonical boundaries
`src/shared/contracts/api.contract.ts` defines `PlatformApi`.
`src/services/index.ts` exports `platformApi`; it currently selects the mock implementation.
`src/shared/contracts/agent.contract.ts` defines AgentRequest, AgentResponse,
AIProvider, and AgentDefinition.
Actual TypeScript definitions are authoritative; this document does not invent missing methods.

## Service consumption
Feature components/query functions depend on `platformApi`, never mock implementation files.
Feature `queries.ts` exposes TanStack Query `queryOptions` where asynchronous data is used.
Routes stay thin: loaders coordinate data and pages compose feature components.
Keep query identity scoped to role/relationship/entity where relevant; prevent cache leakage
between sessions, organizations, children, and SSR requests.
Do not use client-side query keys as authorization evidence.

## Canonical domain vocabulary
`src/shared/types/domain.ts` contains:
- Player, FootballId, Guardian, GuardianRelationship.
- Organization, OrganizationRelationship, Team, Coach.
- TrainingSession, AttendanceRecord, Match.
- Tournament, TournamentCategory, Standing.
- Invoice, ConsentRecord, Notification.
Import these definitions instead of recreating domain DTOs in pages.
FootballId represents persistent identity; relationships represent affiliation and guardian scope.

## Current mock adapter
`src/services/mock/mock-data.ts` holds consistent Indonesian sample data.
`src/services/mock/mock-platform-api.ts` implements the service boundary.
Examples: Rizky Pratama, IDN-FB-2016-000123, SSB Makassar United,
U10, Makassar Youth Cup 2027, Makassar, Sulawesi Selatan.
Mock writes and invoice actions must be labeled simulated; persistence is not guaranteed.
Do not create fake production transactions or claim payment settlement.

## Planned real adapter
Replace the selected implementation with HTTP or TanStack Start server-function calls.
Keep UI imports and `PlatformApi` consumer expectations stable.
Validate input with Zod, authenticate server-side, authorize scope, and minimize output.
Server code runs on Cloudflare Workers; use fetch/Web APIs and edge-compatible packages.
Do not publish fabricated REST paths, pagination envelopes, or error fields as final contracts.
If an adapter needs a contract change, request review rather than bypassing the boundary.

## Agent contract
Conceptually a request identifies an agent and message, with optional context;
a response communicates success, message, optional data, and error.
`AIProvider.generateResponse(request)` returns `Promise<AgentResponse>`.
Use canonical types for exact field shapes; browser-supplied context is untrusted.
Do not add tool execution authority merely because a request carries arbitrary context.

## Error and mutation behavior
Preserve the established typed error convention after inspecting the contract.
Distinguish empty data from denial, network failure, validation, and unknown entities.
Avoid exposing sensitive identifiers in user-facing errors, logs, and toast messages.
Invalidate affected queries after successful mutations; prevent duplicate submissions.
Define idempotency, pagination, concurrency, and retry policy before real financial operations.

## Contract change checklist
List affected adapters, feature queries, loaders, forms, agent context builders, and tests.
Document compatibility and migration strategy; update mock and real adapters together.
Test authorization failures and malformed input, not only successful fixtures.
See `MIGRATION_GUIDE.md` for rollout gates; real endpoints/auth are not connected yet.
