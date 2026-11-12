import { queryOptions } from "@tanstack/react-query";

import { platformApi } from "@/services";

export const parentOverviewQuery = (guardianId: string) =>
  queryOptions({ queryKey: ["parent", guardianId, "overview"], queryFn: () => platformApi.getParentOverview(guardianId) });

export const consentsQuery = (playerId: string) =>
  queryOptions({ queryKey: ["consents", playerId], queryFn: () => platformApi.listConsents(playerId) });

export const consentHistoryQuery = (playerId: string) =>
  queryOptions({ queryKey: ["consents", playerId, "history"], queryFn: () => platformApi.listConsentHistory(playerId) });
