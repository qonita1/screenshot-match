import { Building2, Copy, Info, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FootballIdCard } from "@/components/identity/FootballIdCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import type { PlayerPassport } from "@/shared/contracts/api.contract";
import { formatDate } from "@/shared/utils/format";

export function FootballIdView({ passport }: { passport: PlayerPassport }) {
  const { player, organization, team, relationships } = passport;
  const copy = async () => {
    await navigator.clipboard?.writeText(player.footballId.value).catch(() => undefined);
    toast.success("Football ID disalin");
  };
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Identitas permanen"
        title="Football ID"
        description="Football ID adalah milik pemain. Organisasi hanya terhubung melalui relasi yang bisa dimulai dan diakhiri."
        actions={<Button variant="outline" onClick={copy}><Copy /> Salin ID</Button>}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <FootballIdCard player={player} organizationName={organization?.name} teamName={team?.name} />
        <SectionCard title="Kepemilikan & privasi">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <ShieldCheck className="size-5 shrink-0 text-pitch" aria-hidden />
              <p><span className="font-semibold">Milik pemain.</span> <span className="text-muted-foreground">ID ini tidak berubah saat pindah SSB dan tidak bisa diambil alih organisasi.</span></p>
            </li>
            <li className="flex gap-3">
              <Building2 className="size-5 shrink-0 text-pitch" aria-hidden />
              <p><span className="font-semibold">Relasi organisasi.</span> <span className="text-muted-foreground">SSB, klub, dan turnamen melihat data sesuai relasi aktif dan izin wali.</span></p>
            </li>
            <li className="flex gap-3">
              <Info className="size-5 shrink-0 text-pitch" aria-hidden />
              <p><span className="font-semibold">Data sensitif tidak ditampilkan.</span> <span className="text-muted-foreground">Tanggal lahir lengkap, dokumen, dan data kesehatan tidak tampil di kartu ini.</span></p>
            </li>
          </ul>
        </SectionCard>
      </div>
      <SectionCard title="Riwayat relasi organisasi" contentClassName="py-1">
        <ol className="divide-y">
          {[...relationships].reverse().map((r) => (
            <li key={r.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">{r.organizationName}</p>
                <p className="text-xs text-muted-foreground">{r.teamName} · {formatDate(r.startDate)} – {r.endDate ? formatDate(r.endDate) : "sekarang"}</p>
              </div>
              <StatusBadge tone={r.status === "active" ? "success" : "neutral"}>{r.status === "active" ? "Aktif" : "Berakhir"}</StatusBadge>
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
