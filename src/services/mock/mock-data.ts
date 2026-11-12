/**
 * MOCK DATA — prototype only. Realistic Indonesian sample data used consistently
 * across dashboards. Amounts, categories and dates are illustrative (see docs/ASSUMPTIONS.md).
 */
import type {
  Achievement,
  ActivityItem,
  AppNotification,
  AttendanceTrendPoint,
  BracketMatch,
  Certificate,
  Coach,
  ConsentEvent,
  ConsentRecord,
  DevelopmentNote,
  Guardian,
  Invoice,
  JourneyEvent,
  Match,
  Organization,
  OrganizationRelationship,
  Player,
  Position,
  PreferredFoot,
  Standing,
  Team,
  TeamRegistration,
  Tournament,
  TrainingSession,
} from "@/shared/types/domain";

export const CURRENT_PLAYER_ID = "pl-001";
export const CURRENT_GUARDIAN_ID = "gd-001";
export const CURRENT_ORGANIZATION_ID = "org-001";
export const CURRENT_TOURNAMENT_ID = "tr-001";

export const organizations: Organization[] = [
  { id: "org-001", name: "SSB Makassar United", type: "ssb", city: "Makassar", province: "Sulawesi Selatan", foundedYear: 2012, verified: true },
  { id: "org-002", name: "SSB Gowa Muda", type: "ssb", city: "Gowa", province: "Sulawesi Selatan", foundedYear: 2015, verified: true },
];

export const teams: Team[] = [
  { id: "tm-u8", organizationId: "org-001", name: "Makassar United U8", ageCategory: "U8", coachIds: ["co-003"], playerIds: [], trainingDays: "Sabtu" },
  { id: "tm-u10", organizationId: "org-001", name: "Makassar United U10", ageCategory: "U10", coachIds: ["co-001", "co-002"], playerIds: [], trainingDays: "Selasa, Kamis, Sabtu" },
  { id: "tm-u12", organizationId: "org-001", name: "Makassar United U12", ageCategory: "U12", coachIds: ["co-002"], playerIds: [], trainingDays: "Senin, Rabu, Jumat" },
];

export const coaches: Coach[] = [
  { id: "co-001", name: "Coach Andi Rahmat", license: "Lisensi D PSSI", organizationId: "org-001", teamIds: ["tm-u10"] },
  { id: "co-002", name: "Coach Hendra Gunawan", license: "Lisensi C AFC", organizationId: "org-001", teamIds: ["tm-u10", "tm-u12"] },
  { id: "co-003", name: "Coach Nurul Hidayah", license: "Lisensi D PSSI", organizationId: "org-001", teamIds: ["tm-u8"] },
];

const roster: Array<[string, number, Position, PreferredFoot, string]> = [
  ["Rizky Pratama", 2016, "FW", "right", "tm-u10"],
  ["Muhammad Fajar", 2016, "MF", "right", "tm-u10"],
  ["Andi Saputra", 2016, "DF", "left", "tm-u10"],
  ["Dimas Ardiansyah", 2016, "GK", "right", "tm-u10"],
  ["Raka Mahendra", 2017, "MF", "both", "tm-u10"],
  ["Bayu Setiawan", 2016, "DF", "right", "tm-u10"],
  ["Aditya Nugraha", 2017, "FW", "left", "tm-u10"],
  ["Farhan Hidayat", 2016, "MF", "right", "tm-u10"],
  ["Ilham Ramadhan", 2014, "FW", "right", "tm-u12"],
  ["Arya Wijaya", 2014, "MF", "right", "tm-u12"],
  ["Daffa Kurniawan", 2015, "DF", "left", "tm-u12"],
  ["Fikri Maulana", 2014, "GK", "right", "tm-u12"],
  ["Rafi Syahputra", 2015, "MF", "both", "tm-u12"],
  ["Galang Prasetyo", 2014, "DF", "right", "tm-u12"],
  ["Naufal Akbar", 2015, "FW", "right", "tm-u12"],
  ["Zidan Firmansyah", 2014, "MF", "left", "tm-u12"],
  ["Aisyah Pratama", 2018, "MF", "right", "tm-u8"],
  ["Haikal Rahman", 2018, "FW", "right", "tm-u8"],
  ["Yusuf Hamzah", 2018, "DF", "left", "tm-u8"],
  ["Kevin Tanjaya", 2019, "MF", "right", "tm-u8"],
  ["Andi Muh. Rezky", 2018, "GK", "right", "tm-u8"],
  ["Arief Basri", 2017, "DF", "right", "tm-u10"],
  ["Fadil Amiruddin", 2015, "FW", "left", "tm-u12"],
  ["Rehan Syam", 2019, "MF", "both", "tm-u8"],
];

