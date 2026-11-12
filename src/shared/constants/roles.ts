import type { FutureRoleId, RoleId } from "@/shared/types/domain";

export interface RoleMeta {
  id: RoleId;
  label: string;
  shortLabel: string;
  description: string;
  /** MVP 1 roles are fully prototyped; others are future-ready previews. */
  mvp: boolean;
}

export const ROLES: Record<RoleId, RoleMeta> = {
  player: { id: "player", label: "Pemain", shortLabel: "Pemain", description: "Lihat Football ID, perjalanan, jadwal, dan prestasi Anda.", mvp: true },
  parent: { id: "parent", label: "Orang Tua / Wali", shortLabel: "Orang Tua", description: "Pantau anak, jadwal, pembayaran, dan kelola izin data.", mvp: true },
  ssb: { id: "ssb", label: "SSB / Klub", shortLabel: "SSB", description: "Kelola pemain, tim, pelatih, latihan, dan keuangan.", mvp: true },
  tournament: { id: "tournament", label: "Penyelenggara Turnamen", shortLabel: "Turnamen", description: "Kelola pendaftaran tim, jadwal, hasil, dan klasemen.", mvp: true },
  coach: { id: "coach", label: "Pelatih", shortLabel: "Pelatih", description: "Sesi latihan, kehadiran, dan catatan perkembangan.", mvp: false },
  scout: { id: "scout", label: "Pemandu Bakat", shortLabel: "Scout", description: "Temukan pemain yang izin scouting-nya sudah diberikan wali.", mvp: false },
};

export const ROLE_ORDER: RoleId[] = ["player", "parent", "ssb", "tournament", "coach", "scout"];

export const FUTURE_ROLES: Record<FutureRoleId, string> = {
  referee: "Wasit",
  academy: "Akademi",
  association: "Asosiasi Kab/Kota",
  federation: "Federasi",
};

export function isRoleId(value: string): value is RoleId {
  return (ROLE_ORDER as string[]).includes(value);
}
