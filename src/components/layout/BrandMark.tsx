import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

/** Product wordmark. `tone="inverse"` for dark surfaces. */
export function BrandMark({ tone = "default", className }: { tone?: "default" | "inverse"; className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5 rounded-md", className)} aria-label="Beranda Ekosistem Sepak Bola">
      <span className="relative grid size-8 place-items-center rounded-md bg-lime text-lime-foreground">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h4M17 12h4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={cn("block text-sm font-extrabold tracking-tight", tone === "inverse" ? "text-primary-foreground" : "text-foreground")}>
          Satu Bola
        </span>
        <span className={cn("block text-[10px] font-medium", tone === "inverse" ? "text-primary-foreground/60" : "text-muted-foreground")}>
          Ekosistem Sepak Bola Usia Dini
        </span>
      </span>
    </Link>
  );
}
