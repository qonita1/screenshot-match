import { Link } from "@tanstack/react-router";
import { Award, CalendarDays, ClipboardCheck, FileBadge, Flag, IdCard, Medal, Sparkles, Star, Trophy, Users } from "lucide-react";

import { AttendanceChart } from "@/components/charts/AttendanceChart";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { MatchCard } from "@/components/football/MatchCard";
import { SessionRow } from "@/components/football/SessionRow";
import { FootballIdCard } from "@/components/identity/FootballIdCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PlayerPassport } from "@/shared/contracts/api.contract";
import type { JourneyKind } from "@/shared/types/domain";
import { formatDate } from "@/shared/utils/format";

const JOURNEY_ICON: Record<JourneyKind, typeof Flag> = {
  identity: IdCard,
  organization: Users,
  competition: Trophy,
  achievement: Medal,
  development: Sparkles,
};

export function PlayerDashboard({ passport }: { passport: PlayerPassport }) {
  const { player, organization, team, journey, matches, achievements, certificates, development, upcomingTraining, attendanceTrend } = passport;
  const firstName = player.fullName.split(" ")[0];
  const latestAttendance = attendanceTrend.at(-1)?.rate ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Paspor sepak bola"
        title={`Halo, ${firstName}!`}
        description="Semua perjalanan sepak bolamu tersimpan di sini — milikmu, di SSB mana pun kamu bermain."
        actions={
          <Button asChild variant="outline">
            <Link to="/app/player/football-id"><IdCard /> Lihat Football ID</Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <FootballIdCard player={player} organizationName={organization?.name} teamName={team?.ageCategory} />
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Laga dicatat" value={matches.length} icon={Flag} hint="Musim 2026/27" />
          <StatCard label="Prestasi" value={achievements.length} icon={Award} hint="Sejak 2022" />
          <StatCard label="Kehadiran" value={`${latestAttendance}%`} icon={ClipboardCheck} hint="Bulan ini" />
          <StatCard label="Tim saat ini" value={team?.ageCategory ?? "—"} icon={Users} hint={organization?.name} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Jadwal latihan" description={team?.name} className="lg:col-span-1" contentClassName="py-1">
          {upcomingTraining.length ? (
            <div className="divide-y">
              {upcomingTraining.map((s) => <SessionRow key={s.id} session={s} />)}
            </div>
          ) : (
            <EmptyState icon={CalendarDays} title="Belum ada jadwal" description="Jadwal dari SSB akan tampil di sini." />
          )}
        </SectionCard>

        <div className="lg:col-span-2">
          <Tabs defaultValue="journey">
            <TabsList className="w-full justify-start overflow-x-auto scrollbar-none">
              <TabsTrigger value="journey">Perjalanan</TabsTrigger>
              <TabsTrigger value="matches">Laga</TabsTrigger>
              <TabsTrigger value="achievements">Prestasi</TabsTrigger>
              <TabsTrigger value="development">Perkembangan</TabsTrigger>
            </TabsList>
            <TabsContent value="journey">
              <SectionCard title="Perjalanan sepak bola" description="Tercatat di Football ID sejak 2022">
                <ActivityTimeline
                  items={[...journey].reverse().map((j, i) => ({
                    id: j.id,
                    title: j.title,
                    description: j.description,
                    date: j.date,
                    icon: JOURNEY_ICON[j.kind],
                    highlight: i === 0,
                  }))}
                />
              </SectionCard>
            </TabsContent>
            <TabsContent value="matches">
              <SectionCard title="Riwayat laga">
                {matches.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {matches.map((m) => <MatchCard key={m.id} match={m} highlightTeam={team?.name} />)}
                  </div>
                ) : (
                  <EmptyState icon={Flag} title="Belum ada laga" description="Laga dari turnamen yang kamu ikuti akan tercatat otomatis." />
                )}
              </SectionCard>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-4">
              <SectionCard title="Prestasi">
                <ul className="grid gap-3 sm:grid-cols-3">
                  {achievements.map((a) => (
                    <li key={a.id} className="rounded-lg border p-4">
                      {a.kind === "trophy" ? <Trophy className="size-5 text-pitch" /> : a.kind === "award" ? <Star className="size-5 text-pitch" /> : <Medal className="size-5 text-pitch" />}
                      <p className="mt-3 text-sm font-bold text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.event}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDate(a.date)}</p>
                    </li>
                  ))}
                </ul>
              </SectionCard>
              <SectionCard title="Sertifikat" contentClassName="py-1">
                <ul className="divide-y">
                  {certificates.map((c) => (
                    <li key={c.id} className="flex items-center gap-3 py-3">
                      <FileBadge className="size-5 shrink-0 text-primary" aria-hidden />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.issuer} · {formatDate(c.issuedAt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </TabsContent>
            <TabsContent value="development" className="space-y-4">
              <SectionCard title="Tren kehadiran" description="Contoh data — metode penilaian resmi belum ditetapkan">
                <AttendanceChart data={attendanceTrend} />
              </SectionCard>
              <SectionCard title="Catatan pelatih" contentClassName="py-1">
                <ul className="divide-y">
                  {development.map((d) => (
                    <li key={d.id} className="py-3">
                      <p className="text-sm font-semibold">{d.title}</p>
                      <p className="text-sm text-muted-foreground">{d.note}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{d.coach} · {formatDate(d.date)}</p>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
