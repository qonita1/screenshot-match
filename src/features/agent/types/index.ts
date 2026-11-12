import type { AgentId } from "@/shared/contracts/agent.contract";

export interface ChatMessage {
  id: string;
  author: "user" | "agent";
  agentId: AgentId;
  text: string;
  error?: boolean;
}
