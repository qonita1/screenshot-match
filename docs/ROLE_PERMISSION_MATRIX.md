# Role and Permission Matrix

## Status and interpretation
This matrix is a least-privilege design boundary, not proof of backend enforcement.
Prototype roles come from the URL/RoleSwitcher and are not trusted identities.
Real auth, authorization, and row-level security are not connected yet.
“Scoped” means verified role, relevant relationship, allowed purpose, and consent where needed.
Unspecified or sensitive permissions default OFF; unresolved policy needs confirmation.

## Role keys
Active prototype keys: `player`, `parent`, `ssb`, `tournament`, `coach`, `scout`.
Future only: `referee`, `academy`, `association`, `federation`.
Do not grant future roles permissions merely because they appear in product diagrams.

## Intended access boundaries
| Resource/action | player | parent | ssb | tournament | coach | scout |
| --- | --- | --- | --- | --- | --- | --- |
| Own Football ID | Own view | Linked child | Scoped roster view | Scoped roster minimum | Scoped team minimum | Consented minimum |
| Player profile | Own scope | Verified linked child | Related organization scope | Registered event scope | Assigned team scope | Consent-filtered fields |
| Guardian verification | No self-approval | Request/review status | No automatic approval | No | No | No |
| Guardian consent | No assumed grant for minor | Verified guardian scope | No grant on behalf | No grant on behalf | No grant on behalf | No grant on behalf |
| Teams/training | Relevant view | Child-relevant view | Own organization operations | Event-relevant view | Assigned scope, policy pending | No private access |
| Invoices/payments | No assumed access | Linked child scope | Organization finance scope | Event fee policy pending | No assumed access | No |
| Tournament operations | Participant view | Child-relevant view | Registered organization scope | Own event operations | Relevant view | Public/consented minimum |
| Medical data in dashboards | No | No | No | No | No | No |
| Unrestricted AI/database access | No | No | No | No | No | No |

This is not a finalized CRUD policy. Do not infer create/update/delete authority from
“view” or “operations”; confirm specific actions before production implementation.

## Consent gates
Guardian relationship and consent are separate facts; membership implies neither.
Scouting requires guardian scouting consent and a non-sensitive field allowlist.
A scout receives neither contact details, private documents, guardian records,
payment data, nor medical data through discovery or assistant context.
Purpose categories beyond scouting remain provisional; see `ASSUMPTIONS.md`.

## Enforcement points
1. Verify session server-side; never trust role or player ID submitted by the browser.
2. Resolve relationships and organization/event scope from trusted storage.
3. Check requested action and purpose, with default deny.
4. Apply consent and field minimization before response serialization or AI calls.
5. Enforce row-level security as defense in depth once the backend is connected.
6. Recheck on mutations; stale UI/cache access is not a permission grant.

## Revocation and testing
Production revocation must affect future requests and invalidate affected cached views.
Retention, audit history, propagation, and re-grant policy need product/security confirmation.
Test no-consent, explicit denial, wrong guardian, wrong organization, unknown role,
unknown agent, forged URL context, and revoked-consent paths.
Never replace server checks with hidden buttons or filtered navigation.
