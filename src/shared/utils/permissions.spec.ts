import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient } from './supabase/server';
import {
  hasUserRole,
  hasUserPermission,
  getRolesByUserId,
  getPermissionsByUserId,
} from './permissions';

vi.mock('./supabase/server', () => ({
  createClient: vi.fn(),
}));

describe('Permissions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
  };

  beforeEach(() => {
    vi.mocked(createClient).mockReturnValue(mockSupabase as any);
  });

  describe('getRolesByUserId', () => {
    it('returns roles assigned to user', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [
          { roles: { id: '0000-0000-0000-0000', name: 'organization_owner' } },
          { roles: { id: '1111-0000-0000-0000', name: 'team_owner' } },
        ],
        error: null,
      });

      const result = await getRolesByUserId('user-id');
      expect(result).toEqual([
        { id: '0000-0000-0000-0000', name: 'organization_owner' },
        { id: '1111-0000-0000-0000', name: 'team_owner' },
      ]);
    });

    it('reutrns empty array if an error occurs', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [],
        error: {
          code: '12345',
          details: null,
          hint: null,
          message: 'error',
        },
      });

      const result = await getRolesByUserId('1234-1234-1234-1234');
      expect(result).toEqual([]);
    });
  });

  describe('getPermissionsByUserId', () => {
    it('returns permissions assigned to user', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [
          {
            roles: {
              roles_to_permissions: [
                {
                  permissions: [
                    {
                      action: 'read',
                      entity: 'teams',
                      access: 'own',
                    },
                    {
                      action: 'delete',
                      entity: 'organizations',
                      access: 'own',
                    },
                  ],
                },
              ],
            },
          },
        ],
        error: null,
      });

      const result = await getPermissionsByUserId('4444-4444-4444-4444');
      expect(result).toEqual(['read:teams:own', 'delete:organizations:own']);
    });

    it('reutrns empty array if an error occurs', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [],
        error: {
          code: '12345',
          details: null,
          hint: null,
          message: 'error',
        },
      });

      const result = await getPermissionsByUserId('1234-1234-1234-1234');
      expect(result).toEqual([]);
    });
  });

  describe('hasUserRole', () => {
    it('checks if user has role', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [
          { roles: { id: '0000-0000-0000-0000', name: 'organization_owner' } },
          { roles: { id: '1111-0000-0000-0000', name: 'team_owner' } },
        ],
        error: null,
      });

      const result = await hasUserRole(
        '1234-1234-1234-1234',
        'organization_owner'
      );
      const resultFalse = await hasUserRole(
        '1234-1234-1234-1234',
        'team_member'
      );
      expect(result).toEqual(true);
      expect(resultFalse).toEqual(false);
    });
  });

  describe('hasUserPermission', () => {
    it('checks if user has permission', async () => {
      mockSupabase.eq.mockResolvedValue({
        data: [
          {
            roles: {
              roles_to_permissions: [
                {
                  permissions: [
                    {
                      action: 'read',
                      entity: 'teams',
                      access: 'own',
                    },
                    {
                      action: 'delete',
                      entity: 'organizations',
                      access: 'own',
                    },
                  ],
                },
              ],
            },
          },
        ],
        error: null,
      });

      const result = await hasUserPermission(
        '1234-1234-1234-1234',
        'read:teams:own'
      );
      const resultFalse = await hasUserPermission(
        '1234-1234-1234-1234',
        'delete:organizations:any'
      );
      expect(result).toEqual(true);
      expect(resultFalse).toEqual(false);
    });
  });
});
