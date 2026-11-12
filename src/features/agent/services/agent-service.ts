/**
 * Agent service — the only path from UI to an AI provider.
 * Enforces role permissions and strips context keys an agent is not allowed to see.
 * These checks mirror (and never replace) backend authorization.
 */
import type { AIProvider, AgentContextKey, AgentId, AgentRequest, AgentResponse } from "@/shared/contracts/agent.contract";
import type { RoleId } from "@/shared/types/domain";
import { AGENTS } from "../configuration/agents";
import { MockAIProvider } from "../adapters/mock-provider";

export function canUseAgent(agentId: AgentId, role: RoleId): boolean {
  return AGENTS[agentId].allowedRoles.includes(role);
}

export function filterContext(agentId: AgentId, context: AgentRequest["context"] = {}): AgentRequest["context"] {
  const allowed = new Set<AgentContextKey>(AGENTS[agentId].contextKeys);
  return Object.fromEntries(Object.entries(context).filter(([key]) => allowed.has(key as AgentContextKey)));
}

export function createAgentService(provider: AIProvider) {
  return {
    provider,
    async send(role: RoleId, request: AgentRequest): Promise<AgentResponse> {
      if (!canUseAgent(request.agentId, role)) {
        return { success: false, message: "", error: "Asisten ini tidak tersedia untuk peran Anda." };
      }
      const message = request.message.trim();
      if (!message) return { success: false, message: "", error: "Pesan tidak boleh kosong." };
      try {
        return await provider.generateResponse({ ...request, message, context: filterContext(request.agentId, request.context) });
      } catch {
        return { success: false, message: "", error: "Asisten sedang tidak tersedia. Coba lagi nanti." };
      }
    },
  };
}

export const agentService = createAgentService(new MockAIProvider());
