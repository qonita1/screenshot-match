import { Lock } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { CONSENT_SCOPES } from "@/shared/constants/labels";
import type { ConsentRecord } from "@/shared/types/domain";
import { formatDate } from "@/shared/utils/format";

interface ConsentControlProps {
  record: ConsentRecord;
  disabled?: boolean;
  onChange: (granted: boolean) => void;
}

export function ConsentControl({ record, disabled, onChange }: ConsentControlProps) {
  const meta = CONSENT_SCOPES[record.scope];
  const id = `consent-${record.playerId}-${record.scope}`;
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {meta.title}
          {meta.sensitive && (
            <span className="inline-flex items-center gap-1 rounded bg-warning-soft px-1.5 py-0.5 text-[10px] font-semibold text-warning-text">
              <Lock className="size-3" aria-hidden /> Sensitif
            </span>
          )}
        </label>
        <p className="mt-0.5 text-sm text-muted-foreground">{meta.description}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {record.granted ? "Diizinkan" : "Tidak diizinkan"}
          {record.updatedAt && ` · diperbarui ${formatDate(record.updatedAt)}`}
        </p>
      </div>
      <Switch id={id} checked={record.granted} disabled={disabled} onCheckedChange={onChange} />
    </div>
  );
}
