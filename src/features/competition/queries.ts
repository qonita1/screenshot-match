import { queryOptions } from "@tanstack/react-query";

import { platformApi } from "@/services";

export const tournamentOverviewQuery = (id: string) =>
  queryOptions({ queryKey: ["tournament", id, "overview"], queryFn: () => platformApi.getTournamentOverview(id) });

export const registrationsQuery = (id: string) =>
  queryOptions({ queryKey: ["tournament", id, "registrations"], queryFn: () => platformApi.listRegistrations(id) });

export const tournamentMatchesQuery = (id: string) =>
  queryOptions({ queryKey: ["tournament", id, "matches"], queryFn: () => platformApi.listTournamentMatches(id) });

export const standingsQuery = (id: string) =>
  queryOptions({ queryKey: ["tournament", id, "standings"], queryFn: () => platformApi.listStandings(id) });

export const bracketQuery = (id: string) =>
  queryOptions({ queryKey: ["tournament", id, "bracket"], queryFn: () => platformApi.listBracket(id) });
