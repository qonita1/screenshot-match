import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { platformApi } from "@/services";
import type { PlayerListParams } from "@/shared/contracts/api.contract";

export const ssbOverviewQuery = (orgId: string) =>
  queryOptions({ queryKey: ["ssb", orgId, "overview"], queryFn: () => platformApi.getSsbOverview(orgId) });

export const playersQuery = (orgId: string, params: PlayerListParams) =>
  queryOptions({
    queryKey: ["ssb", orgId, "players", params],
    queryFn: () => platformApi.listPlayers(orgId, params),
    placeholderData: keepPreviousData,
  });

export const teamsQuery = (orgId: string) =>
  queryOptions({ queryKey: ["ssb", orgId, "teams"], queryFn: () => platformApi.listTeams(orgId) });

export const trainingQuery = (orgId: string) =>
  queryOptions({ queryKey: ["ssb", orgId, "training"], queryFn: () => platformApi.listTrainingSessions(orgId) });

export const invoicesQuery = (orgId: string) =>
  queryOptions({ queryKey: ["ssb", orgId, "invoices"], queryFn: () => platformApi.listInvoices(orgId) });
