---
applyTo: "src/features/agent/**,src/shared/contracts/agent.contract.ts"
---

# Agent development

## Read before changes
Read root `AGENTS.md` and `.github/copilot-instructions.md`.
Read docs: AI_AGENT_ARCHITECTURE.md, API_CONTRACTS.md, ROLE_PERMISSION_MATRIX.md.
Inspect current implementation before editing; the parallel build may be incomplete.

## Implementation rules
1. Use canonical AgentRequest, AgentResponse, AIProvider, and AgentDefinition.
2. Definitions live in configuration/agents.ts; preserve the seven-agent registry.
3. Each definition needs ID, name, description, capabilities, contracts, permissions, context.
4. Keep CopilotLauncher/CopilotPanel presentation separate from agent-service.
5. useCopilot manages interaction state, not provider secrets or authorization authority.
6. MockAIProvider in adapters/mock-provider.ts must be visibly labeled simulated.
7. Validate known agent and requested capability before provider dispatch.
8. Check permission and scope, then build minimal consent-filtered context.
9. Never trust browser role, entity IDs, or arbitrary supplied context.
10. No unrestricted database tools, autonomous writes, payments, or consent changes.
11. Exclude medical records and private child/guardian details from ordinary AI context.
12. Real provider calls run behind createServerFn with server-side checks.
13. Use managed secrets; planned default is Lovable AI Gateway under root rules.
14. Keep AIProvider replaceable and edge-compatible for Cloudflare Workers.
15. Test denial before dispatch, context minimization, retries, errors, and context switching.

## Workflow
1. Identify affected files, existing reusable patterns, and shared contracts.
2. State impact and missing requirements before architectural changes.
3. Implement the smallest appropriate change; preserve concurrent work.
4. Validate relevant business rules and interactions.
5. Update documentation and explicit assumptions.

## Boundaries
Do not replace libraries, remove working features, or bypass server authorization.
Do not modify managed migrations/generated files; follow root AGENTS.md.
Never present mock auth or mock AI as production integrations.
UI restrictions are not security controls.

## Handoff evidence
Report changed files and any contract/API impact.
List checks actually executed, failures, pending checks, and known limitations.
Do not claim responsive QA or production readiness without evidence.
Continue the existing application; do not create parallel implementations.
