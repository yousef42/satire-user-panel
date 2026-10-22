import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import pagesRoutes from './views/PagesRoutes';
import sessionRoutes from './views/pages/sessions/SessionRoutes.jsx';
import satrexMarkets from './views/pages/satrexMarkets';

// این آرایه همچنان برای AuthGuard و MasterLayout استفاده می‌شود
export const routes = [
  {
    path: '/satrex-markets',
    component: satrexMarkets,
  },
  ...sessionRoutes,
  ...pagesRoutes,
  {
    path: '/',
    exact: true,
    // فقط برای match شدن؛ رندر واقعی پایین با <Navigate> انجام می‌شود
    component: () => null,
  },
  {
    // catch-all
    component: () => null,
  },
];

function RootRoutes() {
  return (
    <Routes>
      {/* satrex markets */}
      <Route path="/satrex-markets" element={<satrexMarkets />} />

      {/* session routes */}
      {sessionRoutes.map(({ path, component: Component }, idx) => (
        <Route key={`session-${idx}`} path={path} element={<Component />} />
      ))}

      {/* main pages */}
      {pagesRoutes.map(({ path, component: Component }, idx) => (
        <Route key={`page-${idx}`} path={path} element={<Component />} />
      ))}

      {/* / → /home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default RootRoutes;
