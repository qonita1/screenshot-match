/**
 * Domain types shared by every feature. One definition per concept.
 * Changing a type here affects services, mocks and UI — review dependencies first.
 */

export type RoleId = "player" | "parent" | "ssb" | "tournament" | "coach" | "scout";
/** Stakeholders in the architecture that do not have modules yet. */
export type FutureRoleId = "referee" | "academy" | "association" | "federation";

export type Position = "GK" | "DF" | "MF" | "FW";
export type PreferredFoot = "right" | "left" | "both";
export type Gender = "male" | "female";

/** A persistent identity owned by the player — never an organisation membership number. */
export interface FootballId {
  value: string;
  issuedAt: string;
  status: "active" | "pending_verification";
}

export interface Player {
  id: string;
  footballId: FootballId;
  fullName: string;
  birthYear: number;
  gender: Gender;
  position: Position;
  preferredFoot: PreferredFoot;
  city: string;
  province: string;
  currentOrganizationId?: string;
  currentTeamId?: string;
  guardianIds: string[];
  identityVerified: boolean;
}

export type OrganizationType = "ssb" | "club" | "academy";

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  city: string;
  province: string;
  foundedYear: number;
  verified: boolean;
}

export type RelationshipStatus = "active" | "ended" | "pending";

/** Organisations connect to players through relationships; they never own the Football ID. */
export interface OrganizationRelationship {
  id: string;
  playerId: string;
  organizationId: string;
  organizationName: string;
  teamName?: string;
  status: RelationshipStatus;
  startDate: string;
  endDate?: string;
}

export interface Team {
  id: string;
  organizationId: string;
  name: string;
  ageCategory: string;
  coachIds: string[];
  playerIds: string[];
  trainingDays: string;
}

export interface Coach {
  id: string;
  name: string;
  license?: string;
  organizationId: string;
  teamIds: string[];
}

export type SessionStatus = "scheduled" | "completed" | "cancelled";

export interface TrainingSession {
  id: string;
  teamId: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  focus: string;
  status: SessionStatus;
}

export type AttendanceStatus = "present" | "late" | "excused" | "absent";

export interface AttendanceRecord {
  sessionId: string;
  playerId: string;
  status: AttendanceStatus;
}

export type MatchStatus = "scheduled" | "live" | "completed";

export interface Match {
  id: string;
  tournamentId?: string;
  category: string;
  stage: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: MatchStatus;
}

export type TournamentStatus = "draft" | "registration" | "ongoing" | "completed";

export interface Tournament {
  id: string;
  name: string;
  organizer: string;
  city: string;
  province: string;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  categories: string[];
}

export type RegistrationStatus = "pending" | "verified" | "needs_revision";

export interface TeamRegistration {
  id: string;
  tournamentId: string;
  category: string;
  teamName: string;
  organizationName: string;
  playerCount: number;
  status: RegistrationStatus;
  submittedAt: string;
  group?: string;
}

export interface Standing {
  group: string;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface BracketMatch {
  id: string;
  round: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
}

export type InvoiceStatus = "paid" | "unpaid" | "overdue";

export interface Invoice {
  id: string;
  playerId: string;
  playerName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
  paidAt?: string;
}

export type GuardianVerification = "verified" | "pending" | "unverified";

export interface Guardian {
  id: string;
  name: string;
  relationship: "Ayah" | "Ibu" | "Wali";
  maskedPhone: string;
  verification: GuardianVerification;
  childIds: string[];
}

export type ConsentScope =
  | "share_with_organization"
  | "competition_participation"
  | "photo_publication"
  | "development_reports"
  | "scouting_visibility";

export interface ConsentRecord {
  playerId: string;
  scope: ConsentScope;
  granted: boolean;
  updatedAt?: string;
}

export interface ConsentEvent {
  id: string;
  playerId: string;
  scope: ConsentScope;
  action: "granted" | "revoked";
  actor: string;
  at: string;
}

export interface Achievement {
  id: string;
  playerId: string;
  title: string;
  event: string;
  date: string;
  kind: "trophy" | "award" | "milestone";
}

export interface Certificate {
  id: string;
  playerId: string;
  title: string;
  issuer: string;
  issuedAt: string;
}

export type JourneyKind = "identity" | "organization" | "competition" | "achievement" | "development";

export interface JourneyEvent {
  id: string;
  playerId: string;
  date: string;
  title: string;
  description: string;
  kind: JourneyKind;
}

export interface DevelopmentNote {
  id: string;
  playerId: string;
  date: string;
  title: string;
  note: string;
  coach: string;
}

/** Example monthly attendance rate. Assessment methodology is NOT defined yet. */
export interface AttendanceTrendPoint {
  month: string;
  rate: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  role: RoleId | "all";
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  at: string;
}

/** Public scouting view: only non-sensitive fields, only with guardian scouting consent. */
export interface ScoutPlayerProfile {
  publicId: string;
  displayName: string;
  birthYear: number;
  position: Position;
  city: string;
  province: string;
  matchesPlayed: number;
  trend: "rising" | "stable";
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
