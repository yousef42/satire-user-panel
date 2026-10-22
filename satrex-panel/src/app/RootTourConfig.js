import home from './views/pages/home/tourConfig.jsx';
import wallet from './views/pages/wallet/tourConfig.jsx';
import markets from './views/pages/markets/tourConfig.jsx';
import depositWithdrawalCrypto from './views/pages/depositWithdrawalCrypto/tourConfig.jsx';
import deposit from './views/pages/depositMoney/tourConfig.jsx';
import withdrawal from './views/pages/withdrawalMoney/tourConfig.jsx';
import turnover from './views/pages/turnover/tourConfig.jsx';
import editBankInfo from './views/pages/editBankInfo/tourConfig.jsx';
import requests from './views/pages/requests/tourConfig.jsx';
import profile from './views/pages/profile/tourConfig.jsx';
import editPersonalInfo from './views/pages/editPersonalInfo/tourConfig.jsx';
import messages from './views/pages/messages/tourConfig.jsx';
import security from './views/pages/security/tourConfig.jsx';
import fastDealing from './views/pages/fastDealing/tourConfig.jsx';
import reports from './views/pages/reports/tourConfig.jsx';
import completedOrdersReportDetail from './views/pages/reports/completedOrders/tourConfig.jsx';
import support from './views/pages/support/tourConfig.jsx';
import market from './views/pages/market/tourConfig.jsx';
import personalInfoStage2 from './views/pages/editPersonalInfo/stageTwoTourConfig.jsx';

export default {
  home,
  'deposit-withdrawal-crypto': depositWithdrawalCrypto,
  'edit-bank-info': editBankInfo,
  'add-bank-account': editBankInfo,
  'edit-personal-info': editPersonalInfo,
  'edit-personal-info-stage2': personalInfoStage2,
  requests,
  completedOrdersReportDetail,
  profile,
  markets,
  deposit,
  withdrawal,
  turnover,
  messages,
  support,
  market,
  // accounting,
  // // messages,
  // // about,
  // // policies,
  // // guide,
  wallet,
  security,
  // markets,
  reports,
  // profile,
  // 'market-deal':marketDeal,
  // // 'send-ticket':sendTicket,
  'fast-dealing': fastDealing,
  // 'contact-us':contactUs,
  // 'no-internet':noInternet,
};
