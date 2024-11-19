import { Session } from '../../auth';

export const ROLES = {
  /**
   * ADMIN is the highest role. Only trusted IT professionals and developers should
   * be made ADMINs.
   *
   * **PERMISSIONS:**
   * 1. Create ALL content.
   * 2. Edit ALL content.
   * 3. Publish ALL content.
   * 4. Delete ALL content.
   * 5. Manage system settings
   * 6. Manage users.
   */
  ADMIN: 1,

  /**
   * `CONTENT_MANAGER` is the second highest role just below admins. This is mainly
   * for users with high trust like department or division managers.
   *
   * **Permissions:**
   * 1. Create ALL content.
   * 2. Edit ALL content.
   * 3. Publish ALL content.
   * 4. Delete ALL content.
   */
  CONTENT_MANAGER: 2,

  /**
   * `CONTRIBUTOR` is the third highest role. Most users will have this role.
   *
   * **Permissions:**
   * 1. Create OWN and GROUP content.
   * 2. Edit OWN and GROUP content.
   * 3. Publish OWN and GROUP content.
   * 4. Delete OWN and GROUP content
   */
  CONTRIBUTOR: 3,

  /**
   * `COLLABORATOR` is the lowest role. This is for users with low trust. E.G.
   * new/junior employees, contractors etc.
   *
   * **Permissions:**
   * 1. Create OWN and GROUP content.
   * 2. Edit OWN and GROUP content.
   * 3. Delete OWN content.
   *
   * *Note: This role restricts publishing abilities and prevents deletion of content belonging to other users.*
   */
  COLLABORATOR: 4,
} as const satisfies Record<string, number>;

/**
 * Returns `true` if a user has the `ADMIN` role or higher.
 *
 * *Note: There are currently no roles higher than ADMIN.*
 *
 * @see {@link ROLES.ADMIN}
 */
export function isAdmin(user: Session): boolean {
  return checkRole(user.role, ROLES.ADMIN);
}

/**
 * Returns `true` if the user has a role of `CONTENT_MANAGER` or higher.
 *
 * @see {@link ROLES.CONTENT_MANAGER}
 */
export function isContentManager(user: Session): boolean {
  return checkRole(user.role, ROLES.CONTENT_MANAGER);
}

/**
 * Returns `true` if the user has a role of `CONTRIBUTOR` or higher.
 *
 * @see {@link ROLES.CONTRIBUTOR}
 */
export function isContributor(user: Session): boolean {
  return checkRole(user.role, ROLES.CONTRIBUTOR);
}

/**
 * Returns `true` if the user has a role of `COLLABORATOR` or higher.
 *
 * *Note: There are currently no roles lower than COLLABORATOR.*
 *
 * @see {@link ROLES.COLLABORATOR}
 */
export function isCollaborator(user: Session): boolean {
  return checkRole(user.role, ROLES.COLLABORATOR);
}

/**
 * Returns `true` if the user's role is equal to or higher than the provided role.
 *
 * @see {@link ROLES}
 */
export function checkRole(
  currentRole: Session['role'],
  minRole: number,
): boolean {
  /*
    Roles are assigned ascending numerical values in descending order of permissions.
    Higher roles (like ADMIN) have lower numerical values, so they are checked as follows:
    
    For example:
      - ADMIN has the most permissions, so its value is 1.
      - If the minimum required role is COLLABORATOR, then roles like COLLABORATOR and higher (ADMIN) should have access.

    To verify this, we check if `currentRole` of the user is less than or equal to the `minRole`.
    This allows roles with higher permissions (lower numerical values) to pass the check.
  */

  return currentRole !== null ? currentRole <= minRole : false;
}
