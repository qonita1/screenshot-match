/**
 * Role-based navigation. One config drives the sidebar, mobile drawer and breadcrumbs.
 * Items for modules that are not built yet point to the role's `$section` placeholder route.
 */
import { linkOptions } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Flag,
  GitBranch,
  IdCard,
  LayoutDashboard,
  ListOrdered,
  MapPin,
  Search,
  Settings,
  Shirt,
  ShieldCheck,
  Shuffle,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

export const NAV = {
  player: linkOptions([
    { label: "Ringkasan", icon: LayoutDashboard, to: "/app/player", activeOptions: { exact: true } },
    { label: "Football ID", icon: IdCard, to: "/app/player/football-id" },
  ]),
  parent: linkOptions([
    { label: "Ringkasan", icon: LayoutDashboard, to: "/app/parent", activeOptions: { exact: true } },
    { label: "Pembayaran", icon: CreditCard, to: "/app/parent/payments" },
    { label: "Izin & Privasi", icon: ShieldCheck, to: "/app/parent/consent" },
  ]),
  ssb: linkOptions([
    { label: "Ringkasan", icon: LayoutDashboard, to: "/app/ssb", activeOptions: { exact: true } },
    { label: "Pemain", icon: Users, to: "/app/ssb/players" },
    { label: "Tim", icon: Shirt, to: "/app/ssb/teams" },
    { label: "Pelatih", icon: UserRound, to: "/app/ssb/$section", params: { section: "coaches" } },
    { label: "Latihan", icon: CalendarDays, to: "/app/ssb/training" },
    { label: "Kehadiran", icon: ClipboardCheck, to: "/app/ssb/$section", params: { section: "attendance" } },
    { label: "Kompetisi", icon: Trophy, to: "/app/ssb/$section", params: { section: "competitions" } },
    { label: "Keuangan", icon: CreditCard, to: "/app/ssb/finance" },
    { label: "Perkembangan", icon: BarChart3, to: "/app/ssb/$section", params: { section: "development" } },
    { label: "Dokumen", icon: FileText, to: "/app/ssb/$section", params: { section: "documents" } },
    { label: "Pengaturan", icon: Settings, to: "/app/ssb/$section", params: { section: "settings" } },
  ]),
  tournament: linkOptions([
    { label: "Ringkasan", icon: LayoutDashboard, to: "/app/tournament", activeOptions: { exact: true } },
    { label: "Turnamen", icon: Trophy, to: "/app/tournament/$section", params: { section: "tournaments" } },
    { label: "Kategori", icon: ListOrdered, to: "/app/tournament/$section", params: { section: "categories" } },
    { label: "Pendaftaran Tim", icon: ClipboardList, to: "/app/tournament/teams" },
    { label: "Roster Pemain", icon: Users, to: "/app/tournament/$section", params: { section: "rosters" } },
    { label: "Grup & Undian", icon: Shuffle, to: "/app/tournament/$section", params: { section: "draw" } },
    { label: "Jadwal & Hasil", icon: CalendarDays, to: "/app/tournament/schedule" },
    { label: "Klasemen & Bagan", icon: GitBranch, to: "/app/tournament/standings" },
    { label: "Venue", icon: MapPin, to: "/app/tournament/$section", params: { section: "venues" } },
    { label: "Wasit", icon: Flag, to: "/app/tournament/$section", params: { section: "referees" } },
    { label: "Statistik", icon: BarChart3, to: "/app/tournament/$section", params: { section: "statistics" } },
    { label: "Sertifikat", icon: Award, to: "/app/tournament/$section", params: { section: "certificates" } },
  ]),
  coach: linkOptions([
    { label: "Ringkasan", icon: LayoutDashboard, to: "/app/coach", activeOptions: { exact: true } },
  ]),
  scout: linkOptions([
    { label: "Temukan Pemain", icon: Search, to: "/app/scout", activeOptions: { exact: true } },
  ]),
};

export interface SectionMeta {
  title: string;
  description: string;
  planned: string[];
}

/** Modules visible in navigation but not built in this phase. */
export const SSB_SECTIONS: Record<string, SectionMeta> = {
  coaches: { title: "Pelatih", description: "Profil pelatih, lisensi, dan penugasan tim.", planned: ["Daftar pelatih & lisensi", "Penugasan ke tim", "Riwayat kepelatihan"] },
  attendance: { title: "Kehadiran", description: "Rekap kehadiran per sesi, tim, dan pemain.", planned: ["Absensi cepat di lapangan", "Rekap bulanan per pemain", "Notifikasi ke orang tua"] },
  competitions: { title: "Kompetisi", description: "Turnamen yang diikuti SSB dan status roster.", planned: ["Daftar turnamen", "Pengajuan roster", "Hasil pertandingan tim"] },
  development: { title: "Perkembangan", description: "Catatan perkembangan pemain dari pelatih.", planned: ["Catatan per sesi", "Laporan berkala untuk orang tua", "Kerangka penilaian (menunggu standar)"] },
  documents: { title: "Dokumen", description: "Dokumen pemain dan organisasi.", planned: ["Akta / KIA pemain (akses terbatas)", "Legalitas SSB", "Sertifikat"] },
  settings: { title: "Pengaturan Organisasi", description: "Profil SSB, admin, dan preferensi.", planned: ["Profil organisasi", "Manajemen admin", "Biaya keanggotaan"] },
};

export const TOURNAMENT_SECTIONS: Record<string, SectionMeta> = {
  tournaments: { title: "Turnamen", description: "Semua turnamen yang Anda kelola.", planned: ["Buat turnamen baru", "Duplikasi edisi sebelumnya", "Arsip turnamen"] },
  categories: { title: "Kategori", description: "Kategori usia dan format pertandingan.", planned: ["Kategori usia", "Format (menunggu aturan resmi)", "Kuota tim"] },
  rosters: { title: "Roster Pemain", description: "Verifikasi pemain berdasarkan Football ID.", planned: ["Cek Football ID & tahun lahir", "Status izin kompetisi dari wali", "Kunci roster"] },
  draw: { title: "Grup & Undian", description: "Pembagian grup dan undian.", planned: ["Pot & seeding", "Undian langsung", "Publikasi grup"] },
  venues: { title: "Venue", description: "Lapangan dan ketersediaannya.", planned: ["Daftar lapangan", "Jadwal pemakaian"] },
  referees: { title: "Wasit", description: "Penugasan wasit pertandingan.", planned: ["Daftar wasit", "Penugasan per laga", "Laporan wasit"] },
  statistics: { title: "Statistik", description: "Statistik tim dan pemain.", planned: ["Top skor", "Statistik tim", "Ekspor laporan"] },
  certificates: { title: "Sertifikat", description: "Sertifikat peserta dan penghargaan.", planned: ["Templat sertifikat", "Terbit ke Football ID pemain"] },
};

