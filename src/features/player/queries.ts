import { queryOptions } from "@tanstack/react-query";

import { platformApi } from "@/services";

export const passportQuery = (playerId: string) =>
  queryOptions({ queryKey: ["player", playerId, "passport"], queryFn: () => platformApi.getPlayerPassport(playerId) });
