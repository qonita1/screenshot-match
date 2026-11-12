import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES, ROLE_ORDER } from "@/shared/constants/roles";
import type { RoleId } from "@/shared/types/domain";

const HOME: Record<RoleId, "/app/player" | "/app/parent" | "/app/ssb" | "/app/tournament" | "/app/coach" | "/app/scout"> = {
  player: "/app/player",
  parent: "/app/parent",
  ssb: "/app/ssb",
  tournament: "/app/tournament",
  coach: "/app/coach",
  scout: "/app/scout",
};

/** Prototype-only switcher. In production the role comes from the authenticated account. */
export function RoleSwitcher({ role }: { role: RoleId }) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5" aria-label="Ganti peran prototipe">
          <span className="hidden text-muted-foreground sm:inline">Peran:</span>
          <span className="font-semibold">{ROLES[role].shortLabel}</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Lihat sebagai (mode prototipe)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLE_ORDER.map((id) => (
          <DropdownMenuItem key={id} onSelect={() => navigate({ to: HOME[id] })} className="flex items-start gap-2">
            <Check className={`mt-0.5 size-4 ${id === role ? "opacity-100" : "opacity-0"}`} />
            <span>
              <span className="block font-medium">
                {ROLES[id].label}
                {!ROLES[id].mvp && <span className="ml-1.5 text-xs text-muted-foreground">· pratinjau</span>}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { HOME as ROLE_HOME };
