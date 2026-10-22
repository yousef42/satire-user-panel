import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import starkString from 'starkstring';
import { useDispatch, useSelector } from 'react-redux';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { useQueryClient } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import {
    Divider, Tab, Tabs,
} from '@mui/material';
import {
    satrexDarkerBlueDarkMode, satrexGray, satrexGreen, satrexRed, satrexSemiGray,
} from '../../../../styles/colors';
import SatrexCard from '../../../components/SatrexCard';
import Trans, { transFn } from '../../../components/lang';
import LoadingButton from '../../../components/LoadingButton';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import SatrexInput from '../../../components/SatrexInput';
import { setLimitOrder, setMarketOrder } from '../../../../utils/apis';
import { setOrderBoxPropTypes } from '../../../../utils/interfaces';
import VolumeSlider from './VolumeSlider';
import satrexToast from '../../../components/satrexToast';
import { setTopbarValues } from '../../../redux/actions/LayoutActions';
import { useUserQuickView, useWalletList } from '../../../../utils/queries';
import usesatrexMenu from '../../../hooks/useSatrexMenu';
import OrderInputsAnimation from './OrderInputsAnimation';
import upto2Decimal from '../../../../utils/helpers/upto2Decimal';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    marketTypeIndicator: {
        marginTop: 10,
    },
    marketTypeStyle: {
        width: 70,
        minWidth: 70,
        minHeight: 38,
        borderRadius: 10,
        color: (props) => `${props.satrexTheme ? '#475569' : '#d6def5'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#f8fafc' : 'rgba(255,255,255,0.08)'} !important`,
        border: (props) => `1px solid ${props.satrexTheme ? '#d7deea' : 'rgba(255,255,255,0.12)'}`,
        marginInlineEnd: 8,
        transition: 'all 160ms ease',
        '&:hover': {
            backgroundColor: (props) => `${props.satrexTheme ? '#eef2f7' : 'rgba(255,255,255,0.14)'} !important`,
        },
        '& span': {
            color: 'inherit !important',
            fontWeight: 600,
        },
    },
    marketTypeSelected: {
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : '#181e33'} !important`,
        borderColor: `${satrexGreen} !important`,
        boxShadow: (props) => (props.satrexTheme
            ? `0 6px 18px ${alpha(satrexGreen, 0.12)}`
            : `0 0 0 1px ${alpha(satrexGreen, 0.22)}`),
        '& span': {
            color: `${satrexGreen} !important`,
        },
    },
    buyButton: {
        borderColor: `${satrexGreen} !important`,
    },
    sellButton: {
        borderColor: 'red !important',
    },
    radioChecked: {
        '& div': {
            color: `${satrexRed}!important`,
        },
    },
    radioLabel: {
        margin: 0,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        border: 'solid 1px #ADADAD',
        borderRadius: '0.3em',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    autocompleteStyle: {
        '& input': {
            fontSize: '13px',
        },
        marginTop: '0px',
    },
    buttonDisabled: {
        backgroundColor: `${satrexSemiGray} !important`,
    },
    orderBasisGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        width: '100%',
    },
    orderBasisButton: {
        minWidth: 96,
        borderRadius: 8,
        border: '1px solid #d6d6d6',
        padding: '8px 14px',
        color: satrexGray,
        backgroundColor: 'transparent',
        whiteSpace: 'nowrap',
    },
    orderBasisButtonActive: {
        borderColor: `${satrexGreen} !important`,
        color: `${satrexGreen} !important`,
        backgroundColor: `${alpha(satrexGreen, 0.08)} !important`,
    },
    balancePanel: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        minHeight: 48,
        padding: '10px 14px',
        borderRadius: 12,
        backgroundColor: (props) => (props.satrexTheme ? '#f8fafc' : 'rgba(255,255,255,0.06)'),
        border: (props) => `1px solid ${props.satrexTheme ? '#d5deea' : 'rgba(173,190,224,0.28)'}`,
        color: (props) => (props.satrexTheme ? '#334155' : '#e7eeff'),
        fontSize: 14,
        fontWeight: 600,
    },
    orderInput: {
        minHeight: 46,
        padding: '10px 14px !important',
        borderRadius: '10px !important',
        border: (props) => `1px solid ${props.satrexTheme ? '#aebdce' : '#71809f'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#ffffff' : 'rgba(13, 22, 44, 0.72)'} !important`,
        boxShadow: (props) => (props.satrexTheme ? '0 1px 3px rgba(15, 23, 42, 0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.05)'),
        '&:hover': {
            borderColor: (props) => `${props.satrexTheme ? '#64748b' : '#9aabd0'} !important`,
        },
        '&:focus': {
            borderColor: `${satrexGreen} !important`,
            boxShadow: `0 0 0 3px ${alpha(satrexGreen, 0.18)} !important`,
        },
    },
    priceInput: {
        minHeight: 46,
        padding: '10px 14px !important',
        borderRadius: '10px !important',
        border: (props) => `1px solid ${props.satrexTheme ? '#6d87a4' : '#8296bf'} !important`,
        backgroundColor: (props) => `${props.satrexTheme ? '#f5f9ff' : 'rgba(20, 38, 70, 0.8)'} !important`,
        boxShadow: (props) => (props.satrexTheme ? '0 2px 5px rgba(30, 64, 175, 0.10)' : 'inset 0 1px 0 rgba(255,255,255,0.06)'),
        fontWeight: '700 !important',
        '&:hover': {
            borderColor: (props) => `${props.satrexTheme ? '#3b82a0' : '#a9c1f0'} !important`,
        },
        '&:focus': {
            borderColor: `${satrexGreen} !important`,
            boxShadow: `0 0 0 3px ${alpha(satrexGreen, 0.2)} !important`,
        },
    },
}));

