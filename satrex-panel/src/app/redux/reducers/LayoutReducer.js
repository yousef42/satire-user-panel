import {
  SET_LAYOUT_SETTINGS,
  SET_DEFAULT_LAYOUT_SETTINGS,
  CHANGE_SIDEBAR_TOGGLE,
  CHANGE_THEME,
  SET_TOPBAR_VALUES,
  DEACTIVITY_TIME,
  GET_WALLET_LIST,
  GET_MINIMUM_TRANSACTION_PRICE,
SET_TOURGUIDE_STATUS,
} from '../actions/LayoutActions';
import { MatxLayoutSettings } from '../../MasterLayout/settings.jsx';

const initialState = {
  minimumTransactionsPrice: 0,
  settings: {
    ...MatxLayoutSettings,
  },
  defaultSettings: {
    ...MatxLayoutSettings,
  },
  sidebarToggle: true,
  theme: false,
  extraTheme: null,
  totals: {
    totalFund: null,
    totalTradable: null,
    totalVolume: null,
    levelPrecentage: 0,
    qualifyLevel: null,
    deativityTime: '',
  },
  tourGuideReady: false,
  walletList: [],
  coinColors: [],
};

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MINIMUM_TRANSACTION_PRICE':
      return {
        ...state,
        minimumTransactionsPrice: action.payload,
      };
    case 'SET_LAYOUT_SETTINGS':
      return {
        ...state,
        settings: { ...action.data },
      };
    case 'SET_DEFAULT_LAYOUT_SETTINGS':
      return {
        ...state,
        defaultSettings: { ...action.data },
      };
    case 'CHANGE_SIDEBAR_TOGGLE':
      return {
        ...state,
        sidebarToggle: action.data,
      };
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.data === true,
        extraTheme: action.data,
      };
    case 'SET_TOPBAR_VALUES':
      return {
        ...state,
        totals: action.data,
      };

    case 'DEACTIVITY_TIME':
      return {
        ...state,
        deativityTime: action.data,
      };
    case 'SET_TOURGUIDE_STATUS':
      return {
        ...state,
        tourGuideReady: action.data,
      };
    case 'GET_WALLET_LIST':
      return {
        ...state,
        walletList: action.data.walletList,
        coinColors: action.data.coinColors,
      };
    default:
      return { ...state };
  }
};

export default LayoutReducer;
