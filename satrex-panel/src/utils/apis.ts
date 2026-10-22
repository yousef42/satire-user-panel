import starkString from 'starkstring';
import moment from 'moment';
import {
    defaultApi,
    defaultApiV3,
    satrexApi,
    satrexApiV3,
} from '../app/components/api';
import satrexToast from '../app/components/satrexToast';
// import { transFn } from '../app/components/lang';
import {
    apiCallerOptionsTypes,
    cancelLimitOrderParamsType,
    getFastExchangeOrdersTypes,
    getFastExchangePriceType, getHighAndLowPriceForPairInLast24HoursType,
    getOrderListByDateParams,
    getRequestsListTypes, getSpotBalanceWithExchangeFeeListType,
    getSpotLimitBoardAccumulativeTypes,
    getSpotLimitBoardPressureType,
    getSubCompletedOrdersTypes,
    getTurnoverListParams,
    removeBankAccountType,
    setFastExchangeOrderType, setLimitOrderType,
    setMarketOrderTypes,
} from './interfaces';
import { transFn } from '../app/components/lang';

const renderResponse = ({ data }: any, options: apiCallerOptionsTypes) => {
    if (data.isSuccess) {
        if (!options.showErrors) return data.data;
        if (options.notifText) satrexToast(transFn(options.notifText), 'success');
        return true;
        // return !options.showErrors ? data.data : satrexToast(options.notifText, 'error');
    }
    if (options.showErrors) {
        data.Errors.forEach((err: any) => {
            satrexToast(err.Description, 'error');
        });
    }
    return false;
};

const apiCaller = async (url: string, options: apiCallerOptionsTypes = {
    notifText: '',
    showErrors: false,
    params: null,
}) => {
    try {
        return renderResponse(await satrexApi().post(url, options.params), { ...options });
    } catch (e) {
        if (options.showErrors) satrexToast(transFn('failedInMission'), 'error');
        // console.log(e)
    }
};
const apiCallerV3 = async (url: string, options: apiCallerOptionsTypes = {
    notifText: '',
    showErrors: false,
    params: null,
}) => {
    try {
        return renderResponse(await satrexApiV3().post(url, options.params), { ...options });
    } catch (e) {
        if (options.showErrors) satrexToast(transFn('failedInMission'), 'error');
        // console.log(e)
    }
};

export const getOrderList = async (param: getOrderListByDateParams) => {
    const toDate = param.ToDateUtc === 'now' ? moment().add(1, 'days') : moment(param.ToDateUtc);
    const fromDate = param.FromDateUtc === 'yesterday' ? moment() : moment(param.FromDateUtc);
    const { data } = await satrexApi().post('/Order/Get', {
        ...param,
        // FromDateUtc: starkString(fromDate.format('YYYY-MM-DD'))
        //     .englishNumber()
        //     .toString(),
        // ToDateUtc: starkString(toDate.format('YYYY-MM-DD'))
        //     .englishNumber()
        //     .toString(),
        pageSize: 10,
        sortOrder: 'Descending',
    });
    if (data.isSuccess) {
        return {
            orders: data.data?.orders.map((item: any) => ({
                ...item,
                subOpen: false,
            })),
            paginationInfo: data.data.paginationInfo,
        };
    }
    return [];
};

export const getOpenOrderList = async (pageIndex: number) => {
    const { data } = await satrexApi().post('/Order/GetOpenOrderList', {
        pageIndex,
        pageSize: 10,
        sortOrder: 'Descending',
    });
    return data.data;
};

export const getFastOrdersList = async (pageIndex: number) => {
    const { data } = await satrexApi().post('/FastExchange/Get');
    return data.data;
};

export const getLoginHistory = async (pageIndex: number) => {
    try {
        const res = await satrexApi()
            .post('/Log/Get', {
                fromDateTime: '1990-08-29T15:03:43.049Z',
                toDateTime: starkString(moment().add('1', 'day').format('YYYY-MM-DD'))
                    .englishNumber()
                    .toString(),
                pageSize: 10,
                pageIndex,
                sortOrder: 'Descending',
            });
        return res?.data?.data ?? { loginHistories: [], totalCount: 0 };
    } catch {
        return { loginHistories: [], totalCount: 0 };
    }
};
export const getNoAuthMarkets = async () => {
   try {
       const { data } = await defaultApiV3().get('/Board/GetPairsDifferentialPriceForLast24Hours');
       return data.data;
   } catch (e) {

   }
};

// export const getWalletInfo = async () => {
//     const { data } = await satrexApi().post('/Wallet/GetTotalAssetsPriceInTomanAndTether');
//     if (data.isSuccess) return data.data;
//     return false;
// };

