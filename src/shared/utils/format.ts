const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const currencyFmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatDay(iso: string): string {
  return dayFmt.format(new Date(iso));
}

export function formatCurrency(amount: number): string {
  return currencyFmt.format(amount);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Public scouting display name: first name + initial of last name. */
export function publicDisplayName(fullName: string): string {
  const [first, ...rest] = fullName.split(/\s+/);
  const last = rest.at(-1);
  return last ? `${first} ${last[0]}.` : (first ?? "");
}
