import { BrandMark } from "@/components/layout/BrandMark";

export function PublicFooter() {
  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <BrandMark tone="inverse" />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/65">
            The Digital Infrastructure for Grassroots Football. Satu identitas, satu perjalanan, satu ekosistem sepak bola Indonesia.
          </p>
        </div>
        <div>
          <p className="eyebrow text-lime">Ekosistem</p>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li>Pemain & Orang Tua</li>
            <li>SSB & Klub</li>
            <li>Kompetisi</li>
            <li>Pelatih, Wasit & Scout</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-lime">Prinsip</p>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li>Pemain memiliki perjalanannya</li>
            <li>Izin wali untuk anak</li>
            <li>API-first & terbuka</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/50 sm:px-6 lg:px-8">
          © 2026 Platform Ekosistem Sepak Bola Usia Dini · Prototipe — data contoh.
        </p>
      </div>
    </footer>
  );
}
