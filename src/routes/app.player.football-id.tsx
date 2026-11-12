import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/dashboard/LoadingState";
import { FootballIdView } from "@/features/player/components/FootballIdView";
import { passportQuery } from "@/features/player/queries";
import { prototypeSession } from "@/services";
import { pageHead } from "@/shared/utils/seo";

export const Route = createFileRoute("/app/player/football-id")({
  head: () => pageHead("Football ID", "Identitas sepak bola permanen milik pemain dan riwayat relasi organisasi."),
  loader: ({ context }) => context.queryClient.ensureQueryData(passportQuery(prototypeSession.playerId)),
  pendingComponent: PageSkeleton,
  component: () => {
    const { data } = useSuspenseQuery(passportQuery(prototypeSession.playerId));
    return <FootballIdView passport={data} />;
  },
});
