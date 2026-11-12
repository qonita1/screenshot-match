/**
 * Agent definitions — data only, no UI and no provider calls.
 * System instructions for real providers belong on the server, not here.
 */
import type { AgentDefinition, AgentId } from "@/shared/contracts/agent.contract";
import type { RoleId } from "@/shared/types/domain";

export const AGENTS: Record<AgentId, AgentDefinition> = {
  "parent-assistant": {
    id: "parent-assistant",
    name: "Asisten Orang Tua",
    description: "Membantu orang tua memahami jadwal, tagihan, laporan perkembangan, dan izin data anak.",
    capabilities: ["Menjelaskan laporan perkembangan", "Menjelaskan izin & privasi", "Navigasi jadwal dan pembayaran"],
    allowedRoles: ["parent"],
    contextKeys: ["role", "currentPage", "childCount"],
    suggestedQuestions: ["Apa arti izin 'Terlihat oleh pemandu bakat'?", "Bagaimana cara membayar iuran?", "Di mana catatan perkembangan anak saya?"],
    inputContract: "Pertanyaan teks + konteks halaman. Tanpa data medis atau identitas sensitif.",
    outputContract: "Penjelasan teks berbahasa Indonesia; tidak mengubah data.",
  },
  "player-development-assistant": {
    id: "player-development-assistant",
    name: "Asisten Perkembangan Pemain",
    description: "Membantu pemain memahami perjalanan, jadwal latihan, dan catatan pelatih.",
    capabilities: ["Menjelaskan Football ID", "Merangkum perjalanan sepak bola", "Mengingatkan jadwal"],
    allowedRoles: ["player", "parent"],
    contextKeys: ["role", "currentPage"],
    suggestedQuestions: ["Apa itu Football ID saya?", "Kapan latihan berikutnya?", "Apa yang perlu saya latih?"],
    inputContract: "Pertanyaan teks + konteks halaman.",
    outputContract: "Penjelasan teks sederhana yang ramah anak.",
  },
  "ssb-management-assistant": {
    id: "ssb-management-assistant",
    name: "Asisten Manajemen SSB",
    description: "Membantu admin SSB memahami dashboard, pemain, tim, latihan, dan keuangan.",
    capabilities: ["Menjelaskan widget dashboard", "Panduan registrasi pemain", "Ringkasan tagihan tertunda"],
    allowedRoles: ["ssb"],
    contextKeys: ["role", "currentPage", "organizationName"],
    suggestedQuestions: ["Bagaimana cara mendaftarkan pemain baru?", "Apa arti tagihan tertunda?", "Bagaimana mencatat kehadiran?"],
    inputContract: "Pertanyaan teks + nama organisasi + halaman aktif.",
    outputContract: "Langkah-langkah operasional; tidak mengeksekusi aksi.",
  },
  "coach-assistant": {
    id: "coach-assistant",
    name: "Asisten Pelatih",
    description: "Membantu pelatih menyiapkan rencana latihan dan catatan perkembangan.",
    capabilities: ["Ide sesi latihan sesuai usia", "Struktur catatan perkembangan"],
    allowedRoles: ["coach", "ssb"],
    contextKeys: ["role", "currentPage", "organizationName"],
    suggestedQuestions: ["Buatkan ide latihan passing untuk U10", "Bagaimana menulis catatan perkembangan yang baik?"],
    inputContract: "Pertanyaan teks + kategori usia.",
    outputContract: "Saran latihan teks; bukan penilaian resmi pemain.",
  },
  "tournament-assistant": {
    id: "tournament-assistant",
    name: "Asisten Turnamen",
    description: "Membantu penyelenggara mengelola informasi operasional turnamen.",
    capabilities: ["Ringkasan status pendaftaran", "Panduan verifikasi roster", "Penjelasan klasemen"],
    allowedRoles: ["tournament"],
    contextKeys: ["role", "currentPage", "tournamentName"],
    suggestedQuestions: ["Berapa pendaftaran yang belum diverifikasi?", "Bagaimana memverifikasi roster?", "Bagaimana klasemen dihitung?"],
    inputContract: "Pertanyaan teks + nama turnamen.",
    outputContract: "Informasi operasional; tidak membuat aturan kompetisi baru.",
  },
  "scout-assistant": {
    id: "scout-assistant",
    name: "Asisten Scout",
    description: "Membantu scout memakai filter penemuan pemain sesuai izin wali.",
    capabilities: ["Menjelaskan filter pencarian", "Menjelaskan batasan privasi"],
    allowedRoles: ["scout"],
    contextKeys: ["role", "currentPage"],
    suggestedQuestions: ["Mengapa saya tidak melihat semua pemain?", "Bagaimana memfilter berdasarkan posisi?"],
    inputContract: "Pertanyaan teks. Tidak pernah menerima data pemain privat.",
    outputContract: "Penjelasan teks; tidak mengungkap data di luar izin.",
  },
  "platform-support-assistant": {
    id: "platform-support-assistant",
    name: "Bantuan Platform",
    description: "Menjelaskan fitur platform dan membantu navigasi aplikasi.",
    capabilities: ["Menjelaskan fitur", "Membantu navigasi"],
    allowedRoles: ["player", "parent", "ssb", "tournament", "coach", "scout"],
    contextKeys: ["role", "currentPage"],
    suggestedQuestions: ["Apa itu platform ini?", "Siapa pemilik Football ID?", "Bagaimana data anak dilindungi?"],
    inputContract: "Pertanyaan teks + peran + halaman aktif.",
    outputContract: "Penjelasan teks umum.",
  },
};

export const DEFAULT_AGENT_BY_ROLE: Record<RoleId, AgentId> = {
  player: "player-development-assistant",
  parent: "parent-assistant",
  ssb: "ssb-management-assistant",
  tournament: "tournament-assistant",
  coach: "coach-assistant",
  scout: "scout-assistant",
};

export function agentsForRole(role: RoleId): AgentDefinition[] {
  return Object.values(AGENTS).filter((agent) => agent.allowedRoles.includes(role));
}
