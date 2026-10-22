import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import {
    Card, useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material'; import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TopBarProgress from 'react-topbar-progress-indicator';
import { useTour } from '@reactour/tour';
import { useQueryClient } from 'react-query';
import SellOrders from './OrdersList';

import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiGray,
} from '../../../../styles/colors';
import MatchedOrderBoard from './matchedOrderBoard';
import {
    changeSidebarToggle,
} from '../../../redux/actions/LayoutActions';
import { selectMarketPair } from '../../../redux/actions/CoinActions';
import OpenOrders from './openOrders';
import TodayOrders from './todayOrders';
// import tetherLogo from '../../../../images/coinLogo/USDT.svg'
import AnimatedPage from '../../../components/AnimatedPage';
import { numberWithCommas } from '../../../../utils/helpers/numberWithCommas';
import TradeChart from './TradeChart';
import SummaryBoard from './SummaryBoard';
import SetOrderBox from './SetOrderBox';
import Loading from '../../../../matx/components/MatxLoadable/Loading.jsx';
import tourLoader from '../../../../utils/helpers/tourLoader';

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
}));
export default function () {
    const [volume, setVolume] = useState('');
    const [price, setPrice] = useState('');
    const [choosedMarket, setChoosedMarket] = useState([]);
    const [market, setMarket] = useState(false);
    const cryptoPair = useSelector((state) => state.coin.selectedMarket);
    const [lastPrice, setLastPrice] = useState('');
    const [lastPriceColor, setLastPriceColor] = useState(satrexGray);
    const coinList = useSelector((state) => state.coin.coinPaprikaList);
    const supportedCoinList = useSelector((state) => state.coin.supportedCoinList);
    const sidebarStatus = useSelector((state) => state.layout.sidebarToggle);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const [tradingViewWidth, setTradingViewWidth] = useState(0);
    const [topSectionHeight, setTopSectionHeight] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const chartBoxRef = useRef();
    const centerColumnRef = useRef();
    const { setIsOpen, setSteps } = useTour();
    const queryClient = useQueryClient();
    const handleMarketSelected = () => {
        setTimeout(() => {
            setTopSectionHeight(centerColumnRef.current ? centerColumnRef.current.clientHeight : null);
        }, 300);
    };

    useEffect(() => {
       const ordersRefresher = setInterval(async () => {
           await queryClient.invalidateQueries('reportOrderList');
       }, 5000);
        return () => {
           clearInterval(ordersRefresher);
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        const syncTopSection = () => {
            if (chartBoxRef.current) {
                setTradingViewWidth(chartBoxRef.current.clientWidth - 10);
            }
            if (centerColumnRef.current) {
                setTopSectionHeight(centerColumnRef.current.clientHeight);
            }
        };
        if (isMounted) {
            tourLoader(setIsOpen, setSteps, 'market');
            setTradingViewWidth(null);
            setTimeout(syncTopSection, 1000);
            window.addEventListener('resize', syncTopSection);
        }
        return () => {
            window.removeEventListener('resize', syncTopSection);
            isMounted = false;
        };
    }, [sidebarStatus, params, cryptoPair]);

    useEffect(() => {
        // Support deep-linking to sections (e.g. /market/eth-usdt#open-orders)
        const hash = (window.location.hash || '').replace('#', '');
        if (!hash) return;

        // Wait for layout + data to render.
        const t = setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 600);

        return () => clearTimeout(t);
    }, [cryptoPair?.pairId, params?.id]);

    // console.log('chartBoxRef : ', );
    useEffect(() => {
        if (!cryptoPair && supportedCoinList) {
            const [srcPair, desPair] = (params.id).split('-');
            dispatch(selectMarketPair(supportedCoinList.filter((item) => (item.destinationAssetSymbol).toLowerCase() === desPair && (item.sourceAssetSymbol).toLowerCase() === srcPair)[0]));
        }
    }, [supportedCoinList]);

    const fixingLayout = async () => {
        setChoosedMarket(
            coinList.filter((item) => item.symbol === cryptoPair.sourceAssetSymbol)[0],
        );
        await dispatch(changeSidebarToggle(false));
        setTimeout(() => {
            document.getElementById('content').scroll({
                top: 68,
                behavior: 'smooth',
            });
        }, 400);
        handleMarketSelected();
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (cryptoPair && cryptoPair.pairSymbol) {
                fixingLayout();
            }
        }
        return () => {
            dispatch(changeSidebarToggle(true));
            isMounted = false;
        };
    }, [choosedMarket, cryptoPair]);

    const lg = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    const leftSidebarWidth = lg ? '20.6%' : (!sm ? '100%' : '50%');
    const rightSidebarWidth = lg ? '20.6%' : (!sm ? '100%' : '50%');
    const darkCardStyle = !satrexTheme
        ? { backgroundColor: satrexDarkerBlueDarkMode, border: `1px solid ${satrexBorderDarkColor}` }
        : {};

    return (
        <AnimatedPage>
            {
                !cryptoPair && (
                    <>
                        <TopBarProgress />
                        <Loading />
                    </>
                )
            }
            {cryptoPair && (
                <center>
                    <Helmet>
                        <title>
                            {JSON.stringify(
                                `${numberWithCommas(lastPrice)
                                } | ${cryptoPair?.pairSymbol}`,
                            )}
                        </title>

                    </Helmet>
                    <div style={{ marginTop: '8px' }} className="satrexLazyload">
                        <Grid container spacing={1}>
                            <Grid size={12} style={{ order: 1 }}>
                                <Grid
                                    container
                                    spacing={1}
                                    style={{
                                        alignItems: 'stretch',
                                        direction: 'ltr',
                                        justifyContent: lg ? 'flex-end' : 'flex-start',
                                        flexWrap: lg ? 'nowrap' : 'wrap',
                                    }}
                                >
                                    <Grid
                                        style={{
                                            width: !lg ? leftSidebarWidth : undefined,
                                            flex: lg ? `0 0 ${leftSidebarWidth}` : undefined,
                                            maxWidth: lg ? leftSidebarWidth : undefined,
                                            order: lg ? 1 : 3,
                                            display: 'flex',
                                        }}
                                    >
                                        {
                                            cryptoPair
                                            && (
                                                <div style={{ width: '100%' }}>
                                                    <SellOrders
                                                        pair={cryptoPair.pairId}
                                                        setPrice={setPrice}
                                                        setVolume={setVolume}
                                                        containerHeight={topSectionHeight}
                                                        setLastPrice={setLastPrice}
                                                        setLastPriceColor={setLastPriceColor}
                                                    />
                                                </div>
                                            )
                                        }
                                    </Grid>

                                    <Grid
                                        style={{
                                            width: !lg ? '100%' : undefined,
                                            flex: lg ? '1 1 0%' : undefined,
                                            minWidth: 0,
                                            order: lg ? 2 : 1,
                                        }}
                                    >
                                        <div
                                            ref={centerColumnRef}
                                            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                                        >
                                            <Card className="mb-8 contentCard" style={{ padding: 0, flex: '0 0 auto', ...darkCardStyle }}>
                                                {cryptoPair && (
                                                    <SummaryBoard
                                                        cryptoPair={cryptoPair}
                                                        lastPriceColor={lastPriceColor}
                                                        lastPrice={lastPrice}
                                                    />
                                                )}
                                            </Card>
                                            <div ref={chartBoxRef}>
                                                <Card className="mb-8 chartCard" style={{ minHeight: 362, ...darkCardStyle }}>
                                                    <TradeChart
                                                        cryptoPair={cryptoPair}
                                                        tradingViewWidth={tradingViewWidth}
                                                    />
                                                </Card>
                                            </div>
                                            <SetOrderBox
                                                cryptoPair={cryptoPair}
                                                price={price}
                                                volume={volume}
                                                setPrice={setPrice}
                                                setVolume={setVolume}
                                                lastPrice={lastPrice}
                                                supportedCoinList={supportedCoinList}
                                                handleMarketSelected={handleMarketSelected}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid
                                        style={{
                                            width: !lg ? rightSidebarWidth : undefined,
                                            flex: lg ? `0 0 ${rightSidebarWidth}` : undefined,
                                            maxWidth: lg ? rightSidebarWidth : undefined,
                                            order: lg ? 3 : 2,
                                            display: 'flex',
                                        }}
                                    >
                                        {
                                            cryptoPair
                                            && (
                                                <div style={{ width: '100%' }}>
                                                    <MatchedOrderBoard
                                                        pair={cryptoPair.pairId}
                                                        orderType={market}
                                                        maxTableHeight={topSectionHeight}
                                                    />
                                                </div>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid style={{ order: 4 }} size={12} id="open-orders">
                                {
                                    cryptoPair
                                    && <OpenOrders pairId={cryptoPair.pairId} />
                                }
                            </Grid>
                            <Grid style={{ order: 5 }} size={12}>
                                {
                                    cryptoPair
                                    && <TodayOrders pairId={cryptoPair.pairId} />
                                }
                            </Grid>
                        </Grid>
                    </div>
                </center>
            )}
        </AnimatedPage>
    );
}
