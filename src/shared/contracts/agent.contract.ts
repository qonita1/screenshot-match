/**
 * Vendor-neutral AI agent contract. UI talks to agents only through these types.
 * Providers (mock today, real later behind a server function) implement AIProvider.
 * Changing this file affects every agent, provider and the Copilot UI.
 */
import type { RoleId } from "@/shared/types/domain";

export type AgentId =
  | "parent-assistant"
  | "player-development-assistant"
  | "ssb-management-assistant"
  | "coach-assistant"
  | "tournament-assistant"
  | "scout-assistant"
  | "platform-support-assistant";

/** Context keys an agent may receive. Anything else is stripped before reaching a provider. */
export type AgentContextKey = "role" | "currentPage" | "organizationName" | "tournamentName" | "childCount";

export interface AgentRequest {
  agentId: AgentId;
  message: string;
  context?: Partial<Record<AgentContextKey, string | number>>;
}

export interface AgentResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
}

export interface AIProvider {
  readonly id: string;
  /** True only for real model connections. The mock provider must return false. */
  readonly isLive: boolean;
  generateResponse(request: AgentRequest): Promise<AgentResponse>;
}

export interface AgentDefinition {
  id: AgentId;
  name: string;
  description: string;
  capabilities: string[];
  /** Roles allowed to use this agent. Backend must enforce the same rule. */
  allowedRoles: RoleId[];
  /** Context keys this agent is allowed to receive. */
  contextKeys: AgentContextKey[];
  suggestedQuestions: string[];
  inputContract: string;
  outputContract: string;
}
