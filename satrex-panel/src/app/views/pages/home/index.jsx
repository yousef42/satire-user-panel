import React, { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import useStyles from './styles';
import DashboardWallet from './dashboardWallet';
import BalanceChart from './balanceChart';
import Trans from '../../../components/lang';
import {
    satrexGreen,
    satrexRed,
    satrexBlack,
} from '../../../../styles/colors';
import SatrexCard from '../../../components/SatrexCard';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import AnimatedPage from '../../../components/AnimatedPage';
import {
    useDailyBalanceInfo, useUserInfo, useWalletInfo,
} from '../../../../utils/queries';
import IrtMarkets from './irtMarkets';
import LevelChart from '../../../components/LevelChart';
import AnimatedBox from '../../../components/AnimatedBox';
import PercentageFormater from '../../../components/PercentageFormater';

export default function () {
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles();
    const history = useHistory();

    const [extraHeight, setExtraHeight] = React.useState(0);
    const [userInfoHeight, setUserInfoHeight] = React.useState(0);
    const userInfoRef = useRef(null);
    const { data: balances, isLoading } = useDailyBalanceInfo();
    const { data: userInfo } = useUserInfo();
    const { data: walletInfo } = useWalletInfo();
    const userFinancialLevel = userInfo?.userFinancialLevel;
    const openOrders = userInfo?.openOrders || {};
    const buyOpenOrdersCount = Number(openOrders?.buyOpenOrdersCount || 0);
    const sellOpenOrdersCount = Number(openOrders?.sellOpenOrdersCount || 0);
    const totalOpenOrdersCount = buyOpenOrdersCount + sellOpenOrdersCount;
    const totalCompletedTradesPriceForLast30DaysInToman = Number(
        userInfo?.totalCompletedTradesPriceForLast30DaysInToman || 0,
    );
    const totalFundInToman = Number(walletInfo?.totalFundInToman || 0);
    const totalFundInTether = Number(walletInfo?.totalFundInTether || 0);
    const selectedMarket = useSelector((state) => state.coin.selectedMarket);
    const selectedMarketPairSlug = (() => {
        const pairSymbol = selectedMarket?.pairSymbol;
        if (typeof pairSymbol === 'string' && pairSymbol.includes('/')) {
            return pairSymbol.toLowerCase().replace('/', '-');
        }
        if (typeof pairSymbol === 'string' && pairSymbol.includes('-')) {
            return pairSymbol.toLowerCase();
        }
        if (selectedMarket?.sourceAssetSymbol && selectedMarket?.destinationAssetSymbol) {
            return `${String(selectedMarket.sourceAssetSymbol).toLowerCase()}-${String(selectedMarket.destinationAssetSymbol).toLowerCase()}`;
        }
        // Fallback to a commonly supported market. Adjust if your default differs.
        return 'btc-usdt';
    })();

    useEffect(() => {
        const target = userInfoRef.current;
        if (!target) return undefined;

        const updateHeight = () => {
            setUserInfoHeight(target.getBoundingClientRect().height || 0);
        };

        updateHeight();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', updateHeight);
            return () => {
                window.removeEventListener('resize', updateHeight);
            };
        }

        const observer = new ResizeObserver(() => {
            updateHeight();
        });
        observer.observe(target);

        window.addEventListener('resize', updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateHeight);
        };
    }, [level?.code, userInfo, walletInfo, lang]);

    const walletPanelHeight = userInfoHeight > 0
        ? Math.max(userInfoHeight - 64 + extraHeight, 520)
        : 520;

    return (
        <AnimatedPage>
            <div>
                <Grid container style={{ marginTop: '20px' }} spacing={2}>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 5
                        }}>
                        <Grid container spacing={1} ref={userInfoRef}>
                            <Grid size={12}>

                                <AnimatedBox>
                                    <LevelChart variant="dashboard-level" levelCode={level?.code} />
                                </AnimatedBox>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox className={classes.miniCard}>
                                        <div className=" colorWhite" style={{ fontSize: 16 }}>
                                            {/* <Trans>YourUserlevel</Trans> */}
                                            <Trans>Referral percentage to friends</Trans>
                                        </div>
                                        <div
                                            style={{ fontSize: '20px', color: satrexBlack }}
                                            className="colorWhite"
                                        >
                                            {
                                                userInfo
                                                && <PercentageFormater style={{ fontSize: '20px', color: satrexGreen }} value={userInfo?.referralShare?.referralSharePercentage} />
                                            }
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox className={classes.miniCard}>
                                        <div className="colorWhite" style={{ fontSize: 16 }}>
                                            <Trans>YourTransactionFee</Trans>
                                        </div>
                                        <div>
                                            {
                                                userInfo
                                                && <PercentageFormater style={{ fontSize: '20px', color: satrexGreen }} value={userFinancialLevel?.exchangeFeePercent || 0} />
                                            }
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox
                                        className={classes.miniCard}

                                    >
                                        <div
                                            className="colorWhite"
                                            style={{ whiteSpace: 'nowrap', fontSize: 16 }}
                                        >
                                            <Trans>DailyWithdrawalCeiling</Trans>
                                        </div>

                                        <div
                                            className={`${
                                                classes.miniCardInfo
                                            }`}
                                        >
                                            {userFinancialLevel
                                                ? new Intl.NumberFormat().format(
                                                    userFinancialLevel.maximumWithdrawalPerDayInToman || 0,
                                                )
                                                : 0}
                                            (
                                            <Trans>toman</Trans>
                                            )
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox
                                        className={classes.miniCard}
                                    >
                                        <div
                                            className=" colorWhite miniCardTitle"
                                            style={{ whiteSpace: 'nowrap', fontSize: 16 }}
                                        >
                                            <Trans>DailyCryptoWithdrawalCeiling</Trans>
                                        </div>
                                        <div
                                            className={` ${
                                                classes.miniCardInfo
                                            }`}
                                        >
                                            {userFinancialLevel
                                                ? new Intl.NumberFormat().format(
                                                    userFinancialLevel.maximumWithdrawalPerDayInNonTomanAssets || 0,
                                                )
                                                : 0}
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox
                                        className={classes.miniCard}
                                        style={{ cursor: 'pointer' }}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => {
                                            history.push(`/market/${selectedMarketPairSlug}#open-orders`);
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' || event.key === ' ') {
                                                history.push(`/market/${selectedMarketPairSlug}#open-orders`);
                                            }
                                        }}
                                    >
                                        <div className="colorWhite " style={{ whiteSpace: 'nowrap', fontSize: 16 }}>
                                            <Trans>NumberOfOpenOrders</Trans>
                                        </div>
                                        <div
                                            style={{ fontSize: '20px', color: satrexRed }}
                                            className={`${!isEn ? '' : 'enNum'}`}
                                        >
                                            {totalOpenOrdersCount}
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <AnimatedBox
                                        className={classes.miniCard}
                                    >
                                        <div
                                            className="colorWhite"
                                            style={{ whiteSpace: 'nowrap', fontSize: 16 }}
                                        >
                                            <Trans>ValueOfTransactionsInTheLast30Days</Trans>
                                        </div>
                                        <div
                                            className={`${!isEn ? '' : 'enNum'} ${
                                                classes.miniCardInfo
                                            }`}
                                        >
                                            {totalCompletedTradesPriceForLast30DaysInToman > 0
                                                ? (
                                                    <SatrexNumFormat
                                                        num={totalCompletedTradesPriceForLast30DaysInToman.toFixed(0)}
                                                    />
                                                )
                                                : 0}
                                        </div>
                                    </AnimatedBox>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <div
                                        className={`satrexDiv ${classes.miniCard} `}
                                    >
                                        {' '}
                                        <div
                                            style={{ color: satrexGreen, whiteSpace: 'nowrap', fontSize: 16 }}
                                        >
                                            <Trans>NumberOfOpenBuyOrders</Trans>
                                        </div>
                                        <div
                                            className={`${!isEn ? '' : 'enNum'} ${
                                                classes.miniCardInfo
                                            }`}
                                            style={{ color: satrexGreen, fontSize: 20 }}
                                        >
                                            {buyOpenOrdersCount}
                                        </div>
                                    </div>
                                </center>
                            </Grid>
                            <Grid size={6}>
                                <center>
                                    <div
                                        className={`satrexRedDiv ${classes.miniCard} miniCardTitle`}

                                    >
                                        {' '}
                                        <div
                                            style={{
                                                fontSize: isEn ? '12px !important' : 14,
                                                color: satrexRed,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            <Trans>NumberOfOpenSellOrders</Trans>
                                        </div>
                                        <div
                                            className={`${!isEn ? '' : 'enNum'} `}
                                            style={{ color: satrexRed, fontSize: 20 }}
                                        >
                                            {sellOpenOrdersCount}
                                        </div>
                                    </div>
                                </center>
                            </Grid>
                        </Grid>
                    </Grid>
                    <style>
                        {`
                          .miniCardTitle {
                            font-size: ${isEn ? `${parseInt(document.documentElement.clientWidth / 100) - 1}px` : `${16}px`} !important;
                          }

                        `}
                    </style>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 7
                        }}>
                        <SatrexCard header="WalletStatus">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 13,
                                minHeight: walletPanelHeight,
                                height: walletPanelHeight,
                                overflow: 'hidden',
                                position: 'relative',
                                transition: '0.3s',
                            }}
                            >
                                <Grid container className="dashboardWalletDiv" style={{ padding: '3%' }}>
                                    <Grid size={6}>
                                        <div
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                            data-tut="dashboardTotalVolumeInToman"
                                        >
                                            <h2 className={`${!isEn ? '' : 'enNum'}`}>
                                                {walletInfo && (
                                                    <SatrexNumFormat
                                                        num={totalFundInToman.toFixed(0)}
                                                    />
                                                )}
                                            </h2>
                                            <span style={{ fontSize: '18px' }}>
                    <Trans>YourTotalAssets</Trans>
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid
                                        style={{
                                            textAlign: !isEn ? 'left' : 'right',
                                            paddingLeft: '3%',
                                            marginTop: '3%',
                                        }}
                                        size={6}>
                                        <label
                                            className={`${!isEn ? '' : 'enNum'}`}
                                            style={{
                                                color: '#3a88d7',
                                                height: '20px',
                                                border: 'solid 1px #3a88d7',
                                                borderRadius: '8px',
                                                padding: '5px',
                                                paddingRight: '20px',
                                                paddingLeft: '20px',
                                                fontSize: '15px',
                                            }}
                                            data-tut="dashboardTotalVolumeInTether"
                                        >
                                            {walletInfo && (
                                                <SatrexNumFormat
                                                    num={totalFundInTether}
                                                />
                                            )}
                                            &nbsp;&nbsp;
                                            <Trans>tether</Trans>

                                        </label>

                                    </Grid>
                                </Grid>
                                <div className="dashboardWalletChart" data-tut="dashboardWalletChart">
                                    {
                                        balances
                                        && (
                                            <BalanceChart
                                                balances={balances.balances}
                                                style={{ width: '100%', transition: '0.3s' }}
                                            />
                                        )
                                    }
                                    {
                                        isLoading && (
                                            <div className="row column center" style={{ alignItems: 'center' }}>
                                                <Skeleton variant="text" width="96%" height={4} style={{ marginTop: '4%' }} />
                                                <Skeleton variant="text" width="96%" height={4} style={{ marginTop: '4%' }} />
                                                <Skeleton variant="text" width="96%" height={4} style={{ marginTop: '4%' }} />
                                                <Skeleton variant="text" width="96%" height={4} style={{ marginTop: '4%' }} />
                                                <Skeleton variant="text" width="96%" height={4} style={{ marginTop: '4%' }} />
                                            </div>
                                        )
                                    }

                                </div>
                                <div style={{ flexGrow: 1, marginTop: -52 }} data-tut="dashboardWalletList">
                                    <DashboardWallet setExtraHeight={setExtraHeight} />
                                </div>

                            </div>
                        </SatrexCard>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '20px' }}>
                    <Grid size={12}>
                        <IrtMarkets />
                    </Grid>
                </Grid>
            </div>
        </AnimatedPage>
    );
}
