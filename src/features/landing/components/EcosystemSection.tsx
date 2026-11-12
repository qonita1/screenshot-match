const CHAIN = ["Pemain", "Orang Tua", "SSB", "Pelatih", "Wasit", "Kompetisi", "Scout", "Klub", "Akademi", "Asosiasi", "Federasi"];

export function EcosystemSection() {
  return (
    <section id="ekosistem" className="scroll-mt-8 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow text-pitch">Ekosistem</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Satu perjalanan, dari lapangan kampung hingga federasi.
            </h2>
          </div>
          <p className="text-base text-muted-foreground">
            Hari ini data pemain tersebar di buku catatan SSB, grup WhatsApp, dan formulir turnamen. Platform ini menyatukannya dalam
            satu infrastruktur — tanpa mengambil kepemilikan data dari pemain.
          </p>
        </div>
        <ol className="mt-12 flex flex-wrap items-center gap-2" aria-label="Rantai ekosistem sepak bola">
          {CHAIN.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  i === 0 ? "border-transparent bg-primary text-primary-foreground" : i < 3 ? "border-pitch/40 bg-success-soft text-success-text" : "bg-card text-foreground"
                }`}
              >
                {s}
              </span>
              {i < CHAIN.length - 1 && <span className="h-px w-4 bg-border" aria-hidden />}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-muted-foreground">Fase awal (MVP 1): Pemain, Orang Tua, SSB, dan Kompetisi. Peran lain disiapkan dalam arsitektur.</p>
      </div>
    </section>
  );
}