export const players: Player[] = roster.map(([fullName, birthYear, position, preferredFoot, teamId], i) => {
  const n = i === 0 ? 123 : 200 + i * 7;
  return {
    id: `pl-${String(i + 1).padStart(3, "0")}`,
    footballId: {
      value: `IDN-FB-${birthYear}-${String(n).padStart(6, "0")}`,
      issuedAt: i === 0 ? "2022-07-18" : "2023-01-10",
      status: i === 20 ? "pending_verification" : "active",
    },
    fullName,
    birthYear,
    gender: fullName === "Aisyah Pratama" ? "female" : "male",
    position,
    preferredFoot,
    city: "Makassar",
    province: "Sulawesi Selatan",
    currentOrganizationId: "org-001",
    currentTeamId: teamId,
    guardianIds: i === 0 || fullName === "Aisyah Pratama" ? [CURRENT_GUARDIAN_ID] : [],
    identityVerified: i !== 20,
  };
});

for (const team of teams) {
  team.playerIds = players.filter((p) => p.currentTeamId === team.id).map((p) => p.id);
}

export const guardians: Guardian[] = [
  {
    id: CURRENT_GUARDIAN_ID,
    name: "Siti Rahmawati",
    relationship: "Ibu",
    maskedPhone: "+62 812-••••-4471",
    verification: "verified",
    childIds: ["pl-001", "pl-017"],
  },
];

export const relationships: OrganizationRelationship[] = [
  { id: "rel-1", playerId: "pl-001", organizationId: "org-002", organizationName: "SSB Gowa Muda", teamName: "Gowa Muda U8", status: "ended", startDate: "2022-07-18", endDate: "2024-06-30" },
  { id: "rel-2", playerId: "pl-001", organizationId: "org-001", organizationName: "SSB Makassar United", teamName: "Makassar United U10", status: "active", startDate: "2024-07-15" },
];

export const journey: JourneyEvent[] = [
  { id: "j1", playerId: "pl-001", date: "2022-07-18", title: "Football ID diterbitkan", description: "IDN-FB-2016-000123 menjadi identitas sepak bola permanen Rizky.", kind: "identity" },
  { id: "j2", playerId: "pl-001", date: "2022-07-20", title: "Bergabung dengan SSB Gowa Muda", description: "Kategori U8 — relasi pertama dengan organisasi.", kind: "organization" },
  { id: "j3", playerId: "pl-001", date: "2023-11-12", title: "Turnamen pertama", description: "Festival Sepak Bola Anak Gowa 2023.", kind: "competition" },
  { id: "j4", playerId: "pl-001", date: "2024-07-15", title: "Pindah ke SSB Makassar United", description: "Riwayat di SSB Gowa Muda tetap tersimpan di Football ID.", kind: "organization" },
  { id: "j5", playerId: "pl-001", date: "2025-12-08", title: "Pemain Terbaik Turnamen", description: "Liga Anak Sulsel 2025 — kategori U9.", kind: "achievement" },
  { id: "j6", playerId: "pl-001", date: "2026-11-07", title: "Makassar Youth Cup 2027", description: "Terdaftar di kategori U10 bersama Makassar United U10.", kind: "competition" },
];

export const achievements: Achievement[] = [
  { id: "a1", playerId: "pl-001", title: "Pemain Terbaik", event: "Liga Anak Sulsel 2025 · U9", date: "2025-12-08", kind: "award" },
  { id: "a2", playerId: "pl-001", title: "Juara 2", event: "Festival Sepak Bola Anak Gowa 2024", date: "2024-03-17", kind: "trophy" },
  { id: "a3", playerId: "pl-001", title: "50 sesi latihan", event: "SSB Makassar United", date: "2025-05-02", kind: "milestone" },
];

