import React from 'react';
import { authRoles } from '../auth/authRoles.jsx';

const wallet = React.lazy(() => import(/* webpackChunkName: "wallet" */ './pages/wallet'));
const markets = React.lazy(() => import(/* webpackChunkName: "markets" */ './pages/markets'));
const InviteFriend = React.lazy(() => import(/* webpackChunkName: "InviteFriend" */ './pages/InviteFriend'));

const market = React.lazy(() => import(/* webpackChunkName: "market" */ './pages/market'));
const editPersonalInfo = React.lazy(() => import(/* webpackChunkName: "editPersonalInfo" */ './pages/editPersonalInfo'));
const editBankInfo = React.lazy(() => import(/* webpackChunkName: "editBankInfo" */ './pages/editBankInfo'));
const request = React.lazy(() => import(/* webpackChunkName: "requests" */ './pages/requests'));
const messages = React.lazy(() => import(/* webpackChunkName: "messages" */ './pages/messages'));
const turnover = React.lazy(() => import(/* webpackChunkName: "turnover" */ './pages/turnover'));
const deposit = React.lazy(() => import(/* webpackChunkName: "depositMoney" */ './pages/depositMoney'));
const home = React.lazy(() => import(/* webpackChunkName: "home" */ './pages/home'));
const support = React.lazy(() => import(/* webpackChunkName: "support" */ './pages/support'));
const fastDealing = React.lazy(() => import(/* webpackChunkName: "fastDealing" */ './pages/fastDealing'));
const depositWithdrawalCrypto = React.lazy(() => import(/* webpackChunkName: "depositWithdrawalCrypto" */ './pages/depositWithdrawalCrypto'));
const security = React.lazy(() => import(/* webpackChunkName: "security" */ './pages/security'));
const reports = React.lazy(() => import(/* webpackChunkName: "reports" */ './pages/reports'));
const profile = React.lazy(() => import(/* webpackChunkName: "profile" */ './pages/profile'));
const contactUs = React.lazy(() => import(/* webpackChunkName: "contactUs" */ './pages/contactUs'));
const withdrawalMoney = React.lazy(() => import(/* webpackChunkName: "withdrawalMoney" */ './pages/withdrawalMoney'));
const about = React.lazy(() => import(/* webpackChunkName: "about" */ './pages/about'));
const downloadApplication = React.lazy(() => import(/* webpackChunkName: "downloadApplication" */ './pages/downloadApplication'));

const help = React.lazy(() => import(/* webpackChunkName: "help" */ './pages/help'));

const policies = React.lazy(() => import(/* webpackChunkName: "policies" */ './pages/policies'));

const FAQ = React.lazy(() => import(/* webpackChunkName: "FAQ" */ './pages/FAQ'));

const levelGuide = React.lazy(() => import(/* webpackChunkName: "levelGuide" */ './pages/levelGuide'));

const registrationGuide = React.lazy(() => import(/* webpackChunkName: "registrationGuide" */ './pages/registrationGuide'));

const feeGuide = React.lazy(() => import(/* webpackChunkName: "feesGuide" */ './pages/feesGuide'));

const pagesRoutes = [
  {
    path: '/wallet',
    component: wallet,
    auth: authRoles.admin,
  },
  {
    path: '/markets',
    component: markets,
    auth: authRoles.admin,
  },
  {
    path: '/market/:id',
    component: market,
    auth: authRoles.admin,
  },
  {
    path: '/edit-bank-info',
    component: editBankInfo,
    auth: authRoles.admin,
  },
  {
    path: '/add-bank-account',
    component: editBankInfo,
    auth: authRoles.admin,
  },
  {
    path: '/edit-personal-info',
    component: editPersonalInfo,
    auth: authRoles.admin,
  },
  {
    path: '/requests',
    component: request,
  },
  {
    path: '/messages',
    component: messages,
  },
  {
    path: '/turnover',
    component: turnover,
  },
  {
    path: '/deposit',
    component: deposit,
  },
  {
    path: '/home',
    component: home,
  },
  {
    path: '/support',
    component: support,
  },
  {
    path: '/fast-dealing',
    component: fastDealing,
  },
  {
    path: '/security',
    component: security,
  },
  {
    path: '/deposit-withdrawal-crypto',
    component: depositWithdrawalCrypto,
  },
  {
    path: '/reports',
    component: reports,
  },
  {
    path: '/profile',
    component: profile,
  },
  {
    path: '/contact-us',
    component: contactUs,
  },
  {
    path: '/withdrawal',
    component: withdrawalMoney,
  },
  {
    path: '/about',
    component: about,
  },
  {
    path: '/download-application',
    component: downloadApplication,
  },
  {
    path: '/help',
    component: help,
  },
  {
    path: '/policies',
    component: policies,
  },
  {
    path: '/FAQ',
    component: FAQ,
  },
  {
    path: '/level-guide',
    component: levelGuide,
  },
  {
    path: '/registration-guide',
    component: registrationGuide,
  },
  {
    path: '/fee-guide',
    component: feeGuide,
  },
  {
    path: '/invite-friends',
    component: InviteFriend,
  },
];

export default pagesRoutes;
export const bannedPages = ['wallet', 'deposit-withdrawal-crypto', 'deposit', 'withdrawal', 'turnover', 'requests', 'fast-dealing'];
