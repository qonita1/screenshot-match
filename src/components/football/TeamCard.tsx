import { CalendarDays, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import type { Coach, Team } from "@/shared/types/domain";

export function TeamCard({ team, coaches, playerCount, children }: { team: Team; coaches: Coach[]; playerCount: number; children?: ReactNode }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-pitch">{team.ageCategory}</p>
          <h3 className="mt-0.5 text-base font-bold text-foreground">{team.name}</h3>
        </div>
        <span className="grid size-10 place-items-center rounded-md bg-lime font-tabular text-sm font-bold text-lime-foreground">
          {team.ageCategory}
        </span>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="size-4" aria-hidden />
          <dd><span className="font-semibold text-foreground">{playerCount}</span> pemain</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <UserRound className="size-4" aria-hidden />
          <dd className="truncate">{coaches.map((c) => c.name).join(", ") || "Belum ada pelatih"}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="size-4" aria-hidden />
          <dd>{team.trainingDays}</dd>
        </div>
      </dl>
      {children}
    </Card>
  );
}