const SetOrderBox: React.FC<setOrderBoxPropTypes> = ({
                                                         cryptoPair,
                                                         price,
                                                         volume,
                                                         setPrice,
                                                         setVolume,
                                                         lastPrice,
                                                         supportedCoinList,
                                                     handleMarketSelected,
                                                     containerHeight,
                                                     }) => {
    const queryClient = useQueryClient();
    // @ts-ignore
    const satrexTheme = useSelector((state) => state.layout.theme);
    const classes = useStyles({ satrexTheme });
    const [orderType, setOrderType] = useState<boolean>(true);
    // @ts-ignore
    const lang = useSelector((state) => state.user.language);
    const dispatch = useDispatch();
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const [orderLoading, setOrderLoading] = useState(false);
    const [market, setMarket] = useState(false);
    const [totalValue, setTotalValue] = useState<string | number>(0);
    const minimumTransactionsPrice = useSelector((state: any) => state.layout.minimumTransactionsPrice);
    const [orderBased, setOrderBased] = useState<boolean>(false);
    const { data: walletList, isLoading: isWalletLoading } = useWalletList();
    const { data: userQuickView } = useUserQuickView();
    const walletItems = Array.isArray(walletList)
        ? walletList
        : (Array.isArray(walletList?.data) ? walletList.data : []);
    const balanceAssetKeys = orderType
        ? [
            cryptoPair.destinationAssetSymbol,
            cryptoPair.destinationAssetEnglishTitle,
            cryptoPair.destinationAssetPersianTitle,
        ]
        : [
            cryptoPair.sourceAssetSymbol,
            cryptoPair.sourceAssetEnglishTitle,
            cryptoPair.sourceAssetPersianTitle,
        ];
    const normalizedBalanceAssetKeys = balanceAssetKeys
        .filter(Boolean)
        .map((value) => String(value).trim().toUpperCase());
    const walletAsset = walletItems.find((item) => {
        const walletAssetKeys = [
            item?.assetSymbol,
            item?.symbol,
            item?.assetEnglishTitle,
            item?.assetPersianTitle,
        ]
            .filter(Boolean)
            .map((value) => String(value).trim().toUpperCase());

        return walletAssetKeys.some((key) => normalizedBalanceAssetKeys.includes(key));
    });
    const walletBalance = Number(walletAsset?.totalTradable ?? 0);
    const exchangeFeePercent = Number(userQuickView?.userFinancialLevel?.exchangeFeePercent ?? 0);
    const [limitToggle, setLimitToggle] = useState(0);
    const orderEvent = new Event('order_submited');
    const handleLimitChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLimitToggle(newValue);
    };

    useEffect(() => {
        if ((volume && price) && (volume * price) !== totalValue && (volume * price) > 0) setTotalValue(cryptoPair.destinationAssetSymbol === 'TOMAN' ? (volume * price).toFixed(0) : (volume * price));
    }, [volume, price]);

    const {
        anchorEl, handleMenuClick, handleMenuClose, open,
    } = usesatrexMenu();

    useEffect(() => {
        if (!isWalletLoading) {
            handleMarketSelected();
        }
    }, [isWalletLoading]);

    const handleMarketOrder = async () => {
        setOrderLoading(true);
        if (volume <= 0) {
            setOrderLoading(false);
            return satrexToast(transFn('valueMustBe>0'), 'error');
        }
        const result = await setMarketOrder({
            orderType: orderType ? 'Buy' : 'Sell',
            pairId: cryptoPair.pairId,
            // @ts-ignore
            volume: upto2Decimal(volume),
        });
        if (result) {
            await queryClient.invalidateQueries('getAllSpotAssetsWithDetailsList');
            await dispatch(setTopbarValues());
            setOrderLoading(false);
            setVolume('');
            window.dispatchEvent(orderEvent);
        } else setOrderLoading(false);
    };
    // console.log('queryClient : ', queryClient.getQueryData('reportOrderList'));
    // console.log('orderType : ', orderType);
    const handleLimitOrder = async () => {
        setOrderLoading(true);
        if (volume <= 0) {
            setOrderLoading(false);
            return satrexToast(transFn('valueMustBe>0'), 'error');
        }
        if (price <= 0) {
            setOrderLoading(false);
            return satrexToast(transFn('priceMustBe>0'), 'error');
        }
        if ((volume * price < minimumTransactionsPrice) && (cryptoPair.destinationAssetSymbol === 'TOMAN')) {
            setOrderLoading(false);
            return satrexToast(lang === 'EN' ? `The minimum amount allowed for the transaction is ${minimumTransactionsPrice}` : (lang === 'FA' ? `حداقل مبلغ مجاز برای انجام معامله ${minimumTransactionsPrice} است` : ''), 'error');
        }
        const result = await setLimitOrder({
            orderType: orderType ? 'Buy' : 'Sell',
            pairId: cryptoPair.pairId,
            // @ts-ignore
            volume: upto2Decimal(volume),
            price,
        });
        if (result) {
            await dispatch(setTopbarValues());
            await queryClient.invalidateQueries('getAllSpotAssetsWithDetailsList');
            setOrderLoading(false);
            setVolume('');
            setPrice('');
            window.dispatchEvent(orderEvent);
        } else setOrderLoading(false);
    };

    const submitOrder = async () => {
        setOrderLoading(true);
        if (market) await handleMarketOrder();
        else await handleLimitOrder();
    };

    const getInventory = () => (
        orderType && cryptoPair.destinationAssetSymbol === 'TOMAN'
            ? Math.floor(walletBalance)
            : walletBalance
    );

    const handleSelectingMarket = (status: boolean) => {
        setMarket(status);
        handleMarketSelected();
    };

    return (
        <SatrexCard
            header="SendOrder"
            className="mb-8 cardContent"
            style={{
                width: '100%',
                height: containerHeight || 'auto',
                minHeight: containerHeight ? undefined : 520,
                position: 'relative',
                overflow: containerHeight ? 'hidden' : 'visible',
                display: 'flex',
                flexDirection: 'column',
            }}

        >
            <Grid
                container
                spacing={2}
                style={{
                    padding: '5%',
                    paddingTop: '50px',
                    height: containerHeight ? '100%' : 'auto',
                    overflowY: containerHeight ? 'auto' : 'visible',
                    direction: isEn ? 'ltr' : 'rtl',
                }}
            >
                <Grid className="satrexDiv" container spacing={2}>
                    <Grid size={12}>
                        <Grid style={{ height: 20 }} size={12}>
                            <Grid
                                container
                                style={{
                                    position: 'relative',
                                    top: '-27px',
                                    direction: isEn ? 'ltr' : 'rtl',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    columnGap: 8,
                                    rowGap: 8,
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Grid style={{ flex: '0 0 auto', minWidth: 120 }}>
                                    <Button
                                        disableElevation
                                        onClick={() => {
                                            setPrice('');
                                            setVolume('');
                                            setTotalValue('');
                                            setOrderType(true);
                                        }}
                                        className={
                                            orderType
                                                ? 'greenButton'
                                                : 'greenDashedButton'
                                        }
                                        style={{
                                            backgroundColor: !orderType && satrexTheme
                                                ? 'white'
                                                : (!orderType ? satrexDarkerBlueDarkMode : undefined),
                                        }}
                                        classes={{ root: classes.buyButton }}
                                        type="button"
                                        tabIndex={1}
                                        fullWidth
                                    >
                                        <span style={{ color: orderType ? 'white' : satrexGreen }}>
                                            <Trans>buy</Trans>
                                        </span>
                                    </Button>
                                </Grid>
                                <Grid style={{ flex: '0 0 auto', minWidth: 120 }}>
                                    <Button
                                        disableElevation
                                        onClick={() => {
                                            setPrice('');
                                            setVolume('');
                                            setTotalValue('');
                                            setOrderType(false);
                                        }}
                                        className={
                                            !orderType
                                                ? 'redButton'
                                                : 'redDashedButton'
                                        }
                                        style={{
                                            backgroundColor: orderType && satrexTheme
                                                ? 'white'
                                                : (orderType ? satrexDarkerBlueDarkMode : undefined),
                                        }}
                                        classes={{ root: classes.sellButton }}
                                        type="button"
                                        tabIndex={2}
                                        fullWidth
                                    >
                                        <span style={{ color: !orderType ? 'white' : satrexRed }}>
                                            <Trans>sell</Trans>
                                        </span>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid style={{ padding: '0px 4%', direction: isEn ? 'ltr' : 'rtl' }} size={12}>
                            <Divider style={{ color: satrexGray, top: 45 }} className="pr" />
                            <Tabs
                                value={limitToggle}
                                onChange={handleLimitChange}
                                aria-label="simple tabs example"
                                style={{
                                    height: 45,
                                    minHeight: 40,
                                    direction: isEn ? 'ltr' : 'rtl',
                                }}
                                classes={{
                                    indicator: classes.marketTypeIndicator,
                                }}
                            >
                                <Tab
                                    label="Limit"
                                    classes={{ selected: classes.marketTypeSelected, root: classes.marketTypeStyle }}
                                    onClick={() => handleSelectingMarket(false)}
                                />
                                <Tab
                                    label="Market"
                                    classes={{ selected: classes.marketTypeSelected, root: classes.marketTypeStyle }}
                                    onClick={() => handleSelectingMarket(true)}
                                />
                            </Tabs>
                        </Grid>
                        <Grid
                            container
                            className="flex column space-between"
                            style={{ minHeight: 320, direction: isEn ? 'ltr' : 'rtl' }}
                        >
                            <Grid
                                container
                                style={{
                                    padding: '0px 4%',
                                    rowGap: 12,
                                    alignItems: 'center',
                                }}
                                className="space-between"
                            >
                                <Grid
                                    style={{
                                        textAlign: isEn ? 'left' : 'right',
                                        marginTop: 12,
                                    }}
                                    size={{
                                        xs: 12,
                                        md: 5
                                    }}>
                                    <div className={classes.balancePanel}>
                                        <Trans>inventory</Trans>
                                        :&nbsp;
                                        <span>
                                            <SatrexNumFormat
                                                num={upto2Decimal(getInventory())}
                                            />
                                        </span>
                                        <span style={{ fontSize: '12px', marginInlineStart: 8 }}>
                                            {!orderType ? (isEn ? cryptoPair.sourceAssetEnglishTitle : cryptoPair.sourceAssetPersianTitle) : (isEn ? cryptoPair.destinationAssetEnglishTitle : cryptoPair.destinationAssetPersianTitle)}
                                        </span>
                                    </div>
                                </Grid>
                                <Grid
                                    className="flex middle"
                                    style={{ minHeight: 56, width: '100%' }}
                                    size={{
                                        xs: 12,
                                        md: 7
                                    }}
                                >

                                    <Grid
                                        container
                                        className="flex middle"
                                        style={{
                                            justifyContent: 'flex-start',
                                            direction: isEn ? 'ltr' : 'rtl',
                                            rowGap: 4,
                                        }}
                                    >
                                        <div className={classes.orderBasisGroup}>
                                            <span style={{ whiteSpace: 'nowrap' }}><Trans>Order type by</Trans></span>
                                            <Button
                                                disableElevation
                                                onClick={() => setOrderBased(false)}
                                                className={`${classes.orderBasisButton} ${!orderBased ? classes.orderBasisButtonActive : ''}`}
                                            >
                                                <Trans>amount</Trans>
                                            </Button>
                                            <Button
                                                disableElevation
                                                onClick={() => setOrderBased(true)}
                                                className={`${classes.orderBasisButton} ${orderBased ? classes.orderBasisButtonActive : ''}`}
                                            >
                                                <Trans>totalAmount</Trans>
                                            </Button>
                                        </div>

                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                style={{
                                    padding: '0 4%',
                                    justifyContent: isEn ? 'flex-start' : 'flex-end',
                                    marginBottom: 30,
                                }}
                            >
                                <Grid
                                    style={{ width: '100%' }}
                                    size={{ xs: 12, md: 6 }}
                                >
                                    {
                                        !isWalletLoading && lastPrice
                                        ? (
                                            // @ts-ignore
                                            (<VolumeSlider
                                                price={price}
                                                // @ts-ignore
                                                setPrice={setPrice}
                                                volume={volume}
                                                // @ts-ignore
                                                setVolume={setVolume}
                                                lastPrice={lastPrice}
                                                getInventory={getInventory}
                                                orderType={orderType}
                                                // @ts-ignore
                                                setTotalValue={setTotalValue}
                                            />)
                                        ) : null
                                    }

                                </Grid>

                            </Grid>

                            <Grid
                                style={{
                                    marginTop: '10px',
                                    transition: '0.3s',
                                    padding: '0px 4%',
                                    overflow: 'visible',
                                }}
                                size={12}>
                                <Grid container spacing={2} style={{ width: '100%', margin: 0 }}>
                                    <Grid
                                        className="pr"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            rowGap: 10,
                                            minHeight: 0,
                                        }}
                                        size={{
                                            xs: 12,
                                            md: 6
                                        }}>
                                        <AnimatePresence exitBeforeEnter initial={false}>
                                            {
                                                !orderBased
                                                && (
                                                    <OrderInputsAnimation>
                                                        <SatrexInput
                                                            label={transFn('amount')}
                                                            placeholder="0"
                                                            type="number"
                                                            inputValue={volume ? upto2Decimal(volume) : ''}
                                                            inputProps={{ tabIndex: 5 }}
                                                            classes={{ input: classes.orderInput }}
                                                            onChange={(e: any) => {
                                                                if (e.target.value >= 0) {
                                                                    const val = starkString(e.target.value.replace(/,/g, ''))
                                                                        .englishNumber()
                                                                        .toString();
                                                                    setVolume(val);
                                                                    if (val) setTotalValue(parseFloat(val) * price);
                                                                    else setTotalValue(0);
                                                                }
                                                            }}
                                                        />
                                                    </OrderInputsAnimation>
                                                )

                                            }
                                        </AnimatePresence>
                                        <AnimatePresence exitBeforeEnter initial={false}>
                                            {
                                                orderBased
                                                && (
                                                    <OrderInputsAnimation>
                                                        <SatrexInput
                                                            label={transFn('totalAmount')}
                                                            placeholder="0"
                                                            isMoney
                                                            inputValue={totalValue}
                                                            inputProps={{ tabIndex: 5 }}
                                                            classes={{ input: classes.orderInput }}
                                                            onChange={(e: any) => {
                                                                const val = starkString(e.target.value.replace(/,/g, ''))
                                                                    .englishNumber()
                                                                    .toString();
                                                                if (parseFloat(val) >= 0) {
                                                                    setTotalValue(parseFloat(parseFloat(val).toFixed(8)) * 1);
                                                                    // @ts-ignore
                                                                    if (price !== '' || price > 0) setVolume(parseFloat(val) / price);
                                                                    else {
                                                                        setVolume(Math.floor((parseFloat(val) * 100000000) / 100000000) / lastPrice);
                                                                        setPrice(lastPrice);
                                                                    }
                                                                }
                                                                if (e.target.value === '') {
                                                                    setVolume(0);
                                                                    setTotalValue('');
                                                                    setPrice(lastPrice);
                                                                }
                                                            }}
                                                        />
                                                    </OrderInputsAnimation>
                                                )

                                            }
                                        </AnimatePresence>
                                    </Grid>
                                    <Grid
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            minHeight: 0,
                                        }}
                                        size={{
                                            xs: 12,
                                            md: 6
                                        }}>
                                        <SatrexInput
                                            label={transFn('Price')}
                                            inputValue={!market ? price : ''}
                                            isMoney
                                            isDisabled={market || isWalletLoading}
                                            inputProps={{ tabIndex: 6 }}
                                            placeholder="0"
                                            classes={{ input: classes.priceInput }}
                                            onChange={(e: any) => {
                                                if (e.target.value.length < 20) {
                                                    const val = starkString(e.target.value.replace(/,/g, ''))
                                                        .englishNumber()
                                                        .toString();
                                                    setPrice(val);
                                                    // @ts-ignore
                                                    if (orderBased) setVolume((Math.floor(parseFloat(totalValue) / parseFloat(val)) * 100000000) / 100000000);
                                                    else setTotalValue(parseFloat(val) * volume);
                                                }
                                            }}
                                        />
                                    </Grid>
                                    {
                                        price > 0 && !market
                                        && (
                                            <Grid
                                                style={{
                                                    textAlign: 'right',
                                                    minHeight: 40,
                                                }}
                                                size={12}>
                                                {
                                                    // parseFloat(volume)
                                                    cryptoPair.destinationAssetPersianTitle === 'تومان' && `${starkString((price * 1).toFixed(0))
                                                        .digitsToWords()
                                                        .toString()} ${!isEn ? cryptoPair.destinationAssetPersianTitle : cryptoPair.destinationAssetEnglishTitle} `
                                                }
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>

                            <Grid container style={{ padding: '0px 4%', minHeight: 69 }} className="space-between">

                                {
                                    !market && !isWalletLoading && price > 0
                                    && (
                                        <>
                                            <AnimatePresence exitBeforeEnter initial={false}>
                                                {
                                                    !orderBased
                                                    && (
                                                        <OrderInputsAnimation className="flex middle">
                                                            <Trans>transactionValue</Trans>
                                                            :&nbsp;
                                                            <span>
                                    <SatrexNumFormat
                                        // @ts-ignore
                                        num={totalValue}
                                    />
                                                            </span>
                                                            <span
                                                                style={{ fontSize: '12px' }}
                                                            >
                                    &nbsp;&nbsp;&nbsp;
                                                                {(lang === 'EN' ? cryptoPair.destinationAssetEnglishTitle : cryptoPair.destinationAssetPersianTitle)}
                                                            </span>
                                                        </OrderInputsAnimation>

                                                    )
                                                }
                                            </AnimatePresence>

                                            <AnimatePresence exitBeforeEnter initial={false}>
                                                {
                                                    orderBased
                                                    && (
                                                        <OrderInputsAnimation className="flex middle">

                                                            <Trans>amount</Trans>
                                                            :&nbsp;
                                                            <span>
                                    <SatrexNumFormat
                                        num={volume}
                                    />
                                                            </span>
                                                        </OrderInputsAnimation>
                                                    )
                                                }
                                            </AnimatePresence>

                                            <div className="flex middle">

                                                <Trans>fee</Trans>
                                                :&nbsp;
                                                <span className={!isEn ? '' : 'enNum'}>
                                {
                                    !orderType
                                        ? (

                                            <SatrexNumFormat
                                                // @ts-ignore
                                                num={(((exchangeFeePercent / 100) * (orderType ? volume : (price * volume))).toFixed(8) * 1)}
                                            />
                                        )
                                        : (

                                            <SatrexNumFormat
                                                // @ts-ignore
                                                num={(((exchangeFeePercent / 100) * (orderType ? volume : (price * volume))).toFixed(8) * 1)}
                                            />
                                        )
                                }
                                                </span>
                                                <span
                                                    style={{ fontSize: '12px' }}
                                                >
                                    &nbsp;&nbsp;&nbsp;
                                                    {orderType ? (lang === 'EN' ? cryptoPair.sourceAssetEnglishTitle : cryptoPair.sourceAssetPersianTitle) : (lang === 'EN' ? cryptoPair.destinationAssetEnglishTitle : cryptoPair.destinationAssetPersianTitle)}
                                                </span>
                                            </div>
                                            <div className="flex middle">
                                                <span><Trans>UserDeposit</Trans></span>
                                                :&nbsp;
                                                <span>
                                {!orderType
                                    ? (
                                        <SatrexNumFormat
                                            num={(orderType ? 1 : price) * volume
                                                - (exchangeFeePercent / 100)
                                                * (orderType ? volume : (price * volume))}
                                        />
                                    )

                                    : (
                                        // @ts-ignore
                                        (<SatrexNumFormat num={((orderType ? 1 : price) * volume
                                            - (exchangeFeePercent / 100)
                                            * (orderType ? volume : (price * volume))).toFixed(8) * 1}
                                        />)
                                    )}
                                                </span>
                                                <span
                                                    style={{ fontSize: '12px' }}
                                                >
                                    &nbsp;&nbsp;&nbsp;
                                                    {orderType ? (lang === 'EN' ? cryptoPair.sourceAssetEnglishTitle : cryptoPair.sourceAssetPersianTitle) : (lang === 'EN' ? cryptoPair.destinationAssetEnglishTitle : cryptoPair.destinationAssetPersianTitle)}
                                                </span>
                                            </div>
                                        </>
                                    )
                                }
                            </Grid>

                        </Grid>
                        <Grid style={{ padding: '0 4%', paddingBottom: '5%' }} size={12}>
                            {orderType && (
                                <LoadingButton loading={orderLoading}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ color: 'white', width: '100%' }}
                                        className="greenButton bgGreenColor"
                                        type="button"
                                        tabIndex={7}
                                        onClick={submitOrder}
                                        disabled={orderLoading}
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}

                                    >
                                        <Trans>buy</Trans>
                                    </Button>
                                </LoadingButton>
                            )}
                            {!orderType && (
                                <LoadingButton loading={orderLoading}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        style={{ color: 'white', width: '100%' }}
                                        className="redButton bgGreenColor"
                                        type="button"
                                        tabIndex={7}
                                        onClick={submitOrder}
                                        disabled={orderLoading}
                                        classes={{
                                            disabled: classes.buttonDisabled,
                                        }}

                                    >
                                        <Trans>sell</Trans>
                                    </Button>
                                </LoadingButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SatrexCard>
    );
};

export default SetOrderBox;
