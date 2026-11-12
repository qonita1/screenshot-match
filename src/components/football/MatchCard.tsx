import { MapPin } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { MATCH_STATUS_LABEL } from "@/shared/constants/labels";
import type { Match } from "@/shared/types/domain";
import { formatDay } from "@/shared/utils/format";

export function MatchCard({ match, highlightTeam }: { match: Match; highlightTeam?: string }) {
  const done = match.status === "completed";
  const row = (team: string, score?: number) => (
    <div className="flex items-center justify-between gap-3">
      <span className={`truncate text-sm ${team.startsWith(highlightTeam ?? "~") ? "font-bold text-foreground" : "text-foreground"}`}>{team}</span>
      <span className="font-tabular text-base font-semibold text-foreground">{done ? score : "–"}</span>
    </div>
  );
  return (
    <div className="rounded-lg border bg-card p-3.5">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          {match.category} · {match.stage}
        </p>
        <StatusBadge tone={done ? "neutral" : match.status === "live" ? "danger" : "info"}>{MATCH_STATUS_LABEL[match.status]}</StatusBadge>
      </div>
      <div className="space-y-1.5">
        {row(match.homeTeam, match.homeScore)}
        {row(match.awayTeam, match.awayScore)}
      </div>
      <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="size-3.5" aria-hidden />
        {formatDay(match.date)} · {match.time} · {match.venue}
      </p>
    </div>
  );
}
