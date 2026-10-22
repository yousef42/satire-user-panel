import { useQuery } from 'react-query';
import {
 getAllSpotAssetsWithDetailsList,
 getAssetList,
 getBankAccount,
 getDailyBalanceForLastWeek,
 getFastExchangeOrders,
 getFastExchangePrice, getHighAndLowPriceForPairInLast24Hours,
 getLoginHistory,
 getMarketsInfo,
 getMaximumWithdrawalPerDayInToman, getNoAuthMarkets,
 getOpenOrderList,
 getOrderList,
 getPersonalInfo,
 getQualifyLevel,
 getRequestsList,
 getSpotBalanceWithExchangeFeeList,
 getSpotLimitBoardAccumulative,
 getSpotLimitBoardPressure,
 getSubCompletedOrders,
 getTomanTotalFundAndTotalTradable,
 getTotalFundAndTradable,
 getTurnoverList,
 getUserInfo,
 getUserProfileCompletedLevelPercentage,
 getUserQuickView,
 getWalletInfo,
} from './apis';
import {
 getFastExchangeOrdersTypes,
 getFastExchangePriceType, getHighAndLowPriceForPairInLast24HoursType,
 getOrderListByDateParams,
 getRequestsListTypes, getSpotBalanceWithExchangeFeeListType,
 getSpotLimitBoardAccumulativeTypes,
 getSpotLimitBoardPressureType,
 getSubCompletedOrdersTypes,
 getTurnoverListParams,
} from './interfaces';
// export const useRequestsList = () => useQuery('getRequestsList', getRequestsList);
export const useOrderList = (param:getOrderListByDateParams) => useQuery(['reportOrderList', ...Object.values(param)], () => getOrderList(param), { cacheTime: 0 });
export const useRequestsList = (param:getRequestsListTypes) => useQuery(['getRequestsList', ...Object.values(param)], () => getRequestsList(param));
export const useFastOrder = (param:getFastExchangeOrdersTypes) => useQuery(['reportFastOrderList', ...Object.values(param)], () => getFastExchangeOrders(param), { cacheTime: 0 });
export const useOpenOrderList = (page:number) => useQuery(['reportOpenOrderList', page], () => getOpenOrderList(page));
export const useLoginHistory = (page:number) => useQuery(['getLoginHistory', page], () => getLoginHistory(page));
export const useUserInfo = () => useQuery('userInfo', getUserInfo);
export const useWalletInfo = () => useQuery('getWalletInfo', getWalletInfo);
export const useDailyBalanceInfo = () => useQuery('getDailyBalanceForLastWeek', getDailyBalanceForLastWeek);
export const usePersonalInfo = () => useQuery('getPersonalInfo', getPersonalInfo);
export const useUserLevelPrecentage = () => useQuery('getUserProfileCompletedLevelPercentage', getUserProfileCompletedLevelPercentage);
export const useWalletList = () => useQuery('getAllSpotAssetsWithDetailsList', getAllSpotAssetsWithDetailsList);
export const useMarketList = () => useQuery('getMarketsInfo', getMarketsInfo, {
    cacheTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
});
export const usePairsDifferentialPriceForLast24Hours = () => useQuery(
    'getPairsDifferentialPriceForLast24Hours',
    getMarketsInfo,
    {
        cacheTime: 0,
        refetchOnMount: 'always',
        refetchOnReconnect: true,
    },
);
export const useNoAuthMarketList = () => useQuery('getNoAuthMarkets', getNoAuthMarkets);
export const useAssetList = () => useQuery('getAssetList', getAssetList);
export const useBankAccountList = () => useQuery('getBankAccount', getBankAccount);
export const useQualifyLevel = () => useQuery('getQualifyLevel', getQualifyLevel);
export const useUserQuickView = () => useQuery('getUserQuickView', getUserQuickView);
export const useTotalFundAndTradable = () => useQuery('getTotalFundAndTradable', getTotalFundAndTradable);
export const useTomanTotalFundAndTotalTradable = () => useQuery('getTotalFundAndTradable', getTomanTotalFundAndTotalTradable);
export const useMaximumWithdrawalPerDayInToman = () => useQuery('getMaximumWithdrawalPerDayInToman', getMaximumWithdrawalPerDayInToman);
export const useTurnoverList = (param:getTurnoverListParams) => useQuery(['getTurnoverList', ...Object.values(param)], () => getTurnoverList(param));
export const useFastExchangePrice = (param:getFastExchangePriceType) => useQuery(['getFastExchangePrice', ...Object.values(param)], () => getFastExchangePrice(param));
export const useSubCompletedOrders = (param:getSubCompletedOrdersTypes) => useQuery(['getSubCompletedOrders', ...Object.values(param)], () => getSubCompletedOrders(param));
export const useSpotLimitBoardAccumulative = (param:getSpotLimitBoardAccumulativeTypes) => useQuery(['getSpotLimitBoardAccumulative', ...Object.values(param)], () => getSpotLimitBoardAccumulative(param));
export const useSpotLimitBoardPressure = (param:getSpotLimitBoardPressureType) => useQuery(['getSpotLimitBoardPressure', ...Object.values(param)], () => getSpotLimitBoardPressure(param));
export const useSpotBalanceWithExchangeFeeList = (param:getSpotBalanceWithExchangeFeeListType) => useQuery(['getSpotBalanceWithExchangeFeeList', ...Object.values(param)], () => getSpotBalanceWithExchangeFeeList(param));
export const useHighAndLowPriceForPairInLast24Hours = (param:getHighAndLowPriceForPairInLast24HoursType) => useQuery(['getHighAndLowPriceForPairInLast24Hours', ...Object.values(param)], () => getHighAndLowPriceForPairInLast24Hours(param));
// export const useSpotLimitBoardAccumulative = (param:marketOrderListTypes) => useQuery(['getSpotLimitBoardAccumulative', param.pairId], () => getSpotLimitBoardAccumulative(param));
