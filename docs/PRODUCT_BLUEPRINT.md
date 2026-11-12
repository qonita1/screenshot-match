# Product Blueprint

## Source and status
This is a summary of the supplied MASTER BUILD PROMPT, not Blueprint v0.1.
The full **BLUEPRINT — YOUTH FOOTBALL ECOSYSTEM PLATFORM v0.1** was not uploaded
and still needs to be added and reconciled with this summary.
The supplied actual architecture supersedes the brief's suggested stack and folders.
This document describes product intent, not verified implementation completion.

## Vision
**The player owns the journey.**
Positioning: The Digital Infrastructure for Grassroots Football.
Tagline: One Identity. One Journey. One Football Ecosystem.
Primary market: Indonesia. Primary UI language: Bahasa Indonesia.

## Product layers
- Football Identity: persistent Football ID, profile, journey, guardian relationships.
- Football OS: SSB operations, teams, training, attendance, development, invoices.
- Football Competition: registration, rosters, schedules, results, standings.
Organizations connect through relationships; they never own a player's identity.
A change of organization must not create a new Football ID.

## MVP priority
| Role | Primary outcome | Boundary |
| --- | --- | --- |
| Player | View football passport and journey | Not an organization membership ID |
| Parent | Manage children, schedule, invoices, consent | Guardian verification not connected |
| SSB | Manage players, teams, training, finance | Scoped organization relationships |
| Tournament | Coordinate teams, schedule, standings | No invented competition rules |

Coach and scout have future-ready dashboards. Referee, academy, association,
and federation are future roles, not enabled production capabilities.

## Experience principles
Parents need clarity and trust; administrators need efficient, structured workflows.
Use responsive role-specific dashboards rather than one dashboard for every role.
Provide loading, empty, error, success, and validation states.
Use realistic shared Indonesian sample data rather than inconsistent page fixtures.

## Privacy invariants
Football ID belongs to the player. Guardian consent controls minors' sensitive sharing.
Sensitive permissions default OFF. Scouting is consent-gated and field-minimized.
No medical data appears in ordinary dashboards. UI restrictions are not security.

## Foundation scope and exclusions
Build a UI-first interactive prototype with a reusable shell, design system,
role navigation, mock services, and replaceable AI boundary.
Do not imply real payments, OTP delivery, production auth, or a live AI model.
Real auth is planned through Lovable Cloud / Supabase-compatible auth plus
server-side authorization and row-level security; it is not connected yet.

## Delivery sequence
1. Design system and shell; landing and auth UI.
2. Role navigation and onboarding; player and parent journeys.
3. SSB and tournament dashboards; shared interactive components.
4. Copilot panel, agent contracts, portability documentation.
5. Responsive QA, regression checks, and handoff.
Stop progression when critical issues remain unresolved.

## Acceptance and open decisions
Use the evidence checklist in `DEVELOPMENT_GUIDE.md`; documentation alone is not completion.
Record unresolved payment, consent, age, competition, OTP, and guardian policy in
`ASSUMPTIONS.md`. Do not convert reversible demo values into permanent business rules.
