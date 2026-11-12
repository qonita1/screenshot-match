import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BadgeCheck, History, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ConsentControl } from "@/components/identity/ConsentControl";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { platformApi } from "@/services";
import { CONSENT_SCOPES, CONSENT_SCOPE_ORDER } from "@/shared/constants/labels";
import type { ParentOverview } from "@/shared/contracts/api.contract";
import type { ConsentScope } from "@/shared/types/domain";
import { formatDate } from "@/shared/utils/format";
import { consentHistoryQuery, consentsQuery } from "../queries";

interface Pending {
  scope: ConsentScope;
  granted: boolean;
}

function ChildConsents({ playerId, childName }: { playerId: string; childName: string }) {
  const qc = useQueryClient();
  const { data: consents } = useSuspenseQuery(consentsQuery(playerId));
  const { data: history } = useSuspenseQuery(consentHistoryQuery(playerId));
  const [pending, setPending] = useState<Pending | null>(null);

  const mutation = useMutation({
    mutationFn: ({ scope, granted }: Pending) => platformApi.updateConsent(playerId, scope, granted),
    onSuccess: (record) => {
      void qc.invalidateQueries({ queryKey: ["consents", playerId] });
      toast.success(record.granted ? "Izin diberikan" : "Izin dicabut", { description: CONSENT_SCOPES[record.scope].title });
    },
    onError: () => toast.error("Gagal menyimpan izin. Coba lagi."),
  });

  const ordered = CONSENT_SCOPE_ORDER.map((scope) => consents.find((c) => c.scope === scope) ?? { playerId, scope, granted: false });

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <SectionCard title={`Izin data ${childName}`} description="Izin sensitif tidak pernah aktif otomatis." contentClassName="divide-y py-0">
        {ordered.map((record) => (
          <ConsentControl
            key={record.scope}
            record={record}
            disabled={mutation.isPending}
            onChange={(granted) => setPending({ scope: record.scope, granted })}
          />
        ))}
      </SectionCard>
      <SectionCard title="Riwayat izin" contentClassName="py-1">
        {history.length ? (
          <ol className="divide-y">
            {history.map((e) => (
              <li key={e.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{CONSENT_SCOPES[e.scope].title}</p>
                  <StatusBadge tone={e.action === "granted" ? "success" : "neutral"}>{e.action === "granted" ? "Diberikan" : "Dicabut"}</StatusBadge>
                </div>
                <p className="text-xs text-muted-foreground">{e.actor} · {formatDate(e.at)}</p>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState icon={History} title="Belum ada perubahan izin" />
        )}
      </SectionCard>

      <AlertDialog open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          {pending && (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {pending.granted ? "Berikan izin" : "Cabut izin"}: {CONSENT_SCOPES[pending.scope].title}?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {pending.granted
                    ? `${CONSENT_SCOPES[pending.scope].description} Anda dapat mencabut izin ini kapan saja.`
                    : "Pihak terkait tidak lagi dapat mengakses data ini setelah izin dicabut."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              {pending.granted && CONSENT_SCOPES[pending.scope].sensitive && (
                <p className="flex gap-2 rounded-md bg-warning-soft p-3 text-sm text-warning-text">
                  <ShieldAlert className="size-4 shrink-0" /> Ini izin sensitif. Pastikan Anda memahami siapa yang dapat melihat data anak.
                </p>
              )}
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    mutation.mutate(pending);
                    setPending(null);
                  }}
                >
                  {pending.granted ? "Ya, izinkan" : "Ya, cabut"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export function ConsentManager({ overview }: { overview: ParentOverview }) {
  const [childId, setChildId] = useState(overview.children[0]?.player.id ?? "");
  const child = overview.children.find((c) => c.player.id === childId);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Privasi anak"
        title="Izin & Privasi"
        description="Anda yang menentukan data anak mana yang boleh dilihat SSB, turnamen, dan scout."
        actions={
          <StatusBadge tone="success">
            <BadgeCheck className="size-3.5" /> {overview.guardian.relationship} · terverifikasi
          </StatusBadge>
        }
      />
      <Tabs value={childId} onValueChange={setChildId}>
        <TabsList>
          {overview.children.map((c) => (
            <TabsTrigger key={c.player.id} value={c.player.id}>{c.player.fullName}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {child && <ChildConsents key={child.player.id} playerId={child.player.id} childName={child.player.fullName.split(" ")[0] ?? ""} />}
      <p className="text-xs text-muted-foreground">
        Catatan: tampilan ini bukan pengaman data. Di versi produksi, setiap izin divalidasi oleh server sebelum data dibagikan.
      </p>
    </div>
  );
}
