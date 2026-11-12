import { useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { breadcrumbsFor } from "@/shared/utils/role-path";

export function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const crumbs = breadcrumbsFor(pathname);
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />}
            {crumb.href ? (
              <a
                href={crumb.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (crumb.href) router.history.push(crumb.href);
                }}
                className="truncate text-muted-foreground hover:text-foreground"
              >
                {crumb.label}
              </a>
            ) : (
              <span aria-current="page" className="truncate font-semibold text-foreground">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
