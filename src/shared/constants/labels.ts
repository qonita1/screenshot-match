import type {
  AttendanceStatus,
  ConsentScope,
  InvoiceStatus,
  MatchStatus,
  Position,
  PreferredFoot,
  RegistrationStatus,
  TournamentStatus,
} from "@/shared/types/domain";

export const POSITION_LABEL: Record<Position, string> = {
  GK: "Penjaga Gawang",
  DF: "Bek",
  MF: "Gelandang",
  FW: "Penyerang",
};

export const FOOT_LABEL: Record<PreferredFoot, string> = { right: "Kanan", left: "Kiri", both: "Keduanya" };

export const ATTENDANCE_LABEL: Record<AttendanceStatus, string> = {
  present: "Hadir",
  late: "Terlambat",
  excused: "Izin",
  absent: "Tidak hadir",
};

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: "Lunas",
  unpaid: "Belum dibayar",
  overdue: "Jatuh tempo",
};

export const MATCH_STATUS_LABEL: Record<MatchStatus, string> = {
  scheduled: "Terjadwal",
  live: "Berlangsung",
  completed: "Selesai",
};

export const REGISTRATION_STATUS_LABEL: Record<RegistrationStatus, string> = {
  pending: "Menunggu verifikasi",
  verified: "Terverifikasi",
  needs_revision: "Perlu revisi",
};

export const TOURNAMENT_STATUS_LABEL: Record<TournamentStatus, string> = {
  draft: "Draf",
  registration: "Pendaftaran",
  ongoing: "Berlangsung",
  completed: "Selesai",
};

export interface ConsentScopeMeta {
  title: string;
  description: string;
  sensitive: boolean;
}

/** Consent categories are a prototype assumption — see docs/ASSUMPTIONS.md. */
export const CONSENT_SCOPES: Record<ConsentScope, ConsentScopeMeta> = {
  share_with_organization: {
    title: "Berbagi profil dengan SSB",
    description: "SSB tempat anak terdaftar dapat melihat profil, jadwal, dan kehadiran.",
    sensitive: false,
  },
  competition_participation: {
    title: "Ikut kompetisi",
    description: "Penyelenggara turnamen dapat melihat nama, tahun lahir, dan Football ID untuk verifikasi roster.",
    sensitive: false,
  },
  development_reports: {
    title: "Laporan perkembangan",
    description: "Pelatih dapat menulis dan membagikan catatan perkembangan kepada Anda.",
    sensitive: false,
  },
  photo_publication: {
    title: "Publikasi foto",
    description: "Foto anak boleh tampil di halaman publik SSB atau turnamen.",
    sensitive: true,
  },
  scouting_visibility: {
    title: "Terlihat oleh pemandu bakat",
    description: "Profil terbatas (posisi, tahun lahir, wilayah) dapat ditemukan oleh scout terverifikasi.",
    sensitive: true,
  },
};

export const CONSENT_SCOPE_ORDER: ConsentScope[] = [
  "share_with_organization",
  "competition_participation",
  "development_reports",
  "photo_publication",
  "scouting_visibility",
];
