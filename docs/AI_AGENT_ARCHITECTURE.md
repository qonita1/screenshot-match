# AI Agent Architecture

## Status and product surface
Football Ecosystem Copilot is a floating assistant, currently backed by MockAIProvider.
Label it clearly, for example “Asisten simulasi — belum terhubung ke AI”.
A generated-looking demo answer must never imply a live model or authoritative decision.

## Boundary and files
- `src/features/agent/components/`: CopilotLauncher and CopilotPanel.
- `hooks/useCopilot.ts`: conversation interaction and pending/error state.
- `configuration/agents.ts`: seven independent agent definitions.
- `services/agent-service.ts`: permission/context filtering and provider dispatch.
- `adapters/mock-provider.ts`: clearly labeled MockAIProvider.
- `types/`: agent-local supporting types.
- `src/shared/contracts/agent.contract.ts`: AgentRequest, AgentResponse,
  AIProvider, AgentDefinition; the canonical replaceable boundary.

UI → hook → agent-service → provider → typed response → UI.
Do not put AI business logic, provider calls, secrets, or database tools into components.

## Agent registry
| Agent | Intended assistance | Context boundary |
| --- | --- | --- |
| Parent Assistant | Explain schedule and reports | Verified linked child only |
| Player Development Assistant | Explain development journey | Authorized player records |
| SSB Management Assistant | Explain organization operations | Related organization only |
| Coach Assistant | Draft training guidance | Assigned team, no sensitive medical context |
| Tournament Assistant | Organize operational information | Organizer's authorized event |
| Scout Assistant | Explain permitted discovery | Consented, non-sensitive player fields |
| Platform Support Assistant | Explain features and navigation | Public/help context by default |

Each definition needs a unique stable ID, name, description, supported capabilities,
input/output contract, permission requirements, and context requirements.
Use registry IDs from code; do not invent alternate IDs in clients or prompts.
Instructions, provider configuration, tools, and permission rules stay separate from presentation.

## Authorization and context pipeline
1. Resolve a known agent and validate request shape; reject unknown IDs/capabilities.
2. Resolve trusted identity and scope, not the browser's role or arbitrary context.
3. Check requested capability and relationships; default deny.
4. Apply guardian consent, including explicit scouting consent for minors.
5. Build an allowlisted minimal context; omit medical data and private identifiers.
6. Dispatch only authorized context; treat user text and retrieved content as untrusted data.
7. Validate/normalize the response and render it safely; do not execute returned instructions.
The prototype can demonstrate these rules but is not production authorization.

## Real provider integration: planned
Use TanStack Start `createServerFn` for the real request boundary.
Permission/context checks must execute server-side before provider dispatch.
Lovable AI Gateway is the planned default; root AGENTS.md governs gateway usage.
Keep AIProvider replaceable, but changing the deployed gateway requires explicit review.
Store keys through managed secrets; never in browser bundles or committed configuration.
Do not connect a provider before credentials, endpoint, security, and retention are configured.
Cloudflare Workers integration must avoid Node-only SDKs/APIs; prefer compatible transports.

## Safety and resilience
No unrestricted database access, autonomous writes, payments, or consent modification.
Do not log full prompts/children's records; define retention and redaction before production.
Handle denied, failed, timeout, empty, and retried requests without leaking hidden context.
Clear or isolate conversation state when role, organization, or child context changes.
Test permission filtering before asserting provider behavior; mock the provider in tests.
