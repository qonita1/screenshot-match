import { Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarDays, ChevronRight, CreditCard, MessageSquare, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { MatchCard } from "@/components/football/MatchCard";
import { SessionRow } from "@/components/football/SessionRow";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { INVOICE_STATUS_LABEL, POSITION_LABEL } from "@/shared/constants/labels";
import type { ParentOverview } from "@/shared/contracts/api.contract";
import { formatCurrency, formatDate, initials } from "@/shared/utils/format";

const INVOICE_TONE = { paid: "success", unpaid: "warning", overdue: "danger" } as const;

export function ParentDashboard({ overview }: { overview: ParentOverview }) {
  const { guardian, children, upcomingTraining, upcomingMatches, invoices, development } = overview;
  const [activeId, setActiveId] = useState(children[0]?.player.id);
  const active = children.find((c) => c.player.id === activeId) ?? children[0];
  const due = invoices.filter((i) => i.status !== "paid");
  const childTraining = upcomingTraining.filter((s) => s.playerName === active?.player.fullName);
  const childNotes = development.filter((d) => d.playerId === active?.player.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Orang tua / wali"
        title={`Selamat datang, Ibu ${guardian.name.split(" ")[0]}`}
        description="Pantau kegiatan sepak bola anak dan kendalikan data yang dibagikan."
        actions={
          <StatusBadge tone={guardian.verification === "verified" ? "success" : "warning"}>
            <BadgeCheck className="size-3.5" /> Wali {guardian.verification === "verified" ? "terverifikasi" : "menunggu verifikasi"}
          </StatusBadge>
        }
      />

      <section aria-label="Anak saya">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Anak saya</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {children.map(({ player, teamName, organizationName, attendanceRate }) => {
            const selected = player.id === active?.player.id;
            return (
              <button
                key={player.id}
                type="button"
                onClick={() => setActiveId(player.id)}
                aria-pressed={selected}
                className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-colors ${selected ? "border-pitch bg-accent" : "bg-card hover:border-pitch/50"}`}
              >
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">{initials(player.fullName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{player.fullName}</p>
                  <p className="truncate text-xs text-muted-foreground">{teamName} · {organizationName}</p>
                  <p className="font-tabular text-xs text-muted-foreground">{player.footballId.value}</p>
                </div>
                <div className="w-20 text-right">
                  <p className="font-tabular text-lg font-semibold">{attendanceRate}%</p>
                  <Progress value={attendanceRate} className="mt-1 h-1.5" aria-label="Kehadiran" />
                  <p className="mt-1 text-[11px] text-muted-foreground">kehadiran</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {active && (
        <div className="grid gap-4 lg:grid-cols-3">
          <SectionCard title={`Ringkasan ${active.player.fullName.split(" ")[0]}`}>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-xs text-muted-foreground">Tahun lahir</dt><dd className="font-semibold">{active.player.birthYear}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Posisi</dt><dd className="font-semibold">{POSITION_LABEL[active.player.position]}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Tim</dt><dd className="font-semibold">{active.teamName}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Kehadiran</dt><dd className="font-semibold">{active.attendanceRate}%</dd></div>
            </dl>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <Link to="/app/parent/consent"><ShieldCheck /> Kelola izin data</Link>
            </Button>
          </SectionCard>
          <SectionCard title="Latihan mendatang" contentClassName="py-1" className="lg:col-span-2">
            {childTraining.length ? (
              <div className="divide-y">{childTraining.map((s) => <SessionRow key={s.id} session={s} title={`${s.teamName} · ${s.focus}`} />)}</div>
            ) : (
              <EmptyState icon={CalendarDays} title="Tidak ada latihan terjadwal" />
            )}
          </SectionCard>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Laga mendatang" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {upcomingMatches.slice(0, 4).map((m) => <MatchCard key={m.id} match={m} highlightTeam="Makassar United" />)}
          </div>
        </SectionCard>
        <SectionCard
          title="Status pembayaran"
          action={<Link to="/app/parent/payments" className="flex items-center text-xs font-semibold text-pitch">Semua <ChevronRight className="size-3.5" /></Link>}
          contentClassName="py-1"
        >
          {due.length ? (
            <ul className="divide-y">
              {due.map((inv) => (
                <li key={inv.id} className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{inv.playerName}</p>
                    <StatusBadge tone={INVOICE_TONE[inv.status]}>{INVOICE_STATUS_LABEL[inv.status]}</StatusBadge>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{inv.description}</p>
                  <p className="font-tabular text-sm font-semibold">{formatCurrency(inv.amount)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={CreditCard} title="Semua tagihan lunas" />
          )}
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Laporan perkembangan" description={active?.player.fullName} contentClassName="py-1">
          {childNotes.length ? (
            <ul className="divide-y">
              {childNotes.map((d) => (
                <li key={d.id} className="py-3">
                  <p className="text-sm font-semibold">{d.title}</p>
                  <p className="text-sm text-muted-foreground">{d.note}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.coach} · {formatDate(d.date)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={MessageSquare} title="Belum ada catatan" />
          )}
        </SectionCard>
        <SectionCard title="Komunikasi dengan SSB" description="SSB Makassar United">
          <ul className="space-y-3">
            <li className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-semibold">Pengumuman · Coach Andi</p>
              <p className="text-muted-foreground">Latihan Sabtu dimajukan ke 07.00 untuk persiapan laga grup. Mohon datang 15 menit lebih awal.</p>
            </li>
            <li className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-semibold">Admin SSB</p>
              <p className="text-muted-foreground">Jersey baru dapat diambil di sekretariat mulai 18 November.</p>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">Fitur balas pesan disiapkan untuk fase berikutnya.</p>
        </SectionCard>
      </div>
    </div>
  );
}
