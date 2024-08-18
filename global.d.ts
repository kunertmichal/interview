import { Database, Tables } from '@/shared/types/database';

declare global {
  type DB = Database;
  type TProfile = Tables<'profiles'>;
  type TOrganization = Tables<'organizations'>;
  type TNotification = Tables<'notifications'>;
  type TTeam = Tables<'teams'>;
  type TTeamMember = Tables<'team_members'>;
}
