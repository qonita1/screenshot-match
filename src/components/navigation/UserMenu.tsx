import { Link } from "@tanstack/react-router";
import { LogOut, Repeat, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RoleId } from "@/shared/types/domain";

const PROTOTYPE_USER: Record<RoleId, { name: string; detail: string; initials: string }> = {
  player: { name: "Rizky Pratama", detail: "IDN-FB-2016-000123", initials: "RP" },
  parent: { name: "Siti Rahmawati", detail: "Wali · 2 anak", initials: "SR" },
  ssb: { name: "Admin Makassar United", detail: "SSB Makassar United", initials: "MU" },
  tournament: { name: "Panitia MYC 2027", detail: "Makassar Youth Cup 2027", initials: "MY" },
  coach: { name: "Coach Andi Rahmat", detail: "Lisensi D PSSI", initials: "AR" },
  scout: { name: "Bima Saputra", detail: "Scout (pratinjau)", initials: "BS" },
};

export function UserMenu({ role }: { role: RoleId }) {
  const user = PROTOTYPE_USER[role];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full" aria-label="Menu akun">
        <Avatar className="size-8">
          <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">{user.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="font-tabular text-xs font-normal text-muted-foreground">{user.detail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <UserRound /> Profil akun (segera)
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/select-role">
            <Repeat /> Pilih peran lain
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/login">
            <LogOut /> Keluar
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