export const getDailyBalanceForLastWeek = () => apiCaller('/Balance/GetDailyBalanceForLastWeek');
export const getWalletInfo = () => apiCaller('/Wallet/GetTotalAssetsPriceInTomanAndTether');
export const getPersonalInfo = () => apiCaller('/PersonalInfo/Get');
export const getUserProfileCompletedLevelPercentage = () => apiCaller('/Dashboard/GetUserProfileCompletedLevelPercentage');
export const getAllSpotAssetsWithDetailsList = () => apiCaller('/Wallet/GetAllSpotAssetsWithDetailsList');
export const getUserInfo = () => apiCaller('/Dashboard/GetUserQuickView');
export const getMarketsInfo = async () => {
    const authMarkets = await satrexApiV3()
        .get('/Board/GetPairsDifferentialPriceForLast24Hours')
        .then(({ data }) => data?.data || false)
        .catch(() => false);
    if (authMarkets) return authMarkets;
    return getNoAuthMarkets();
};
export const getAssetList = () => apiCaller('/Asset/GetList');
export const getBankAccount = () => apiCaller('/BankAccounts/GetList');
export const getLoginByOtpStatus = () => apiCaller('/User/GetLoginByOtpStatus');
export const getQualifyLevel = () => apiCaller('/QualifyLevel/Get');
export const getUserQuickView = () => apiCaller('/Dashboard/GetUserQuickView');
export const getTotalFundAndTradable = () => apiCaller('/Wallet/GetTomanTotalFoundAndTotalTradable');

export const getMaximumWithdrawalPerDayInToman = () => apiCaller('/InternalWithdraw/GetMaximumWithdrawalPerDayInToman');
export const getTomanTotalFundAndTotalTradable = () => apiCaller('/Wallet/GetTomanTotalFoundAndTotalTradable');
export const removeBankAccount = (params:removeBankAccountType) => apiCaller('/BankAccounts/Remove', {
    notifText: 'Information deleted successfully',
    params,
    showErrors: true,
});
// export const addNewBankAccount = (params:addBankAccountType) => apiCaller('/BankAccounts/Add', {
//     notifText: null,
//     params,
//     showErrors: true,
// });
export const setFastExchangeOrder = (params:setFastExchangeOrderType) => apiCaller('/FastExchange/Create', {
    notifText: 'The request was successfully submitted ',
    params,
    showErrors: true,
});

export const SendemailSecretCodeForRegisteredUser = () => apiCallerV3('/User/SendemailSecretCodeForRegisteredUser', {
    notifText: 'The code was sent to you',
    showErrors: true,
});

export const setWithdrawal = (params: any) => apiCaller('/InternalWithdraw/Create', {
    notifText: 'Withdrawal request sent successfully',
    params,
    showErrors: true,
});

export const changeUserPassword = (params: any) => apiCaller('/User/ChangePassword', {
    notifText: 'Password changed successfully',
    params,
    showErrors: true,
});

export const getTurnoverList = (params: getTurnoverListParams) => apiCaller('/TurnOver/GetList', {
    notifText: '',
    params,
});

export const getFastExchangePrice = (params: getFastExchangePriceType) => apiCaller('/FastExchange/GetFastExchangePrice', {
    notifText: '',
    params,
});

export const cancelLimitOrder = (params: cancelLimitOrderParamsType) => apiCaller('/Order/CancelLimitOrder', {
    notifText: 'Order canceled successfully',
    params,
    showErrors: true,
});

export const getFastExchangeOrders = (params: getFastExchangeOrdersTypes) => apiCaller('/FastExchange/Get', {
    notifText: null,
    params,
});

export const getRequestsList = (params: getRequestsListTypes) => apiCaller('/TurnOver/GetRequestsList', {
    notifText: null,
    params,
});

export const getSubCompletedOrders = (params: getSubCompletedOrdersTypes) => apiCaller('/Order/GetSubCompletedOrders', {
    notifText: null,
    params,
});
export const setMarketOrder = (params: setMarketOrderTypes) => apiCaller('/Order/SetMarketOrder', {
    notifText: 'orderSuccessfullyRegistered',
    params,
    showErrors: true,
});

export const getSpotLimitBoardAccumulative = (params: getSpotLimitBoardAccumulativeTypes) => apiCaller('/Board/GetSpotLimitBoardAccumulative', {
    notifText: null,
    params,
});
export const getSpotLimitBoardPressure = (params: getSpotLimitBoardPressureType) => apiCaller('/Board/GetSpotLimitBoardPressure', {
    notifText: null,
    params,
});

export const getSpotBalanceWithExchangeFeeList = (params: getSpotBalanceWithExchangeFeeListType) => apiCaller('/Wallet/GetSpotBalanceWithExchangeFeeList', {
    notifText: null,
    params,
});

export const setLimitOrder = (params: setLimitOrderType) => apiCaller('/Order/SetLimitOrder', {
    notifText: 'orderSuccessfullyRegistered',
    params,
    showErrors: true,
});
export const setfavortiMarket = (params: setLimitOrderType) => apiCaller('/Pair/AddToFavorite', {
    notifText: 'marketAddToFav',
    params,
    showErrors: true,
});

export const getHighAndLowPriceForPairInLast24Hours = (params: getHighAndLowPriceForPairInLast24HoursType) => apiCaller('/Board/GetHighAndLowPriceForPairInLast24Hours', {
    notifText: null,
    params,
});

export const validatePay = (params: getHighAndLowPriceForPairInLast24HoursType) => apiCaller('/InternalPayment/ValidatePay', {
    notifText: null,
    params,
    showErrors: true,
});

// export const getSpotLimitBoardAccumulative = (params: marketOrderListTypes) => apiCaller('/Board/GetSpotLimitBoardAccumulative', {
//     notifText: 'Order canceled successfully',
//     params,
// });
