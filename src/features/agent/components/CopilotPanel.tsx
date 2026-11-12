import { Bot, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AgentId } from "@/shared/contracts/agent.contract";
import type { RoleId } from "@/shared/types/domain";
import { AGENTS, DEFAULT_AGENT_BY_ROLE, agentsForRole } from "../configuration/agents";
import { useCopilot } from "../hooks/useCopilot";

interface CopilotPanelProps {
  role: RoleId;
  pathname: string;
}

export function CopilotPanel({ role, pathname }: CopilotPanelProps) {
  const available = agentsForRole(role);
  const [agentId, setAgentId] = useState<AgentId>(DEFAULT_AGENT_BY_ROLE[role]);
  const [draft, setDraft] = useState("");
  const context = useMemo(() => ({ role, currentPage: pathname }), [role, pathname]);
  const { messages, pending, send, clear, isLive } = useCopilot(role, context);
  const endRef = useRef<HTMLDivElement>(null);
  const agent = AGENTS[agentId];

  useEffect(() => setAgentId(DEFAULT_AGENT_BY_ROLE[role]), [role]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, pending]);

  const submit = (text: string) => {
    void send(agentId, text);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 border-b px-4 pb-4 pt-1">
        <div className="flex items-center gap-2">
          {!isLive && <Badge variant="warning">Asisten contoh · belum terhubung ke AI</Badge>}
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={clear}>
              <RotateCcw /> Mulai ulang
            </Button>
          )}
        </div>
        <Select value={agentId} onValueChange={(v) => setAgentId(v as AgentId)}>
          <SelectTrigger aria-label="Pilih asisten">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {available.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-accent p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="size-4" aria-hidden /> {agent.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{agent.description}</p>
            </div>
            <div>
              <p className="eyebrow mb-2 text-muted-foreground">Coba tanyakan</p>
              <div className="flex flex-col gap-2">
                {agent.suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => submit(q)}
                    className="rounded-md border bg-card px-3 py-2 text-left text-sm text-foreground hover:border-pitch hover:bg-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {messages.map((m) =>
          m.author === "user" ? (
            <div key={m.id} className="ml-8 rounded-lg rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
              {m.text}
            </div>
          ) : (
            <div key={m.id} className="mr-6 flex gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lime text-lime-foreground">
                <Bot className="size-4" aria-hidden />
              </span>
              <div
                className={`rounded-lg rounded-tl-sm px-3 py-2 text-sm ${
                  m.error ? "bg-destructive-soft text-destructive-text" : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ),
        )}
        {pending && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden /> Asisten sedang menyiapkan jawaban…
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit(draft);
        }}
      >
        <div className="flex items-end gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(draft);
              }
            }}
            rows={1}
            placeholder="Tulis pertanyaan…"
            aria-label="Pesan untuk asisten"
            className="max-h-32 min-h-10 resize-none"
          />
          <Button type="submit" size="icon" disabled={!draft.trim() || pending} aria-label="Kirim">
            <Send />
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Asisten tidak dapat melihat data di luar izin akses Anda.
        </p>
      </form>
    </div>
  );
}
