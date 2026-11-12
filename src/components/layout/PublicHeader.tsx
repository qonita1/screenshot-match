import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { href: "#ekosistem", label: "Ekosistem" },
  { href: "#football-id", label: "Football ID" },
  { href: "#fitur", label: "Fitur" },
  { href: "#privasi", label: "Privasi" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <BrandMark tone="inverse" />
        <nav aria-label="Navigasi utama" className="ml-6 hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-primary-foreground/75 hover:text-primary-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button asChild variant="inverse" size="sm">
            <Link to="/login">Masuk</Link>
          </Button>
          <Button asChild variant="lime" size="sm">
            <Link to="/register">Mulai Bergabung</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="inverse" size="icon" className="ml-auto md:hidden" aria-label="Buka menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle>Menu</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Navigasi seluler">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              <Button asChild variant="outline"><Link to="/login">Masuk</Link></Button>
              <Button asChild><Link to="/register">Mulai Bergabung</Link></Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
