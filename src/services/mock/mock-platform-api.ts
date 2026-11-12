/**
 * MOCK implementation of PlatformApi — prototype only. In-memory, resets on reload,
 * no real authentication, authorization, or payment processing.
 */
import type { PlatformApi } from "@/shared/contracts/api.contract";
import type { ConsentRecord, Player } from "@/shared/types/domain";
import { defaultConsents, toScoutProfiles } from "@/shared/utils/privacy";
import * as db from "./mock-data";

const LATENCY_MS = 120;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), LATENCY_MS));
}

const teamName = (teamId?: string) => db.teams.find((t) => t.id === teamId)?.name;
const isUpcoming = (date: string) => date >= "2026-11-12";

export const mockPlatformApi: PlatformApi = {
  async getPlayerPassport(playerId) {
    const player = db.players.find((p) => p.id === playerId);
    if (!player) throw new Error("Pemain tidak ditemukan");
    const matchIds = db.playerMatchIds[playerId] ?? [];
    return delay({
      player,
      organization: db.organizations.find((o) => o.id === player.currentOrganizationId),
      team: db.teams.find((t) => t.id === player.currentTeamId),
      relationships: db.relationships.filter((r) => r.playerId === playerId),
      journey: db.journey.filter((j) => j.playerId === playerId),
      matches: db.matches.filter((m) => matchIds.includes(m.id)),
      achievements: db.achievements.filter((a) => a.playerId === playerId),
      certificates: db.certificates.filter((c) => c.playerId === playerId),
      development: db.developmentNotes.filter((d) => d.playerId === playerId),
      upcomingTraining: db.trainingSessions.filter((s) => s.teamId === player.currentTeamId && isUpcoming(s.date) && s.status !== "cancelled"),
      attendanceTrend: db.attendanceTrend,
    });
  },

  async listPlayers(organizationId, { search = "", teamId, page = 1, pageSize = 8 }) {
    const q = search.trim().toLowerCase();
    const filtered = db.players
      .filter((p) => p.currentOrganizationId === organizationId)
      .filter((p) => !teamId || p.currentTeamId === teamId)
      .filter((p) => !q || p.fullName.toLowerCase().includes(q) || p.footballId.value.toLowerCase().includes(q))
      .map((p) => ({ ...p, teamName: teamName(p.currentTeamId) }));
    const start = (page - 1) * pageSize;
    return delay({ items: filtered.slice(start, start + pageSize), total: filtered.length, page, pageSize });
  },

  async registerPlayer(organizationId, input) {
    const index = db.players.length + 1;
    const player: Player = {
      id: `pl-${String(index).padStart(3, "0")}`,
      footballId: { value: `IDN-FB-${input.birthYear}-${String(900 + index).padStart(6, "0")}`, issuedAt: "2026-11-12", status: "pending_verification" },
      fullName: input.fullName,
      birthYear: input.birthYear,
      gender: input.gender,
      position: input.position,
      preferredFoot: input.preferredFoot,
      city: "Makassar",
      province: "Sulawesi Selatan",
      currentOrganizationId: organizationId,
      currentTeamId: input.teamId,
      guardianIds: [],
      identityVerified: false,
    };
    db.players.unshift(player);
    db.consents.push(...defaultConsents(player.id));
    return delay(player);
  },

  async getParentOverview(guardianId) {
    const guardian = db.guardians.find((g) => g.id === guardianId);
    if (!guardian) throw new Error("Wali tidak ditemukan");
    const kids = db.players.filter((p) => guardian.childIds.includes(p.id));
    const kidTeams = kids.map((k) => k.currentTeamId);
    return delay({
      guardian,
      children: kids.map((player, i) => ({
        player,
        teamName: teamName(player.currentTeamId),
        organizationName: db.organizations.find((o) => o.id === player.currentOrganizationId)?.name,
        attendanceRate: i === 0 ? 93 : 81,
      })),
      upcomingTraining: db.trainingSessions
        .filter((s) => kidTeams.includes(s.teamId) && isUpcoming(s.date) && s.status === "scheduled")
        .map((s) => {
          const kid = kids.find((k) => k.currentTeamId === s.teamId);
          return { ...s, playerName: kid?.fullName ?? "", teamName: teamName(s.teamId) ?? "" };
        }),
      upcomingMatches: db.matches.filter((m) => m.status === "scheduled" && (m.homeTeam.startsWith("Makassar United U10") || m.awayTeam.startsWith("Makassar United U10") || m.homeTeam.startsWith("Makassar United U8"))),
      invoices: db.invoices.filter((inv) => guardian.childIds.includes(inv.playerId)),
      development: db.developmentNotes
        .filter((d) => guardian.childIds.includes(d.playerId))
        .map((d) => ({ ...d, playerName: kids.find((k) => k.id === d.playerId)?.fullName ?? "" })),
    });
  },

  async listConsents(playerId) {
    const records = db.consents.filter((c) => c.playerId === playerId);
    return delay(records.length ? records : defaultConsents(playerId));
  },

  async updateConsent(playerId, scope, granted) {
    let record = db.consents.find((c) => c.playerId === playerId && c.scope === scope);
    if (!record) {
      record = { playerId, scope, granted } satisfies ConsentRecord;
      db.consents.push(record);
    }
    record.granted = granted;
    record.updatedAt = "2026-11-12";
    db.consentHistory.unshift({
      id: `ce-${db.consentHistory.length + 1}`,
      playerId,
      scope,
      action: granted ? "granted" : "revoked",
      actor: "Siti Rahmawati (Ibu)",
      at: "2026-11-12",
    });
    return delay(record);
  },

  async listConsentHistory(playerId) {
    return delay(db.consentHistory.filter((e) => e.playerId === playerId));
  },

  async getSsbOverview(organizationId) {
    const organization = db.organizations.find((o) => o.id === organizationId);
    if (!organization) throw new Error("Organisasi tidak ditemukan");
    const orgTeams = db.teams.filter((t) => t.organizationId === organizationId);
    const outstanding = db.invoices.filter((i) => i.status !== "paid");
    return delay({
      organization,
      totals: {
        players: db.players.filter((p) => p.currentOrganizationId === organizationId).length,
        activeTeams: orgTeams.length,
        coaches: db.coaches.filter((c) => c.organizationId === organizationId).length,
        outstandingAmount: outstanding.reduce((sum, i) => sum + i.amount, 0),
        outstandingCount: outstanding.length,
      },
      upcomingTraining: db.trainingSessions
        .filter((s) => isUpcoming(s.date) && s.status === "scheduled")
        .map((s) => ({ ...s, teamName: teamName(s.teamId) ?? "" })),
      upcomingMatches: db.matches.filter((m) => m.status === "scheduled" && (m.homeTeam.startsWith("Makassar United") || m.awayTeam.startsWith("Makassar United"))),
      attendanceTrend: db.attendanceTrend,
      activities: db.activities,
    });
  },

  async listTeams(organizationId) {
    return delay(
      db.teams
        .filter((t) => t.organizationId === organizationId)
        .map((t) => ({
          ...t,
          coaches: db.coaches.filter((c) => t.coachIds.includes(c.id)),
          players: db.players.filter((p) => t.playerIds.includes(p.id) || p.currentTeamId === t.id),
        })),
    );
  },

  async listTrainingSessions() {
    return delay(
      [...db.trainingSessions]
        .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
        .map((s) => ({ ...s, teamName: teamName(s.teamId) ?? "" })),
    );
  },

  async listInvoices(organizationId) {
    const ids = db.players.filter((p) => p.currentOrganizationId === organizationId).map((p) => p.id);
    return delay(db.invoices.filter((i) => ids.includes(i.playerId)));
  },

  async getTournamentOverview(tournamentId) {
    const tournament = db.tournaments.find((t) => t.id === tournamentId);
    if (!tournament) throw new Error("Turnamen tidak ditemukan");
    const tMatches = db.matches.filter((m) => m.tournamentId === tournamentId);
    const regs = db.registrations.filter((r) => r.tournamentId === tournamentId);
    return delay({
      tournament,
      totals: {
        teams: regs.length,
        players: regs.reduce((sum, r) => sum + r.playerCount, 0),
        categories: tournament.categories.length,
        upcomingMatches: tMatches.filter((m) => m.status === "scheduled").length,
        completedMatches: tMatches.filter((m) => m.status === "completed").length,
        pendingRegistrations: regs.filter((r) => r.status === "pending").length,
      },
      upcomingMatches: tMatches.filter((m) => m.status === "scheduled").slice(0, 4),
      recentResults: tMatches.filter((m) => m.status === "completed").slice(-4).reverse(),
    });
  },

  async listRegistrations(tournamentId) {
    return delay(db.registrations.filter((r) => r.tournamentId === tournamentId));
  },

  async updateRegistrationStatus(registrationId, status) {
    const reg = db.registrations.find((r) => r.id === registrationId);
    if (!reg) throw new Error("Pendaftaran tidak ditemukan");
    reg.status = status;
    return delay(reg);
  },

  async listTournamentMatches(tournamentId) {
    return delay(
      db.matches
        .filter((m) => m.tournamentId === tournamentId)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    );
  },

  async listStandings(tournamentId) {
    const done = db.matches.filter((m) => m.tournamentId === tournamentId && m.status === "completed" && m.category === "U10");
    const table = new Map<string, import("@/shared/types/domain").Standing>();
    for (const reg of db.registrations.filter((r) => r.tournamentId === tournamentId && r.category === "U10" && r.group)) {
      table.set(reg.teamName, { group: `Grup ${reg.group}`, team: reg.teamName, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 });
    }
    for (const m of done) {
      const home = table.get(m.homeTeam);
      const away = table.get(m.awayTeam);
      if (!home || !away || m.homeScore === undefined || m.awayScore === undefined) continue;
      home.played++; away.played++;
      home.goalsFor += m.homeScore; home.goalsAgainst += m.awayScore;
      away.goalsFor += m.awayScore; away.goalsAgainst += m.homeScore;
      if (m.homeScore > m.awayScore) { home.won++; away.lost++; home.points += 3; }
      else if (m.homeScore < m.awayScore) { away.won++; home.lost++; away.points += 3; }
      else { home.drawn++; away.drawn++; home.points++; away.points++; }
    }
    return delay(
      [...table.values()].sort(
        (a, b) => a.group.localeCompare(b.group) || b.points - a.points || (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst),
      ),
    );
  },

  async listBracket() {
    return delay(db.bracket);
  },

  async searchScoutProfiles({ position, birthYear, province }) {
    const profiles = toScoutProfiles(db.players, db.consents, (id) => db.scoutMatchCounts[id] ?? 0);
    return delay(
      profiles
        .filter((p) => !position || p.position === position)
        .filter((p) => !birthYear || p.birthYear === birthYear)
        .filter((p) => !province || p.province === province),
    );
  },

  async listNotifications(role) {
    return delay(db.notifications.filter((n) => n.role === "all" || n.role === role));
  },
};
