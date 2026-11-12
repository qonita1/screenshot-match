# Component Catalog

## How to use this catalog
These are architectural targets supplied for the parallel build, not an inventory
verified against completed source. Inspect implementation before importing or changing APIs.
Do not invent props from this document; use actual TypeScript interfaces.
Shared presentation belongs in `src/components`; feature-specific orchestration stays in features.

## Layout and navigation
| Directory | Components | Responsibility |
| --- | --- | --- |
| layout | AppShell, AppSidebar, AppTopbar | Responsive authenticated prototype shell |
| layout | PageHeader | Page title, description, contextual actions |
| layout | PublicHeader, PublicFooter | Landing/public navigation |
| layout | AuthLayout | Authentication and recovery framing |
| navigation | RoleSwitcher | Prototype role navigation, never authorization |
| navigation | Breadcrumbs | Hierarchy and route context |
| navigation | NotificationCenter | Readable notification entry point |

## Dashboard primitives
| Component | Use |
| --- | --- |
| StatCard | Labeled metric, not an isolated unexplained number |
| SectionCard | Consistent section heading and body |
| EmptyState | Meaningful absence with a relevant next action |
| ErrorState | Recoverable failure and retry where appropriate |
| LoadingState | Loading feedback with stable layout |
| StatusBadge | Semantic status text plus color |
| ActivityTimeline | Chronological journey/operational activity |

## Data and domain components
- `tables/DataTable`: search and pagination; filtering must not strand users on an empty page.
- `charts/AttendanceChart`: attendance summary with readable labels/text alternative.
- `charts/DevelopmentChart`: development trends, not an invented assessment methodology.
- `football/PlayerCard`: minimal player summary appropriate to the viewer's scope.
- `football/TeamCard`: team identity and roster context.
- `football/MatchCard`: match participants, schedule, and status.
- `football/TournamentCard`: event summary without invented competition rules.
- `football/OrganizationCard`: SSB/club relationship context.
- `identity/FootballIdCard`: persistent player identity, never a membership ownership claim.
- `identity/ConsentControl`: explicit purpose and OFF-by-default sensitive sharing.
- `competition/StandingsTable`: configured/demo standings, no implicit tie-break policy.
- `competition/KnockoutBracket`: only applicable to a confirmed or clearly labeled demo format.

## Primitives and feature components
`src/components/ui` contains shadcn/ui new-york primitives.
Extend primitives through cva variants; preserve accessibility behavior.
Use existing form/dialog/drawer primitives before introducing new abstractions.
`src/features/agent/components` owns CopilotLauncher and CopilotPanel.
`useCopilot` coordinates assistant interaction; service and provider logic stays outside UI.
Other role-specific components live in their feature's `components/` directory.

## Reuse and review rules
1. Search for the existing pattern before creating a component.
2. Keep data fetching, permissions, and business state outside generic presentation.
3. Define typed inputs and callbacks from canonical domain types.
4. Cover pending, empty, error, long-content, and mobile states.
5. Label icon-only actions and preserve keyboard/focus behavior.
6. Review references before renaming or changing shared props.
7. Update this catalog when introducing a reusable pattern or retiring one with approval.
