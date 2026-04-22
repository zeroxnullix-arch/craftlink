// ===================== User Roles ===================== //
/**
 * Application user roles with numeric identifiers
 * Used throughout the app for role-based access control and permissions
 *
 * CRAFTSMAN (1): Service provider - can offer and manage services
 * INSTRUCTOR (2): Course creator - can create, manage, and sell courses
 * CLIENT (3): Service/course consumer - can hire craftsmen and enroll in courses
 */
export const ROLES = {
  ADMIN: 0,
  CRAFTSMAN: 1,   // Service provider
  INSTRUCTOR: 2,  // Course creator
  CLIENT: 3,      // Consumer
};

// ===================== Role Descriptions ===================== //
/**
 * Human-readable descriptions for each role
 * Useful for UI displays and documentation
 */
export const ROLE_DESCRIPTIONS = {
  [ROLES.ADMIN]: "Admin - System administrator",
  [ROLES.CRAFTSMAN]: "Craftsman - Provide skilled services",
  [ROLES.INSTRUCTOR]: "Instructor - Create and teach courses",
  [ROLES.CLIENT]: "Client - Hire professionals and learn",
};