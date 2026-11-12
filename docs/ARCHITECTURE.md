# Architecture

## Baseline
Modular monolith, API-first, component-driven, AI-agent-ready.
TanStack Start v1 provides React 19 SSR, Vite 7, and file-based TanStack Router.
TypeScript is strict; bun is the package manager. Do not add React Router.
Deploy to Cloudflare Workers; server dependencies must support the edge runtime.
Do not use Node-only APIs such as filesystem access or Node-specific SDK transports.

## Dependency direction
Route → feature component/query → `platformApi` → adapter.
Copilot component → `useCopilot` → `agent-service` → `AIProvider`.
Shared contracts and domain types are dependencies of both sides of each boundary.
Presentation does not import mock data, provider SDKs, or database clients.

## Directory responsibilities
| Location | Responsibility |
| --- | --- |
| `src/routes/` | Thin route definitions, `head()`, loaders, feature composition |
| `src/components/ui/` | shadcn/ui new-york primitives, cva variants |
| `src/components/layout/` | Shell, public/auth layouts, headers |
| `src/components/navigation/` | Role switcher, breadcrumbs, notifications |
| `src/components/dashboard/` | Stats, sections, states, timeline, badges |
| `src/components/tables/` | Shared searchable, paginated DataTable |
| `src/components/charts/` | AttendanceChart, DevelopmentChart |
| `src/components/football/` | Player, team, match, tournament, organization cards |
| `src/components/identity/` | FootballIdCard, ConsentControl |
| `src/components/competition/` | StandingsTable, KnockoutBracket |
| `src/features/` | auth, onboarding, player, parent, organization, competition, coach, scout, agent |
| `src/shared/types/domain.ts` | Canonical domain entities |
| `src/shared/contracts/` | Stable API and agent interfaces |
| `src/shared/constants/` | roles.ts and navigation.ts |
| `src/services/index.ts` | Public `platformApi` export |
| `src/services/mock/` | mock-data.ts and mock-platform-api.ts |

Features use `components/` and, where needed, `queries.ts` with Query `queryOptions`.
SSB functionality is in `organization`; tournament functionality is in `competition`.
Do not introduce parallel team/training/football-id feature trees without review.

## Routing
Flat dot naming: `app.ssb.players.index.tsx` → `/app/ssb/players`.
Public: `/`, `/login`, `/register`, `/forgot-password`, `/verify-otp`,
`/account-recovery`, `/select-role`, `/onboarding`.
`/app` is the shell layout. Role roots: `/app/player`, `/app/parent`, `/app/ssb`,
`/app/tournament`, `/app/coach`, `/app/scout`.
Player adds `/football-id`; parent adds `/payments` and `/consent`.
SSB adds `/players`, `/players/$playerId`, `/teams`, `/training`, `/finance`.
`/app/ssb/$section` represents placeholders for coaches, attendance, competitions,
development, documents, and settings; it is not proof these workflows are implemented.
Tournament adds `/teams`, `/schedule`, `/standings`, and placeholder `/$section`.
Do not duplicate these pages in another routing directory.

## State and integration
TanStack Query owns asynchronous service state; forms use react-hook-form + Zod.
Keep transient UI state local; do not duplicate fetched data in unrelated state stores.
The stable `PlatformApi` lets a real adapter replace mocks without rewriting dashboards.
SSR loaders and query hydration must use consistent options and avoid browser-only APIs.
Never share request-specific identity or sensitive caches between SSR requests.

## Security and delivery status
Prototype role comes from URL/role switcher; this is not authentication.
Production requires trusted session verification, server authorization, RLS, and consent checks.
AI calls must use a server function (`createServerFn`) with minimized authorized context.
Read `API_CONTRACTS.md`, `AI_AGENT_ARCHITECTURE.md`, and root `AGENTS.md`
before changing boundaries, schemas, provider integrations, or generated files.
