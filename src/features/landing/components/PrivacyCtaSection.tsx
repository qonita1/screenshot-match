import { Link } from "@tanstack/react-router";
import { ArrowRight, EyeOff, ShieldCheck, ToggleLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

const PRIVACY = [
  { icon: ShieldCheck, title: "Wali yang memutuskan", text: "Data anak dibagikan hanya dengan persetujuan orang tua atau wali yang terverifikasi." },
  { icon: ToggleLeft, title: "Mati secara bawaan", text: "Izin sensitif seperti publikasi foto dan visibilitas scout tidak pernah aktif otomatis." },
  { icon: EyeOff, title: "Data sensitif tersembunyi", text: "Informasi medis dan pribadi tidak tampil di dashboard biasa." },
];

export function PrivacyCtaSection() {
  return (
    <>
      <section id="privasi" className="scroll-mt-8 border-t bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-pitch">Privasi anak</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Dibangun untuk anak-anak, dengan izin orang tua.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PRIVACY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border p-6">
                <Icon className="size-6 text-primary" aria-hidden />
                <p className="mt-4 font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-identity px-6 py-14 text-center text-primary-foreground sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-pitch-lines" aria-hidden />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Mulai perjalanan sepak bola digital Anda.
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-primary-foreground/75">
              Daftar sebagai pemain, orang tua, SSB, atau penyelenggara turnamen.
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="lime" size="xl">
                <Link to="/register">Mulai Bergabung <ArrowRight /></Link>
              </Button>
              <Button asChild variant="inverse" size="xl">
                <Link to="/select-role">Coba prototipe dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
