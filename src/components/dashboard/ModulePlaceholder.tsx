import { Construction } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import type { SectionMeta } from "@/shared/constants/navigation";

/** Clearly labeled placeholder for modules that are in navigation but not built yet. */
export function ModulePlaceholder({ meta }: { meta: SectionMeta }) {
  return (
    <div className="space-y-6">
      <PageHeader title={meta.title} description={meta.description} />
      <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-warning-soft text-warning-text">
          <Construction className="size-5" aria-hidden />
        </span>
        <div>
          <p className="eyebrow text-warning-text">Modul belum dibangun di fase ini</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Struktur navigasi sudah disiapkan. Fitur berikut direncanakan dan menunggu konfirmasi aturan bisnis:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-foreground">
            {meta.planned.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-pitch" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
