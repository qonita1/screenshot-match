import { ROLES, isRoleId } from "@/shared/constants/roles";
import { NAV } from "@/shared/constants/navigation";
import type { RoleId } from "@/shared/types/domain";

/** Reads the active dashboard role from an /app/<role>/... pathname. */
export function roleFromPath(pathname: string): RoleId {
  const segment = pathname.split("/")[2] ?? "";
  return isRoleId(segment) ? segment : "player";
}

export interface Crumb {
  label: string;
  href?: string;
}

function hrefOf(item: { to: string; params?: Record<string, string> }): string {
  return item.to.replace(/\$(\w+)/g, (_, key: string) => item.params?.[key] ?? key);
}

/** Breadcrumbs derived from the role navigation config (single source of labels). */
export function breadcrumbsFor(pathname: string, extraLabel?: string): Crumb[] {
  const role = roleFromPath(pathname);
  const items = NAV[role] as ReadonlyArray<{ label: string; to: string; params?: Record<string, string> }>;
  const home = hrefOf(items[0]);
  const crumbs: Crumb[] = [{ label: ROLES[role].shortLabel, href: home }];
  const clean = pathname.replace(/\/$/, "");
  const match = [...items]
    .filter((item) => item !== items[0])
    .find((item) => clean === hrefOf(item) || clean.startsWith(`${hrefOf(item)}/`));
  if (match) crumbs.push({ label: match.label, href: hrefOf(match) });
  if (match && clean !== hrefOf(match)) crumbs.push({ label: extraLabel ?? "Detail" });
  if (!match && clean !== home) crumbs.push({ label: extraLabel ?? "Halaman" });
  return crumbs.map((c, i) => (i === crumbs.length - 1 ? { label: c.label } : c));
}
