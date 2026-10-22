import moment from 'moment';
import { satrexApi } from '../../components/api';
import { Store } from '../Store';
import { addTomanLogo } from './CoinActions';
import { getUserLevelPercentage } from './UserActions';
import getAverageRGB from '../../components/getAverageRGB';

export const SET_LAYOUT_SETTINGS = 'LAYOUT_SET_SETTINGS';
export const SET_DEFAULT_LAYOUT_SETTINGS = 'LAYOUT_SET_DEFAULT_SETTINGS';
export const CHANGE_SIDEBAR_TOGGLE = 'CHANGE_SIDEBAR_TOGGLE';
export const CHANGE_THEME = 'CHANGE_THEME';
export const SET_TOPBAR_VALUES = 'SET_TOPBAR_VALUES';
export const DEACTIVITY_TIME = 'DEACTIVITY_TIME';
export const GET_WALLET_LIST = 'GET_WALLET_LIST';
export const GET_MINIMUM_TRANSACTION_PRICE = 'GET_MINIMUM_TRANSACTION_PRICE';
export const SET_TOURGUIDE_STATUS = 'SET_TOURGUIDE_STATUS';

export const setLayoutSettings = (data) => (dispatch) => {
  dispatch({
    type: SET_LAYOUT_SETTINGS,
    data,
  });
};
export const refreshDeactivityTime = () => (dispatch) => {
  dispatch({
    type: DEACTIVITY_TIME,
    data: moment().add('1', 'minutes').format('YYYY-MM-DD HH:mm:ss'),
  });
};

export const setDefaultSettings = (data) => (dispatch) => {
  dispatch({
    type: SET_DEFAULT_LAYOUT_SETTINGS,
    data,
  });
};
export const changeSidebarToggle = (data) => (dispatch) => {
    dispatch({
      type: CHANGE_SIDEBAR_TOGGLE,
      data,
    });
  };

export const setTopbarValues = () => {
  Store.dispatch(refreshDeactivityTime());
  // Store.dispatch(getCoinPriceApi());
  Store.dispatch(getUserLevelPercentage());
  // Store.dispatch(getWalletList());
  Store.dispatch(getMinimumTransaction());
  return async (dispatch) => {
    try {
      const [totalFundAndTradable, totalVolume, levelPrecentage, qualifyLevel] = await Promise.allSettled([
        satrexApi().post('/Wallet/GetTomanTotalFoundAndTotalTradable'),
        satrexApi().post('/Board/GetLast24HoursTotalCompletedOrdersPriceInToman'),
        satrexApi().post('/Dashboard/GetUserProfileCompletedLevelPercentage'),
        satrexApi().post('/QualifyLevel/Get'),
      ]);
      const totalFund = totalFundAndTradable.status === 'fulfilled' ? totalFundAndTradable.value?.data?.data : null;
      const totalVol = totalVolume.status === 'fulfilled' ? totalVolume.value?.data?.data : null;
      const levelPct = levelPrecentage.status === 'fulfilled' ? levelPrecentage.value?.data?.data : null;
      const qualify = qualifyLevel.status === 'fulfilled' ? qualifyLevel.value?.data?.data : null;
      dispatch({
        type: SET_TOPBAR_VALUES,
        data: {
          totalFund: totalFund?.totalFund,
          totalTradable: totalFund?.totalTradable,
          totalVolume: totalVol?.total ?? 0,
          levelPrecentage: levelPct?.percentage ?? 0,
          qualifyLevel: qualify ?? null,
        },
      });
    } catch (_) {
      dispatch({
        type: SET_TOPBAR_VALUES,
        data: {
          totalFund: 0,
          totalTradable: 0,
          totalVolume: 0,
          levelPrecentage: 0,
          qualifyLevel: null,
        },
      });
    }
  };
};

export const changeTheme = (status) => {
  localStorage.setItem(
    'theme',
      status,
  );
  return (dispatch) => {
    dispatch({
      type: CHANGE_THEME,
      data: status,
    });
  };
};

export const getMinimumTransaction = () => async (dispatch) => {
    try {
        const res = await satrexApi().post('/Board/GetMinimumTransactionPriceInToman');
        const value = res?.data?.data?.minimumTransactionPriceInToman;
        if (value != null) {
            dispatch({
                type: GET_MINIMUM_TRANSACTION_PRICE,
                payload: value,
            });
        }
    } catch (_) {}
  };

export const getWalletList = () => async (dispatch) => {
    try {
      const res = await satrexApi().post('/Wallet/GetAllSpotAssetsWithDetailsList');
      const list = res?.data?.data;
      if (!list || !Array.isArray(list)) return;
      const logoColors = [];
      list.forEach((item) => {
        const imgEl = new Image();
        imgEl.src = item.assetImageAddress;
        imgEl.crossOrigin = 'Anonymous';
        imgEl.onload = () => {
          logoColors.push(getAverageRGB(imgEl));
        };
      });
      const toman = list.find((item) => (item.assetEnglishTitle || '').toLowerCase() === 'toman');
      if (toman?.assetImageAddress) Store.dispatch(addTomanLogo(toman.assetImageAddress));
      dispatch({
        type: GET_WALLET_LIST,
        data: {
          walletList: list,
          coinColors: logoColors,
        },
      });
    } catch (_) {}
  };

export function setTourGuideStatus(status) {
  return (dispatch) => {
    dispatch({
      type: SET_TOURGUIDE_STATUS,
      data: status,
    });
  };
}
