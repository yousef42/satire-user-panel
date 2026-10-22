export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
  guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
};

// Check out app/views/dashboard/HomeRoutes.js
// Only SA & Admin has dashboard access

// const homeRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];