export const certificates: Certificate[] = [
  { id: "c1", playerId: "pl-001", title: "Sertifikat Peserta — Liga Anak Sulsel 2025", issuer: "Panitia Liga Anak Sulsel", issuedAt: "2025-12-10" },
  { id: "c2", playerId: "pl-001", title: "Sertifikat Peserta — Festival Anak Gowa 2024", issuer: "SSB Gowa Muda", issuedAt: "2024-03-20" },
];

export const developmentNotes: DevelopmentNote[] = [
  { id: "d1", playerId: "pl-001", date: "2026-11-05", title: "Penyelesaian akhir membaik", note: "Lebih tenang saat berhadapan satu lawan satu dengan kiper. Lanjutkan latihan kaki kiri.", coach: "Coach Andi Rahmat" },
  { id: "d2", playerId: "pl-001", date: "2026-10-15", title: "Kerja sama tim", note: "Mulai aktif memberi umpan ke rekan yang posisinya lebih baik.", coach: "Coach Hendra Gunawan" },
  { id: "d3", playerId: "pl-017", date: "2026-11-01", title: "Koordinasi dasar", note: "Aisyah semakin percaya diri menggiring bola dengan kedua kaki.", coach: "Coach Nurul Hidayah" },
];

export const trainingSessions: TrainingSession[] = [
  { id: "ts-1", teamId: "tm-u10", date: "2026-11-10", startTime: "15:30", endTime: "17:00", venue: "Lapangan Karebosi", focus: "Passing & kontrol bola", status: "completed" },
  { id: "ts-2", teamId: "tm-u10", date: "2026-11-12", startTime: "15:30", endTime: "17:00", venue: "Lapangan Karebosi", focus: "Finishing", status: "scheduled" },
  { id: "ts-3", teamId: "tm-u8", date: "2026-11-14", startTime: "07:30", endTime: "09:00", venue: "Lapangan Hasanuddin", focus: "Permainan kecil 4v4", status: "scheduled" },
  { id: "ts-4", teamId: "tm-u10", date: "2026-11-14", startTime: "07:00", endTime: "08:30", venue: "Lapangan Karebosi", focus: "Persiapan laga grup", status: "scheduled" },
  { id: "ts-5", teamId: "tm-u12", date: "2026-11-13", startTime: "15:30", endTime: "17:30", venue: "Stadion Mini Antang", focus: "Transisi bertahan", status: "scheduled" },
  { id: "ts-6", teamId: "tm-u12", date: "2026-11-11", startTime: "15:30", endTime: "17:30", venue: "Stadion Mini Antang", focus: "Pressing", status: "completed" },
  { id: "ts-7", teamId: "tm-u10", date: "2026-11-17", startTime: "15:30", endTime: "17:00", venue: "Lapangan Karebosi", focus: "Bola mati", status: "scheduled" },
  { id: "ts-8", teamId: "tm-u12", date: "2026-11-16", startTime: "15:30", endTime: "17:30", venue: "Stadion Mini Antang", focus: "Penguasaan bola", status: "cancelled" },
];

export const attendanceTrend: AttendanceTrendPoint[] = [
  { month: "Jun", rate: 86 },
  { month: "Jul", rate: 82 },
  { month: "Agu", rate: 88 },
  { month: "Sep", rate: 91 },
  { month: "Okt", rate: 87 },
  { month: "Nov", rate: 93 },
];

export const tournaments: Tournament[] = [
  {
    id: CURRENT_TOURNAMENT_ID,
    name: "Makassar Youth Cup 2027",
    organizer: "Asosiasi Sepak Bola Usia Dini Makassar",
    city: "Makassar",
    province: "Sulawesi Selatan",
    startDate: "2026-11-07",
    endDate: "2027-01-31",
    status: "ongoing",
    categories: ["U8", "U10", "U12"],
  },
];

