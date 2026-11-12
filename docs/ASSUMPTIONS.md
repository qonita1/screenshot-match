# Assumptions and Missing Requirements

> **Asumsi prototipe, perlu konfirmasi**
> Every item below is provisional. Demo values and UI choices are not approved policy.

## How to resolve
Keep reversible examples in mock data, label simulated actions, and avoid production rules.
Record a product/security decision and update contracts/tests/docs before enforcing policy.
The full Blueprint v0.1 is missing; add it and reconcile requirements before finalizing scope.

## Payments
**Asumsi prototipe, perlu konfirmasi**
Invoice amounts, currency policy, billing cadence, due dates, penalties, discounts,
refunds, tax treatment, payment provider, reconciliation, and settlement are unspecified.
Display example invoices as demo data; never claim real collection or successful settlement.
Confirm which roles may view, issue, cancel, and reconcile organization/event invoices.

## Consent categories
**Asumsi prototipe, perlu konfirmasi**
Scouting consent is explicitly required; a complete purpose/category taxonomy is absent.
Other potential sharing controls are provisional, not approved legal consent wording.
Confirm purposes, field allowlists, expiry, retention, audit, revocation, and re-grant behavior.
Non-negotiable baseline: sensitive permissions default OFF; no medical dashboard data.

## Age categories U8 / U10 / U12
**Asumsi prototipe, perlu konfirmasi**
U10 is sample team data; U8/U10/U12 are not a finalized eligibility policy.
Confirm birth-year cutoffs, season/reference date, age exceptions, evidence, and roster locking.
Do not infer age eligibility from the sample ID, tournament year, or category label.

## Tournament format
**Asumsi prototipe, perlu konfirmasi**
Group/knockout visuals do not establish an approved competition format.
Confirm scoring, tie-breakers, group sizes, progression, draws, scheduling conflicts,
forfeits, referee authority, roster validation, and result correction rules.
Keep standings/brackets explicitly demo/configured; do not invent ranking algorithms.

## OTP via phone / email
**Asumsi prototipe, perlu konfirmasi**
The verification interface does not settle phone versus email delivery.
Confirm channel, identity uniqueness, expiry, retry/resend limits, abuse prevention,
recovery fallback, deliverability, and handling of minors' accounts.
Do not claim a code was delivered by a connected provider in the mock flow.

## Guardian relationship verification
**Asumsi prototipe, perlu konfirmasi**
Confirm who requests and approves relationships, required evidence, dispute handling,
multiple guardians, restricted authority, revocation, and age-of-majority transitions.
A self-selected parent role or organization affiliation does not verify a guardian.
Do not grant real consent authority based on a mock relationship status.

## Additional integration gaps
Football ID issuance/uniqueness, retention/deletion, supported timezones, real auth setup,
AI credentials/context retention, and final operational CRUD permissions need decisions.
Sample Rizky Pratama / IDN-FB-2016-000123 and Makassar Youth Cup 2027 are fictional
prototype context, not proof of issuance policy, current eligibility, or a real event.
Keep unresolved items visible in handoff notes; never silently promote them to policy.
