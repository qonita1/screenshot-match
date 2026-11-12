import { BadgeCheck, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { FOOT_LABEL, POSITION_LABEL } from "@/shared/constants/labels";
import type { Player } from "@/shared/types/domain";
import { formatDate, initials } from "@/shared/utils/format";

interface FootballIdCardProps {
  player: Player;
  organizationName?: string;
  teamName?: string;
  className?: string;
}

/** The player's persistent football passport — owned by the player, not the SSB. */
export function FootballIdCard({ player, organizationName, teamName, className }: FootballIdCardProps) {
  const verified = player.footballId.status === "active";
  return (
    <article
      aria-label={`Football ID ${player.fullName}`}
      className={cn("relative overflow-hidden rounded-xl bg-identity p-5 text-primary-foreground shadow-raised sm:p-6", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-pitch-lines" aria-hidden />
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-primary-foreground/10" aria-hidden />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-lime">Football ID · Indonesia</p>
          <p className="mt-1 text-xs text-primary-foreground/60">Identitas permanen pemain</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            verified ? "bg-lime text-lime-foreground" : "bg-warning-soft text-warning-text",
          )}
        >
          {verified ? <BadgeCheck className="size-3.5" /> : <Clock className="size-3.5" />}
          {verified ? "Terverifikasi" : "Menunggu verifikasi"}
        </span>
      </div>

      <div className="relative mt-6 flex items-center gap-4">
        <div
          className="grid size-16 shrink-0 place-items-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 text-xl font-bold"
          aria-label="Foto profil (placeholder)"
        >
          {initials(player.fullName)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xl font-bold tracking-tight">{player.fullName}</p>
          <p className="text-sm text-primary-foreground/70">
            {player.city}, {player.province}
          </p>
        </div>
      </div>

      <p className="relative mt-6 font-tabular text-lg font-semibold tracking-wider text-lime sm:text-xl">
        {player.footballId.value}
      </p>

      <dl className="relative mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-primary-foreground/15 pt-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-[11px] text-primary-foreground/55">Tahun lahir</dt>
          <dd className="font-semibold">{player.birthYear}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-primary-foreground/55">Posisi</dt>
          <dd className="font-semibold">{POSITION_LABEL[player.position]}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-primary-foreground/55">Kaki dominan</dt>
          <dd className="font-semibold">{FOOT_LABEL[player.preferredFoot]}</dd>
        </div>
        <div>
          <dt className="text-[11px] text-primary-foreground/55">Terbit</dt>
          <dd className="font-semibold">{formatDate(player.footballId.issuedAt)}</dd>
        </div>
      </dl>
      {(organizationName || teamName) && (
        <p className="relative mt-4 text-xs text-primary-foreground/70">
          Terhubung dengan <span className="font-semibold text-primary-foreground">{organizationName}</span>
          {teamName && ` · ${teamName}`}
        </p>
      )}
    </article>
  );
}
