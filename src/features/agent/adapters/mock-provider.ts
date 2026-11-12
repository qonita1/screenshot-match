/**
 * MockAIProvider — NOT a real AI model. Returns canned, rule-based answers so the
 * Copilot UI can be designed and tested. Replace with a provider that calls a
 * server function; never call an AI vendor directly from the browser.
 */
import type { AIProvider, AgentRequest, AgentResponse } from "@/shared/contracts/agent.contract";

const ANSWERS: Array<{ match: RegExp; answer: string }> = [
  { match: /football id/i, answer: "Football ID adalah identitas sepak bola permanen milik pemain (contoh: IDN-FB-2016-000123). SSB, klub, dan turnamen hanya terhubung lewat relasi — mereka tidak memiliki ID tersebut, dan riwayat tetap ikut saat pemain pindah." },
  { match: /scout|pemandu/i, answer: "Profil anak hanya terlihat oleh scout jika wali mengaktifkan izin 'Terlihat oleh pemandu bakat'. Izin ini mati secara bawaan, dan scout hanya melihat data terbatas: posisi, tahun lahir, dan wilayah." },
  { match: /bayar|iuran|tagihan/i, answer: "Tagihan tampil di menu Pembayaran beserta status Lunas / Belum dibayar / Jatuh tempo. Di prototipe ini tidak ada transaksi nyata — integrasi pembayaran belum dihubungkan." },
  { match: /daftar|registrasi/i, answer: "Buka menu Pemain lalu pilih 'Daftarkan Pemain'. Isi data dasar dan wali; pemain baru mendapat Football ID berstatus menunggu verifikasi, dan semua izin data dimulai dalam keadaan mati." },
  { match: /klasemen|poin/i, answer: "Klasemen di prototipe ini memakai hitungan contoh (menang 3, seri 1). Aturan resmi kompetisi belum dikonfirmasi dan harus ditetapkan penyelenggara." },
  { match: /latihan|jadwal/i, answer: "Jadwal latihan dan laga ada di dashboard Anda. Untuk SSB, menu Latihan menampilkan kalender sesi dan kehadiran per sesi." },
];

export class MockAIProvider implements AIProvider {
  readonly id = "mock";
  readonly isLive = false;

  async generateResponse(request: AgentRequest): Promise<AgentResponse> {
    await new Promise((r) => setTimeout(r, 650));
    if (/gagal|error/i.test(request.message)) {
      return { success: false, message: "", error: "Simulasi kesalahan dari layanan asisten." };
    }
    const hit = ANSWERS.find((a) => a.match.test(request.message));
    return {
      success: true,
      message:
        hit?.answer ??
        "Ini jawaban contoh dari asisten prototipe. Model AI sungguhan belum dihubungkan — setelah terhubung, jawaban akan disesuaikan dengan peran dan halaman Anda tanpa melewati izin akses.",
      data: { provider: this.id },
    };
  }
}
