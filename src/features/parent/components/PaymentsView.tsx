import { CreditCard, Receipt } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INVOICE_STATUS_LABEL } from "@/shared/constants/labels";
import type { Invoice, InvoiceStatus } from "@/shared/types/domain";
import { formatCurrency, formatDate } from "@/shared/utils/format";

const TONE = { paid: "success", unpaid: "warning", overdue: "danger" } as const;
type Filter = "all" | InvoiceStatus;

/** Invoice list shared by parent (own children) and SSB finance. No real payment processing. */
export function InvoiceList({ invoices, allowPay }: { invoices: Invoice[]; allowPay?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [paying, setPaying] = useState<Invoice | null>(null);
  const rows = invoices.filter((i) => filter === "all" || i.status === filter);
  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="unpaid">Belum dibayar</TabsTrigger>
          <TabsTrigger value="overdue">Jatuh tempo</TabsTrigger>
          <TabsTrigger value="paid">Lunas</TabsTrigger>
        </TabsList>
      </Tabs>
      <DataTable
        rows={rows}
        rowKey={(r) => r.id}
        empty={<EmptyState icon={Receipt} title="Tidak ada tagihan" description="Tidak ada tagihan dengan status ini." />}
        columns={[
          { key: "id", header: "No. tagihan", cell: (r) => <span className="font-tabular text-xs">{r.id}</span> },
          { key: "player", header: "Pemain", cell: (r) => <span className="font-medium">{r.playerName}</span> },
          { key: "desc", header: "Keterangan", cell: (r) => r.description },
          { key: "due", header: "Jatuh tempo", cell: (r) => formatDate(r.dueDate) },
          { key: "amount", header: "Jumlah", className: "text-right", cell: (r) => <span className="font-tabular font-semibold">{formatCurrency(r.amount)}</span> },
          { key: "status", header: "Status", cell: (r) => <StatusBadge tone={TONE[r.status]}>{INVOICE_STATUS_LABEL[r.status]}</StatusBadge> },
          ...(allowPay
            ? [{ key: "act", header: "", className: "text-right", cell: (r: Invoice) => r.status !== "paid" && <Button size="sm" onClick={() => setPaying(r)}>Bayar</Button> }]
            : []),
        ]}
        mobileCard={(r) => (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{r.playerName}</p>
              <StatusBadge tone={TONE[r.status]}>{INVOICE_STATUS_LABEL[r.status]}</StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">{r.description}</p>
            <div className="flex items-center justify-between">
              <p className="font-tabular font-semibold">{formatCurrency(r.amount)}</p>
              {allowPay && r.status !== "paid" && <Button size="sm" onClick={() => setPaying(r)}>Bayar</Button>}
            </div>
            <p className="text-xs text-muted-foreground">{r.paidAt ? `Dibayar ${formatDate(r.paidAt)}` : `Jatuh tempo ${formatDate(r.dueDate)}`}</p>
          </div>
        )}
      />
      <Dialog open={!!paying} onOpenChange={(o) => !o && setPaying(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pembayaran belum tersedia</DialogTitle>
            <DialogDescription>
              Ini prototipe — integrasi pembayaran belum dihubungkan, sehingga tidak ada transaksi yang diproses.
            </DialogDescription>
          </DialogHeader>
          {paying && (
            <div className="rounded-lg border p-4 text-sm">
              <p className="font-semibold">{paying.description}</p>
              <p className="text-muted-foreground">{paying.playerName} · {paying.id}</p>
              <p className="mt-2 font-tabular text-xl font-semibold">{formatCurrency(paying.amount)}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaying(null)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function PaymentsView({ invoices }: { invoices: Invoice[] }) {
  const outstanding = invoices.filter((i) => i.status !== "paid");
  const paid = invoices.filter((i) => i.status === "paid");
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Orang tua / wali" title="Pembayaran" description="Tagihan dan riwayat pembayaran untuk semua anak Anda. Nominal adalah contoh." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Perlu dibayar" value={formatCurrency(outstanding.reduce((s, i) => s + i.amount, 0))} icon={CreditCard} hint={`${outstanding.length} tagihan`} />
        <StatCard label="Lewat jatuh tempo" value={invoices.filter((i) => i.status === "overdue").length} icon={Receipt} hint="Segera selesaikan" />
        <StatCard label="Sudah dibayar" value={formatCurrency(paid.reduce((s, i) => s + i.amount, 0))} icon={Receipt} hint={`${paid.length} transaksi`} />
      </div>
      <InvoiceList invoices={invoices} allowPay />
    </div>
  );
}
