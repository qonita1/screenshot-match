import { ArrowLeftRight, Fingerprint, History } from "lucide-react";

import { FootballIdCard } from "@/components/identity/FootballIdCard";
import type { Player } from "@/shared/types/domain";

const SAMPLE: Player = {
  id: "sample",
  footballId: { value: "IDN-FB-2016-000123", issuedAt: "2022-07-18", status: "active" },
  fullName: "Rizky Pratama",
  birthYear: 2016,
  gender: "male",
  position: "FW",
  preferredFoot: "right",
  city: "Makassar",
  province: "Sulawesi Selatan",
  guardianIds: [],
  identityVerified: true,
};

const POINTS = [
  { icon: Fingerprint, title: "Milik pemain", text: "Football ID melekat pada pemain, bukan nomor anggota SSB." },
  { icon: ArrowLeftRight, title: "Ikut saat pindah", text: "SSB dan klub terhubung melalui relasi. Saat pemain pindah, relasi berakhir — identitas tetap." },
  { icon: History, title: "Riwayat utuh", text: "Turnamen, prestasi, dan catatan perkembangan terkumpul dalam satu perjalanan." },
];

export function FootballIdSection() {
  return (
    <section id="football-id" className="scroll-mt-8 border-y bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1">
          <FootballIdCard player={SAMPLE} organizationName="SSB Makassar United" teamName="U10" className="mx-auto max-w-md rotate-[-1.5deg]" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow text-pitch">Football ID</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">The player owns the journey.</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Setiap pemain mendapat satu identitas sepak bola permanen yang menghubungkan seluruh perjalanannya.
          </p>
          <ul className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-lime text-lime-foreground">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