export const matches: Match[] = [
  { id: "m1", tournamentId: "tr-001", category: "U10", stage: "Grup A", homeTeam: "Makassar United U10", awayTeam: "Gowa Muda U10", homeScore: 3, awayScore: 1, date: "2026-11-07", time: "08:00", venue: "Stadion Mini Antang", status: "completed" },
  { id: "m2", tournamentId: "tr-001", category: "U10", stage: "Grup A", homeTeam: "Maros Junior U10", awayTeam: "Bone Putra U10", homeScore: 0, awayScore: 0, date: "2026-11-07", time: "09:30", venue: "Stadion Mini Antang", status: "completed" },
  { id: "m3", tournamentId: "tr-001", category: "U10", stage: "Grup B", homeTeam: "Pare Pare FC U10", awayTeam: "Takalar Muda U10", homeScore: 2, awayScore: 2, date: "2026-11-08", time: "08:00", venue: "Lapangan Karebosi", status: "completed" },
  { id: "m4", tournamentId: "tr-001", category: "U10", stage: "Grup B", homeTeam: "Sinjai Star U10", awayTeam: "Bulukumba Raya U10", homeScore: 1, awayScore: 4, date: "2026-11-08", time: "09:30", venue: "Lapangan Karebosi", status: "completed" },
  { id: "m5", tournamentId: "tr-001", category: "U10", stage: "Grup A", homeTeam: "Bone Putra U10", awayTeam: "Makassar United U10", date: "2026-11-15", time: "08:00", venue: "Stadion Mini Antang", status: "scheduled" },
  { id: "m6", tournamentId: "tr-001", category: "U10", stage: "Grup A", homeTeam: "Gowa Muda U10", awayTeam: "Maros Junior U10", date: "2026-11-15", time: "09:30", venue: "Stadion Mini Antang", status: "scheduled" },
  { id: "m7", tournamentId: "tr-001", category: "U10", stage: "Grup B", homeTeam: "Takalar Muda U10", awayTeam: "Sinjai Star U10", date: "2026-11-16", time: "08:00", venue: "Lapangan Karebosi", status: "scheduled" },
  { id: "m8", tournamentId: "tr-001", category: "U10", stage: "Grup B", homeTeam: "Bulukumba Raya U10", awayTeam: "Pare Pare FC U10", date: "2026-11-16", time: "09:30", venue: "Lapangan Karebosi", status: "scheduled" },
  { id: "m9", tournamentId: "tr-001", category: "U12", stage: "Grup A", homeTeam: "Makassar United U12", awayTeam: "Gowa Muda U12", homeScore: 1, awayScore: 2, date: "2026-11-08", time: "14:00", venue: "Stadion Mini Antang", status: "completed" },
  { id: "m10", tournamentId: "tr-001", category: "U12", stage: "Grup A", homeTeam: "Maros Junior U12", awayTeam: "Makassar United U12", date: "2026-11-22", time: "14:00", venue: "Stadion Mini Antang", status: "scheduled" },
  { id: "m11", tournamentId: "tr-001", category: "U8", stage: "Festival", homeTeam: "Makassar United U8", awayTeam: "Gowa Muda U8", date: "2026-11-21", time: "07:30", venue: "Lapangan Hasanuddin", status: "scheduled" },
];

/** Player match history (outside the current tournament as well). */
export const playerMatchIds: Record<string, string[]> = {
  "pl-001": ["m1", "m5"],
};

