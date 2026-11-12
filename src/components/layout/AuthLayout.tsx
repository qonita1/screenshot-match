import { FlaskConical } from "lucide-react";
import type { ReactNode } from "react";

import { BrandMark } from "@/components/layout/BrandMark";

interface AuthLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}

/** Split auth layout: brand panel (desktop) + focused form column. */
export function AuthLayout({ title, description, children, footer, wide }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside className="relative hidden overflow-hidden bg-identity p-10 text-primary-foreground lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 bg-pitch-lines" aria-hidden />
        <BrandMark tone="inverse" className="relative" />
        <div className="relative mt-auto">
          <p className="eyebrow text-lime">Football ID</p>
          <p className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">
            One Identity.<br />One Journey.<br />One Football Ecosystem.
          </p>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Riwayat sepak bola anak tetap tersimpan dan menjadi milik pemain — di SSB mana pun ia bermain.
          </p>
        </div>
      </aside>
      <main className="flex flex-col px-4 py-8 sm:px-8">
        <div className="lg:hidden">
          <div className="inline-flex rounded-md bg-primary p-2"><BrandMark tone="inverse" /></div>
        </div>
        <div className={`mx-auto my-auto w-full py-10 ${wide ? "max-w-3xl" : "max-w-md"}`}>
          <p className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-1 text-xs font-semibold text-warning-text">
            <FlaskConical className="size-3.5" aria-hidden /> Mode Prototipe — autentikasi belum terhubung
          </p>
          <h1 className="text-title text-foreground">{title}</h1>
          {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
