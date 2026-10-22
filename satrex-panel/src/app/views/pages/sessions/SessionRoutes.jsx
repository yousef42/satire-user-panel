import React from 'react';

const SignUp = React.lazy(() => import('./SignUp'));
const SignIn = React.lazy(() => import('./SignIn'));
const NotFound = React.lazy(() => import('./NotFound'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));
const Resetpassword = React.lazy(() => import('./resetPassword'));

const settings = {
  activeLayout: 'layout1',
  layout1Settings: {
    topbar: {
      show: false,
    },
    leftSidebar: {
      show: false,
      mode: 'close',
    },
  },
  layout2Settings: {
    mode: 'full',
    topbar: {
      show: false,
    },
    navbar: { show: false },
  },
  secondarySidebar: { show: false },
  footer: { show: false },
};

const sessionRoutes = [

  {
    path: '/register',
    component: SignUp,
    settings,
  },
  {
    path: '/register/:refralCode',
    component: SignUp,
    settings,
  },
  {
    path: '/login',
    component: SignIn,
    settings,
  },
  {
    path: '/reset-password',
    component: Resetpassword,
    settings,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    settings,
  },
  {
    path: '/404',
    component: NotFound,
    settings,
  },
];

export default sessionRoutes;
