import { CalendarDays } from "lucide-react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import type { TrainingSession } from "@/shared/types/domain";
import { formatDay } from "@/shared/utils/format";

const STATUS = {
  scheduled: { tone: "info", label: "Terjadwal" },
  completed: { tone: "success", label: "Selesai" },
  cancelled: { tone: "danger", label: "Dibatalkan" },
} as const;

export function SessionRow({ session, title }: { session: TrainingSession; title?: string }) {
  const s = STATUS[session.status];
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-primary">
        <CalendarDays className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{title ?? session.focus}</p>
        <p className="truncate text-xs text-muted-foreground">
          {formatDay(session.date)} · {session.startTime}–{session.endTime} · {session.venue}
        </p>
      </div>
      <StatusBadge tone={s.tone}>{s.label}</StatusBadge>
    </div>
  );
}