export const registrations: TeamRegistration[] = [
  { id: "rg-1", tournamentId: "tr-001", category: "U10", teamName: "Makassar United U10", organizationName: "SSB Makassar United", playerCount: 16, status: "verified", submittedAt: "2026-10-02", group: "A" },
  { id: "rg-2", tournamentId: "tr-001", category: "U10", teamName: "Gowa Muda U10", organizationName: "SSB Gowa Muda", playerCount: 15, status: "verified", submittedAt: "2026-10-04", group: "A" },
  { id: "rg-3", tournamentId: "tr-001", category: "U10", teamName: "Maros Junior U10", organizationName: "SSB Maros Junior", playerCount: 14, status: "verified", submittedAt: "2026-10-05", group: "A" },
  { id: "rg-4", tournamentId: "tr-001", category: "U10", teamName: "Bone Putra U10", organizationName: "SSB Bone Putra", playerCount: 16, status: "verified", submittedAt: "2026-10-06", group: "A" },
  { id: "rg-5", tournamentId: "tr-001", category: "U10", teamName: "Pare Pare FC U10", organizationName: "Pare Pare FC Academy", playerCount: 15, status: "verified", submittedAt: "2026-10-06", group: "B" },
  { id: "rg-6", tournamentId: "tr-001", category: "U10", teamName: "Takalar Muda U10", organizationName: "SSB Takalar Muda", playerCount: 13, status: "verified", submittedAt: "2026-10-08", group: "B" },
  { id: "rg-7", tournamentId: "tr-001", category: "U10", teamName: "Sinjai Star U10", organizationName: "SSB Sinjai Star", playerCount: 14, status: "verified", submittedAt: "2026-10-09", group: "B" },
  { id: "rg-8", tournamentId: "tr-001", category: "U10", teamName: "Bulukumba Raya U10", organizationName: "SSB Bulukumba Raya", playerCount: 16, status: "verified", submittedAt: "2026-10-10", group: "B" },
  { id: "rg-9", tournamentId: "tr-001", category: "U12", teamName: "Makassar United U12", organizationName: "SSB Makassar United", playerCount: 18, status: "verified", submittedAt: "2026-10-02", group: "A" },
  { id: "rg-10", tournamentId: "tr-001", category: "U12", teamName: "Gowa Muda U12", organizationName: "SSB Gowa Muda", playerCount: 17, status: "verified", submittedAt: "2026-10-04", group: "A" },
  { id: "rg-11", tournamentId: "tr-001", category: "U12", teamName: "Maros Junior U12", organizationName: "SSB Maros Junior", playerCount: 16, status: "pending", submittedAt: "2026-11-02" },
  { id: "rg-12", tournamentId: "tr-001", category: "U8", teamName: "Makassar United U8", organizationName: "SSB Makassar United", playerCount: 10, status: "pending", submittedAt: "2026-11-05" },
  { id: "rg-13", tournamentId: "tr-001", category: "U8", teamName: "Gowa Muda U8", organizationName: "SSB Gowa Muda", playerCount: 9, status: "needs_revision", submittedAt: "2026-11-06" },
  { id: "rg-14", tournamentId: "tr-001", category: "U12", teamName: "Palopo Muda U12", organizationName: "SSB Palopo Muda", playerCount: 12, status: "pending", submittedAt: "2026-11-09" },
];

export const bracket: BracketMatch[] = [
  { id: "b1", round: "Semifinal", homeTeam: "Juara Grup A", awayTeam: "Runner-up Grup B" },
  { id: "b2", round: "Semifinal", homeTeam: "Juara Grup B", awayTeam: "Runner-up Grup A" },
  { id: "b3", round: "Final", homeTeam: "Pemenang SF1", awayTeam: "Pemenang SF2" },
];

export const invoices: Invoice[] = [
  { id: "INV-2026-1101", playerId: "pl-001", playerName: "Rizky Pratama", description: "Iuran bulanan November 2026", amount: 150000, dueDate: "2026-11-10", status: "paid", paidAt: "2026-11-03" },
  { id: "INV-2026-1102", playerId: "pl-017", playerName: "Aisyah Pratama", description: "Iuran bulanan November 2026", amount: 150000, dueDate: "2026-11-10", status: "overdue" },
  { id: "INV-2026-1103", playerId: "pl-001", playerName: "Rizky Pratama", description: "Biaya pendaftaran Makassar Youth Cup 2027", amount: 250000, dueDate: "2026-11-20", status: "unpaid" },
  { id: "INV-2026-1001", playerId: "pl-001", playerName: "Rizky Pratama", description: "Iuran bulanan Oktober 2026", amount: 150000, dueDate: "2026-10-10", status: "paid", paidAt: "2026-10-06" },
  { id: "INV-2026-1002", playerId: "pl-017", playerName: "Aisyah Pratama", description: "Iuran bulanan Oktober 2026", amount: 150000, dueDate: "2026-10-10", status: "paid", paidAt: "2026-10-08" },
  { id: "INV-2026-1104", playerId: "pl-002", playerName: "Muhammad Fajar", description: "Iuran bulanan November 2026", amount: 150000, dueDate: "2026-11-10", status: "unpaid" },
  { id: "INV-2026-1105", playerId: "pl-009", playerName: "Ilham Ramadhan", description: "Iuran bulanan November 2026", amount: 175000, dueDate: "2026-11-10", status: "overdue" },
  { id: "INV-2026-1106", playerId: "pl-005", playerName: "Raka Mahendra", description: "Iuran bulanan November 2026", amount: 150000, dueDate: "2026-11-10", status: "paid", paidAt: "2026-11-02" },
];

