import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { platformApi } from "@/services";
import type { ScoutSearchParams } from "@/shared/contracts/api.contract";

export const scoutProfilesQuery = (params: ScoutSearchParams) =>
  queryOptions({ queryKey: ["scout", params], queryFn: () => platformApi.searchScoutProfiles(params), placeholderData: keepPreviousData });
