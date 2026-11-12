import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/hero-grassroots-football.jpg";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-primary-deep text-primary-foreground">
      <img
        src={heroImage}
        alt="Anak-anak bermain sepak bola di lapangan rumput Makassar saat senja"
        width={1600}
        height={1104}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-deep via-primary-deep/85 to-primary-deep/20" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-primary-deep to-transparent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 sm:pt-44 lg:px-8 lg:pb-32">
        <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-lime">
          <span className="size-1.5 rounded-full bg-lime" aria-hidden /> The Digital Infrastructure for Grassroots Football
        </p>
        <h1 className="text-display mt-6 max-w-3xl">
          One Identity.
          <br />
          One Journey.
          <br />
          <span className="text-lime">One Football Ecosystem.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
          Platform digital yang menghubungkan pemain, orang tua, SSB, kompetisi, dan seluruh ekosistem sepak bola usia dini Indonesia.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="lime" size="xl">
            <Link to="/register">
              Mulai Bergabung <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="inverse" size="xl">
            <a href="#ekosistem">Jelajahi Ekosistem</a>
          </Button>
        </div>
        <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-primary-foreground/15 pt-6">
          {[
            ["1", "Football ID seumur hidup"],
            ["11", "Pemangku kepentingan terhubung"],
            ["0", "Izin sensitif aktif tanpa persetujuan"],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-tabular text-3xl font-semibold text-lime">{v}</dd>
              <p className="mt-1 text-xs text-primary-foreground/65">{l}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
