import { ReactElement } from 'react';

export interface tableRowPlaceholderPropType{
    rowsCount:number,
    columnsCount:number,
    coinIcon?:boolean,
}

export interface TableLoaderPropTypes{
    placeholderOptions?:unknown,
    children:ReactElement,
    loading:boolean,
}
export interface apiCallerOptionsTypes{
    notifText:string | null,
    showErrors?:boolean,
    params?:unknown,
}

export interface getOrderListByDateParams{
    FromDateUtc: string,
    ToDateUtc: string,
    pageIndex: number,
    orderStatus:string,
    excludeOrderStatus?:string,
}

export interface getTurnoverListParams{
    FromDateUtc: string,
    ToDateUtc: string,
    pageIndex: number,
}

export interface getFastExchangePriceType{
    assetId: number | string,
}

export interface setFastExchangeOrderType{
    AssetId:number | string,
    Volume: number | string,
    orderType: string,
}

export interface cancelLimitOrderParamsType {
    id:number | string,
    orderType:string
}

export interface marketOrderListTypes {
    pairId: string | number,
    count: number,
}

export interface removeBankAccountType {
    id:number | string,
}

export interface addBankAccountType {
    iban:string,
    cardNumber:string,
}

export interface getRequestsListTypes {
    fromDateTime:string,
    toDateTime:string,
}

export interface getFastExchangeOrdersTypes {
    // id: string | number,
    excludeLastTransactionConfirmationType?:string,
    orderType?: string,
    lastTransactionConfirmationType?: string,
    pageSize?: number,
    pageIndex: number,
    sortOrder?: string,
}

export interface personalInfoParams{
    firstName:string,
    lastName:string,
}

export interface levelChartProps {
    personalInfo:personalInfoParams
}

export interface userReducerType{
    language:string,
    levelPrecentage:string | number,
}

export interface layoutInformationType{
    totalFund: string,
    totalTradable: string,
    totalVolume: string,
    levelPrecentage: number | string,
    qualifyLevel: string | number,
    deativityTime: string | number,
}

export interface layoutReducerType{
    minimumTransactionsPrice: 0,
    settings:any,
    defaultSettings:any,
    sidebarToggle: boolean,
    theme: boolean,
    extraTheme: string,
    totals: layoutInformationType,
    tourGuideReady: boolean,
    walletList: any[],
    coinColors: any[],
}

export interface userReducerSelectorType{
    user:userReducerType
}

export interface layoutReducerSelectorType{
    layout:layoutReducerType
}

export interface getSubCompletedOrdersTypes{
    id:number
}

export interface usesatrexDialogReturnType{
    open:boolean,
    setOpen:(cb: (value: boolean) => boolean)=>void,
    handleClose:()=>void,
}

export interface RowPlaceHolderProps{
    columnsCount:number,
    coinIcon:boolean | undefined,
}

export interface animatedBoxPropTypes {
    children:ReactElement,
    className?:string,
}

export interface ProgressSwitchPropTypes {
    children:ReactElement,
}

type totalFundtype = {
    financialLevel:{
        exchangeFeePercent : number
    },
    destinationAsset:{
        totalTradable:number
    }
    sourceAsset:{
        totalTradable:number
    }
}

export interface setOrderBoxPropTypes{
    cryptoPair:any,
    totalFunds:totalFundtype,
    price:number,
    volume:number,
    setPrice:(cb: ((value: number | string) => number | string) | number | string)=>void,
    setVolume:(cb: ((value: number | string) => number | string) | number | string)=>void,
    lastPrice:number,
    supportedCoinList:any[],
    handleMarketSelected:()=>void,
    containerHeight?:number,
}

export interface setMarketOrderTypes {
    orderType:string,
    pairId:number | string,
    volume:number | string,
}

export interface volumeSliderPropTypes {
    price:number | string,
    setPrice:(cb: ((value: number | string) => number | string) | number | string | number[])=>void,
    setVolume:(cb: ((value: number | string) => number | string) | number | string | number[])=>void,
    volume:number,
    lastPrice:number,
    getInventory:()=>number,
    orderType:boolean,
    setTotalValue:(cb: ((value: number | string) => number | string) | number | string | number[])=>void,
}

export type useTablePaginateReturnType = [number, (value: number) => void, (value: number) => void]

export interface getSpotLimitBoardAccumulativeTypes {
    pairId:number | string,
    count:number | string,
}
export interface getSpotLimitBoardPressureType {
    pairId:number | string,
}

export interface TradeChartProps {
    cryptoPair:any,
    tradingViewWidth:number,
}

export interface getSpotBalanceWithExchangeFeeListType{
    pairId:number | string,
}

export interface getHighAndLowPriceForPairInLast24HoursType{
    pairId:number | string,
}

export interface summaryBoardProps{
    cryptoPair:any,
    lastPriceColor:string,
    lastPrice:number | string,
}

export interface setLimitOrderType{
    orderType: string,
    pairId: number | string,
    volume : number | string,
    price : number | string,
}
