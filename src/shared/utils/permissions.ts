import { logger } from './logger';
import { createClient } from './supabase/server';

export async function getRolesByUserId(userId: string) {
  const supabase = createClient();

  const rolesRaw = await supabase
    .from('profiles_to_roles')
    .select('roles(id, name)')
    .eq('profile_id', userId);

  if (rolesRaw.error) {
    logger.error(rolesRaw.error);
    return [];
  }

  const roles = rolesRaw.data
    .map((role) => role.roles)
    .filter((role) => !!role);

  return roles;
}

export async function getPermissionsByUserId(userId: string) {
  const supabase = createClient();

  const permissionsRaw = await supabase
    .from('profiles_to_roles')
    .select(
      `
      roles (
        id,
        name,
        roles_to_permissions (
          permissions (
            action,
            entity,
            access
          )
        )
      )
    `
    )
    .eq('profile_id', userId);

  if (permissionsRaw.error) {
    logger.error(permissionsRaw.error);
    return [];
  }

  const permissions = permissionsRaw.data
    .flatMap((role) => role.roles?.roles_to_permissions || [])
    .flatMap((rtp) => rtp.permissions)
    .filter((permission) => !!permission)
    .map(
      (permission) =>
        `${permission.action}:${permission.entity}:${permission.access}`
    );

  return permissions;
}

export async function hasUserRole(profileId: string, role: string) {
  const roles = await getRolesByUserId(profileId);
  return roles.some((r) => r.name === role);
}

export async function hasUserPermission(
  profileId: string,
  permission: `${string}:${string}:${string}`
) {
  const permissions = await getPermissionsByUserId(profileId);
  return permissions.includes(permission);
}
