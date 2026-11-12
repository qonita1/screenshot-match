# User Journeys

## Interpretation
Journeys describe intended experience, not production-connected workflows.
Mock auth and simulated actions must say “Mode Prototipe”.
Unknown policy is recorded in `ASSUMPTIONS.md`, not invented during UI work.
Use `ROLE_PERMISSION_MATRIX.md` for permission boundaries.

## Shared entry
Landing `/` → register `/register` → verify `/verify-otp` → select `/select-role`
→ complete `/onboarding` → role dashboard.
Login `/login`; recovery uses `/forgot-password` and `/account-recovery`.
OTP delivery channel, expiry, retry, and account recovery policies are unconfirmed.
Show validation and recoverable errors without implying real messages were sent.

## Player
1. Complete a demo profile after role selection.
2. Open `/app/player` and persistent `/app/player/football-id`.
3. Review organization/team relationships rather than surrendering identity ownership.
4. View training, matches, achievements, and development timeline.
5. Follow contextual actions only where implemented; label unavailable modules.
Outcome: the same Football ID follows the player across organizations.

## Parent / guardian
1. Enter `/app/parent` and select the relevant child context.
2. Start a guardian relationship flow; show pending verification honestly.
3. Review schedule, attendance, and development within the child's authorized scope.
4. Open `/app/parent/payments` to view demo invoices and history.
5. Open `/app/parent/consent` to review purpose-specific sharing controls.
6. Revoke consent through explicit feedback; do not imply backend enforcement is connected.
Outcome: understandable family oversight without automatic sensitive sharing.
Verification of guardian relationships remains an unresolved production requirement.

## SSB / club administrator
1. Complete organization onboarding and open `/app/ssb`.
2. Search `/app/ssb/players`; inspect `/app/ssb/players/$playerId`.
3. Review relationship history; assign players to teams where supported.
4. Manage `/app/ssb/teams` and plan `/app/ssb/training`.
5. Review `/app/ssb/finance` demo invoices and payment statuses.
6. Coaches, attendance, competitions, development, documents, and settings use
   `/app/ssb/$section` placeholders until their workflows are actually implemented.
Outcome: efficient organization operations without ownership of Football ID.

## Tournament organizer
1. Enter `/app/tournament` and review event status.
2. Review registrations through `/app/tournament/teams`.
3. Verify rosters conceptually; do not pretend eligibility checks are implemented.
4. Inspect `/app/tournament/schedule` and `/app/tournament/standings`.
5. Label other `/app/tournament/$section` operations as future work where appropriate.
Outcome: coherent event operations with no unapproved format or tie-break rules.

## Coach, scout, and Copilot
Coach `/app/coach`: future-ready team, training, assessment, and report experience.
Scout `/app/scout`: discover only consented players and non-sensitive fields.
Copilot: open launcher → see mock label → choose suggestion or ask → pending → reply/error.
Denied assistant requests must not reveal hidden records through messages or context.

## Cross-journey checks
Test back/forward navigation, direct detail URLs, role switching, invalid IDs, and denied scope.
Confirm empty, loading, failed save, invalid form, mobile, keyboard, and recovery behavior.
Do not treat a successful route transition as successful authorization or persistence.
