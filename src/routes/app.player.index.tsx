import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/dashboard/LoadingState";
import { PlayerDashboard } from "@/features/player/components/PlayerDashboard";
import { passportQuery } from "@/features/player/queries";
import { prototypeSession } from "@/services";
import { pageHead } from "@/shared/utils/seo";

export const Route = createFileRoute("/app/player/")({
  head: () => pageHead("Dashboard Pemain", "Football ID, perjalanan, jadwal latihan, laga, dan prestasi pemain."),
  loader: ({ context }) => context.queryClient.ensureQueryData(passportQuery(prototypeSession.playerId)),
  pendingComponent: PageSkeleton,
  component: () => {
    const { data } = useSuspenseQuery(passportQuery(prototypeSession.playerId));
    return <PlayerDashboard passport={data} />;
  },
});
