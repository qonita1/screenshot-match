import { Building2, HeartHandshake, Trophy, UserRound, type LucideIcon } from "lucide-react";

const GROUPS: Array<{ icon: LucideIcon; who: string; title: string; items: string[] }> = [
  { icon: UserRound, who: "Untuk Pemain", title: "Paspor sepak bola digital", items: ["Football ID & profil", "Riwayat laga & prestasi", "Jadwal latihan", "Sertifikat"] },
  { icon: HeartHandshake, who: "Untuk Orang Tua", title: "Tenang & transparan", items: ["Jadwal & kehadiran anak", "Tagihan & riwayat bayar", "Laporan perkembangan", "Kendali izin data"] },
  { icon: Building2, who: "Untuk SSB", title: "Sistem operasi SSB", items: ["Registrasi pemain", "Tim & pelatih", "Latihan & absensi", "Iuran & tagihan"] },
  { icon: Trophy, who: "Untuk Kompetisi", title: "Turnamen tanpa kertas", items: ["Pendaftaran tim", "Verifikasi roster via Football ID", "Jadwal & hasil", "Klasemen & bagan"] },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="scroll-mt-8 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-pitch">Fitur</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Pengalaman berbeda untuk setiap peran.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map(({ icon: Icon, who, title, items }) => (
            <article key={who} className="bg-card p-6">
              <Icon className="size-6 text-pitch" aria-hidden />
              <p className="eyebrow mt-5 text-muted-foreground">{who}</p>
              <h3 className="mt-1 text-lg font-bold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-pitch" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
