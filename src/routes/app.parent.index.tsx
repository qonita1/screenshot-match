import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/dashboard/LoadingState";
import { ParentDashboard } from "@/features/parent/components/ParentDashboard";
import { parentOverviewQuery } from "@/features/parent/queries";
import { prototypeSession } from "@/services";
import { pageHead } from "@/shared/utils/seo";

export const Route = createFileRoute("/app/parent/")({
  head: () => pageHead("Dashboard Orang Tua", "Pantau anak, jadwal latihan, laga, pembayaran, dan laporan perkembangan."),
  loader: ({ context }) => context.queryClient.ensureQueryData(parentOverviewQuery(prototypeSession.guardianId)),
  pendingComponent: PageSkeleton,
  component: ParentPage,
});

function ParentPage() {
  const { data } = useSuspenseQuery(parentOverviewQuery(prototypeSession.guardianId));
  return <ParentDashboard overview={data} />;
}
