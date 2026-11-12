import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Player } from "@/shared/types/domain";
import { initials } from "@/shared/utils/format";

/** Compact player row: avatar placeholder, name, Football ID. */
export function PlayerIdentity({ player, subtitle }: { player: Pick<Player, "fullName" | "footballId">; subtitle?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="size-9">
        <AvatarFallback className="bg-accent text-xs font-bold text-primary">{initials(player.fullName)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{player.fullName}</p>
        <p className="truncate font-tabular text-xs text-muted-foreground">{subtitle ?? player.footballId.value}</p>
      </div>
    </div>
  );
}
