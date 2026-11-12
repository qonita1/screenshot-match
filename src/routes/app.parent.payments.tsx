import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/dashboard/LoadingState";
import { PaymentsView } from "@/features/parent/components/PaymentsView";
import { parentOverviewQuery } from "@/features/parent/queries";
import { prototypeSession } from "@/services";
import { pageHead } from "@/shared/utils/seo";

export const Route = createFileRoute("/app/parent/payments")({
  head: () => pageHead("Pembayaran", "Tagihan, status pembayaran, dan riwayat pembayaran iuran anak."),
  loader: ({ context }) => context.queryClient.ensureQueryData(parentOverviewQuery(prototypeSession.guardianId)),
  pendingComponent: PageSkeleton,
  component: PaymentsPage,
});

function PaymentsPage() {
  const { data } = useSuspenseQuery(parentOverviewQuery(prototypeSession.guardianId));
  return <PaymentsView invoices={data.invoices} />;
}
