import { CONSENT_SCOPE_ORDER } from "@/shared/constants/labels";
import type { ConsentRecord, ConsentScope, Player, ScoutPlayerProfile } from "@/shared/types/domain";
import { publicDisplayName } from "@/shared/utils/format";

/** New players start with every permission OFF. Guardians must opt in explicitly. */
export function defaultConsents(playerId: string): ConsentRecord[] {
  return CONSENT_SCOPE_ORDER.map((scope) => ({ playerId, scope, granted: false }));
}

export function hasConsent(consents: ConsentRecord[], playerId: string, scope: ConsentScope): boolean {
  return consents.some((c) => c.playerId === playerId && c.scope === scope && c.granted);
}

/**
 * Builds the public scouting view. Only players whose guardian granted
 * `scouting_visibility` are included, and only non-sensitive fields are exposed.
 * Prototype rule — the backend must enforce the same filter.
 */
export function toScoutProfiles(
  players: Player[],
  consents: ConsentRecord[],
  matchesPlayed: (playerId: string) => number,
): ScoutPlayerProfile[] {
  return players
    .filter((p) => hasConsent(consents, p.id, "scouting_visibility"))
    .map((p) => {
      const played = matchesPlayed(p.id);
      return {
        publicId: p.footballId.value,
        displayName: publicDisplayName(p.fullName),
        birthYear: p.birthYear,
        position: p.position,
        city: p.city,
        province: p.province,
        matchesPlayed: played,
        trend: played >= 6 ? "rising" : "stable",
      };
    });
}
