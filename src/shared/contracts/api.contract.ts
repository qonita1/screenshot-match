/**
 * PlatformApi — the stable service boundary between UI and data.
 * UI and feature hooks depend on this interface only. Today it is implemented by
 * src/services/mock; a real implementation (server functions / HTTP) must keep the
 * same shape. Authorization is the backend's job — never rely on the UI to hide data.
 */
import type {
  ActivityItem,
  Achievement,
  AppNotification,
  AttendanceTrendPoint,
  BracketMatch,
  Certificate,
  Coach,
  ConsentEvent,
  ConsentRecord,
  ConsentScope,
  DevelopmentNote,
  Guardian,
  Invoice,
  JourneyEvent,
  Match,
  Organization,
  OrganizationRelationship,
  Paginated,
  Player,
  Position,
  RoleId,
  ScoutPlayerProfile,
  Standing,
  Team,
  TeamRegistration,
  Tournament,
  TrainingSession,
} from "@/shared/types/domain";

export interface PlayerListParams {
  search?: string;
  teamId?: string;
  page?: number;
  pageSize?: number;
}

export interface RegisterPlayerInput {
  fullName: string;
  birthYear: number;
  gender: Player["gender"];
  position: Position;
  preferredFoot: Player["preferredFoot"];
  teamId: string;
  guardianName: string;
  guardianPhone: string;
}

export interface PlayerPassport {
  player: Player;
  organization?: Organization;
  team?: Team;
  relationships: OrganizationRelationship[];
  journey: JourneyEvent[];
  matches: Match[];
  achievements: Achievement[];
  certificates: Certificate[];
  development: DevelopmentNote[];
  upcomingTraining: TrainingSession[];
  attendanceTrend: AttendanceTrendPoint[];
}

export interface ParentOverview {
  guardian: Guardian;
  children: Array<{ player: Player; teamName?: string; organizationName?: string; attendanceRate: number }>;
  upcomingTraining: Array<TrainingSession & { playerName: string; teamName: string }>;
  upcomingMatches: Match[];
  invoices: Invoice[];
  development: Array<DevelopmentNote & { playerName: string }>;
}

export interface SsbOverview {
  organization: Organization;
  totals: { players: number; activeTeams: number; coaches: number; outstandingAmount: number; outstandingCount: number };
  upcomingTraining: Array<TrainingSession & { teamName: string }>;
  upcomingMatches: Match[];
  attendanceTrend: AttendanceTrendPoint[];
  activities: ActivityItem[];
}

export interface TeamWithDetails extends Team {
  coaches: Coach[];
  players: Player[];
}

export interface TournamentOverview {
  tournament: Tournament;
  totals: { teams: number; players: number; categories: number; upcomingMatches: number; completedMatches: number; pendingRegistrations: number };
  upcomingMatches: Match[];
  recentResults: Match[];
}

export interface ScoutSearchParams {
  position?: Position;
  birthYear?: number;
  province?: string;
}

export interface PlatformApi {
  getPlayerPassport(playerId: string): Promise<PlayerPassport>;
  listPlayers(organizationId: string, params: PlayerListParams): Promise<Paginated<Player & { teamName?: string }>>;
  registerPlayer(organizationId: string, input: RegisterPlayerInput): Promise<Player>;

  getParentOverview(guardianId: string): Promise<ParentOverview>;
  listConsents(playerId: string): Promise<ConsentRecord[]>;
  updateConsent(playerId: string, scope: ConsentScope, granted: boolean): Promise<ConsentRecord>;
  listConsentHistory(playerId: string): Promise<ConsentEvent[]>;

  getSsbOverview(organizationId: string): Promise<SsbOverview>;
  listTeams(organizationId: string): Promise<TeamWithDetails[]>;
  listTrainingSessions(organizationId: string): Promise<Array<TrainingSession & { teamName: string }>>;
  listInvoices(organizationId: string): Promise<Invoice[]>;

  getTournamentOverview(tournamentId: string): Promise<TournamentOverview>;
  listRegistrations(tournamentId: string): Promise<TeamRegistration[]>;
  updateRegistrationStatus(registrationId: string, status: TeamRegistration["status"]): Promise<TeamRegistration>;
  listTournamentMatches(tournamentId: string): Promise<Match[]>;
  listStandings(tournamentId: string): Promise<Standing[]>;
  listBracket(tournamentId: string): Promise<BracketMatch[]>;

  searchScoutProfiles(params: ScoutSearchParams): Promise<ScoutPlayerProfile[]>;
  listNotifications(role: RoleId): Promise<AppNotification[]>;
}
