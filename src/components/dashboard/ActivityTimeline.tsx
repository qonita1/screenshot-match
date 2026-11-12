import type { LucideIcon } from "lucide-react";
import { Circle } from "lucide-react";

import { formatDate } from "@/shared/utils/format";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  icon?: LucideIcon;
  highlight?: boolean;
}

export function ActivityTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-5 border-l border-border pl-6">
      {items.map(({ id, title, description, date, icon: Icon = Circle, highlight }) => (
        <li key={id} className="relative">
          <span
            className={`absolute -left-[37px] grid size-6 place-items-center rounded-full border-2 border-card ${
              highlight ? "bg-lime text-lime-foreground" : "bg-accent text-primary"
            }`}
          >
            <Icon className="size-3" aria-hidden />
          </span>
          <p className="text-xs font-medium text-muted-foreground">{formatDate(date)}</p>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </li>
      ))}
    </ol>
  );
}
