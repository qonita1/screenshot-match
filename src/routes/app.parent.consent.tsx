import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/dashboard/LoadingState";
import { ConsentManager } from "@/features/parent/components/ConsentManager";
import { consentHistoryQuery, consentsQuery, parentOverviewQuery } from "@/features/parent/queries";
import { prototypeSession } from "@/services";
import { pageHead } from "@/shared/utils/seo";

export const Route = createFileRoute("/app/parent/consent")({
  head: () => pageHead("Izin & Privasi", "Kelola izin berbagi data anak, izin scouting, dan riwayat persetujuan."),
  loader: async ({ context }) => {
    const overview = await context.queryClient.ensureQueryData(parentOverviewQuery(prototypeSession.guardianId));
    await Promise.all(
      overview.children.flatMap((c) => [
        context.queryClient.ensureQueryData(consentsQuery(c.player.id)),
        context.queryClient.ensureQueryData(consentHistoryQuery(c.player.id)),
      ]),
    );
  },
  pendingComponent: PageSkeleton,
  component: ConsentPage,
});

function ConsentPage() {
  const { data } = useSuspenseQuery(parentOverviewQuery(prototypeSession.guardianId));
  return <ConsentManager overview={data} />;
}
