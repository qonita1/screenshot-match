/**
 * Service entry point. UI imports `platformApi` from here only.
 * Swap the implementation (e.g. a server-function or HTTP client implementing PlatformApi)
 * without touching any component.
 */
import type { PlatformApi } from "@/shared/contracts/api.contract";
import { mockPlatformApi } from "./mock/mock-platform-api";
import {
  CURRENT_GUARDIAN_ID,
  CURRENT_ORGANIZATION_ID,
  CURRENT_PLAYER_ID,
  CURRENT_TOURNAMENT_ID,
} from "./mock/mock-data";

export const platformApi: PlatformApi = mockPlatformApi;

/** Whether data comes from mock services. Drives the "Mode Prototipe" label. */
export const IS_PROTOTYPE = true;

/** Prototype session context. Replace with the authenticated user's context. */
export const prototypeSession = {
  playerId: CURRENT_PLAYER_ID,
  guardianId: CURRENT_GUARDIAN_ID,
  organizationId: CURRENT_ORGANIZATION_ID,
  tournamentId: CURRENT_TOURNAMENT_ID,
} as const;
