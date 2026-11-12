# UI/UX Guidelines

## Experience priorities
Clarity for parents, efficiency for administrators, continuity for players.
Prefer coherent hierarchy and predictable actions to decorative sports graphics.
Write UI copy in Bahasa Indonesia; use familiar SSB terminology.
Do not expose internal enum keys as visible role labels.

## Shell and navigation
Desktop uses AppSidebar, AppTopbar, breadcrumbs, and contextual page actions.
Mobile uses a navigation drawer and restructured content, not a shrunken desktop.
Use PageHeader for page title, short explanation, and the main action.
RoleSwitcher changes the prototype experience; it grants no production permission.
Keep “Mode Prototipe” visible in mock auth contexts.
Mark future modules honestly: “Fitur ini sedang disiapkan”.
Do not use a success state to imply an unimplemented action was saved.

## Information hierarchy
Player: Football ID, organization relationship, schedule, development journey.
Parent: children, next activity, outstanding invoices, consent and verification status.
SSB: operational totals, upcoming sessions, players, attendance, finance.
Tournament: registration status, schedule, matches, standings.
Coach/scout: future-ready scope with honest availability and privacy boundaries.

## Forms
Use react-hook-form + Zod; associate labels, help text, and inline errors.
Explain required information before submission; preserve input after recoverable failure.
Example validation: “Nama pemain wajib diisi”.
Avoid asking for sensitive information that the workflow does not require.
Confirm destructive or consequential actions; state whether changes are simulated.
Never claim OTP delivery or relationship verification when only mock behavior exists.

## Data presentation
Use DataTable for reusable search and pagination; reset or reconcile pages after filtering.
On small screens use cards or intentional contained table scrolling without page overflow.
Give charts readable labels and text alternatives; do not rely on color alone.
Use JetBrains Mono for IDs/numeric data without making long IDs overflow.
Localize Indonesian dates, amounts, and statuses consistently; amounts are demo data.

## Required states
- Loading: stable skeleton/layout, clear busy state, avoid repeated announcements.
- Empty: explain context and a useful next step, e.g. “Belum ada jadwal latihan”.
- Error: explain recovery, e.g. “Data belum dapat dimuat. Coba lagi”.
- Success: only confirm what actually happened; label simulated persistence.
- Denied: explain permission limits without leaking protected entity details.

## Consent and safety
Sensitive permissions default OFF; explain each proposed purpose in plain language.
Separate consent from relationship verification and organization membership.
Example: “Izinkan profil non-sensitif ditampilkan kepada pencari bakat”.
Provide revocation and permission history UX; production persistence/audit is future work.
No medical data, private contacts, or unconsented minors in scout results.

## Copilot and accessibility
Label the assistant mock; show pending, failure, retry, and conversation states.
Make the panel keyboard reachable, dismissible, and usable on mobile keyboards.
Do not render model output as trusted HTML or authoritative policy.
Check heading order, names, contrast, tab order, focus restoration, and 200% zoom.
Validate desktop, tablet, and mobile; report checks performed, not assumed compliance.