export const consents: ConsentRecord[] = [
  { playerId: "pl-001", scope: "share_with_organization", granted: true, updatedAt: "2024-07-15" },
  { playerId: "pl-001", scope: "competition_participation", granted: true, updatedAt: "2024-07-15" },
  { playerId: "pl-001", scope: "development_reports", granted: true, updatedAt: "2024-07-15" },
  { playerId: "pl-001", scope: "photo_publication", granted: false },
  { playerId: "pl-001", scope: "scouting_visibility", granted: false },
  { playerId: "pl-017", scope: "share_with_organization", granted: true, updatedAt: "2025-08-01" },
  { playerId: "pl-017", scope: "competition_participation", granted: false },
  { playerId: "pl-017", scope: "development_reports", granted: true, updatedAt: "2025-08-01" },
  { playerId: "pl-017", scope: "photo_publication", granted: false },
  { playerId: "pl-017", scope: "scouting_visibility", granted: false },
  ...["pl-009", "pl-010", "pl-013", "pl-015", "pl-002", "pl-008"].map<ConsentRecord>((playerId) => ({
    playerId,
    scope: "scouting_visibility",
    granted: true,
    updatedAt: "2026-09-01",
  })),
];

export const consentHistory: ConsentEvent[] = [
  { id: "ce-1", playerId: "pl-001", scope: "share_with_organization", action: "granted", actor: "Siti Rahmawati (Ibu)", at: "2024-07-15" },
  { id: "ce-2", playerId: "pl-001", scope: "competition_participation", action: "granted", actor: "Siti Rahmawati (Ibu)", at: "2024-07-15" },
  { id: "ce-3", playerId: "pl-001", scope: "photo_publication", action: "revoked", actor: "Siti Rahmawati (Ibu)", at: "2025-02-11" },
];

export const scoutMatchCounts: Record<string, number> = {
  "pl-009": 9, "pl-010": 7, "pl-013": 5, "pl-015": 8, "pl-002": 4, "pl-008": 6,
};

export const activities: ActivityItem[] = [
  { id: "ac-1", title: "Kehadiran latihan dicatat", description: "U10 · Passing & kontrol bola · 15/16 hadir", at: "2026-11-10" },
  { id: "ac-2", title: "Pembayaran diterima", description: "Raka Mahendra · Iuran November", at: "2026-11-02" },
  { id: "ac-3", title: "Roster U10 diverifikasi", description: "Makassar Youth Cup 2027", at: "2026-10-20" },
  { id: "ac-4", title: "Pemain baru terdaftar", description: "Rehan Syam · U8", at: "2026-10-12" },
];

export const notifications: AppNotification[] = [
  { id: "n1", title: "Jadwal laga grup", body: "Bone Putra U10 vs Makassar United U10 — Sab, 15 Nov 08:00.", createdAt: "2026-11-11", read: false, role: "all" },
  { id: "n2", title: "Tagihan jatuh tempo", body: "Iuran November Aisyah Pratama belum dibayar.", createdAt: "2026-11-11", read: false, role: "parent" },
  { id: "n3", title: "Catatan perkembangan baru", body: "Coach Andi menambahkan catatan untuk Rizky.", createdAt: "2026-11-05", read: true, role: "parent" },
  { id: "n4", title: "3 pendaftaran menunggu verifikasi", body: "Kategori U8 dan U12 perlu ditinjau.", createdAt: "2026-11-09", read: false, role: "tournament" },
  { id: "n5", title: "2 tagihan lewat jatuh tempo", body: "Tinjau di menu Keuangan.", createdAt: "2026-11-11", read: false, role: "ssb" },
  { id: "n6", title: "Latihan hari ini", body: "Finishing · 15:30 di Lapangan Karebosi.", createdAt: "2026-11-12", read: false, role: "player" },
];
