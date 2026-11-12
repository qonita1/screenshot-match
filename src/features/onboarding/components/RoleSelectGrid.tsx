import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Eye, HeartHandshake, Trophy, UserRound, Users, type LucideIcon } from "lucide-react";

import { FUTURE_ROLES, ROLES, ROLE_ORDER } from "@/shared/constants/roles";
import type { RoleId } from "@/shared/types/domain";

const ICONS: Record<RoleId, LucideIcon> = {
  player: UserRound,
  parent: HeartHandshake,
  ssb: Building2,
  tournament: Trophy,
  coach: Users,
  scout: Eye,
};

export function RoleSelectGrid() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {ROLE_ORDER.map((id) => {
          const role = ROLES[id];
          const Icon = ICONS[id];
          return (
            <Link
              key={id}
              to="/onboarding"
              search={{ role: id }}
              className="group flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:border-pitch hover:bg-accent focus-visible:border-pitch"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-accent text-primary group-hover:bg-lime group-hover:text-lime-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                  {role.label}
                  {!role.mvp && <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">Pratinjau</span>}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{role.description}</span>
              </span>
              <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Segera hadir: {Object.values(FUTURE_ROLES).join(", ")}.
      </p>
    </div>
  );
}
