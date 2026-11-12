import { useCallback, useState } from "react";

import type { AgentId, AgentRequest } from "@/shared/contracts/agent.contract";
import type { RoleId } from "@/shared/types/domain";
import { agentService } from "../services/agent-service";
import type { ChatMessage } from "../types";

export function useCopilot(role: RoleId, context: AgentRequest["context"]) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);

  const send = useCallback(
    async (agentId: AgentId, text: string) => {
      if (!text.trim() || pending) return;
      const id = crypto.randomUUID();
      setMessages((m) => [...m, { id, author: "user", agentId, text }]);
      setPending(true);
      const res = await agentService.send(role, { agentId, message: text, context });
      setMessages((m) => [
        ...m,
        {
          id: `${id}-r`,
          author: "agent",
          agentId,
          text: res.success ? res.message : (res.error ?? "Terjadi kesalahan."),
          error: !res.success,
        },
      ]);
      setPending(false);
    },
    [role, context, pending],
  );

  return { messages, pending, send, clear: () => setMessages([]), isLive: agentService.provider.isLive };
}
