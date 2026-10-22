import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss';
import { Card, useMediaQuery } from '@mui/material';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistoryCompat as useHistory } from '../router/routerCompat';
import SwiperCore, {
    Autoplay, Navigation,
} from 'swiper';
import { motion } from 'framer-motion';
import Trans from './lang';
import { selectMarketPair } from '../redux/actions/CoinActions';
import satrexNumFormat from './satrexNumFormat';
import PercentageFormater from './PercentageFormater';

SwiperCore.use([Autoplay, Navigation]);

const slider = () => {
    const xs = useMediaQuery('(min-width:0px)');
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const xxl = useMediaQuery('(min-width:1600px)');
    const xxxl = useMediaQuery('(min-width:2000px)');
    // const coinPaprikaList = useSelector((state) => state.coin.coinPaprikaList);
    // const dollarPrice = useSelector((state) => state.coin.dollarPrice);
    // const coinLogos = useSelector((state) => state.coin.coinLogos);
    const sidebarToggle = useSelector((state) => state.layout.sidebarToggle);
    const lang = useSelector((state) => state.user.language);
    const [coinPriceChanger, setCoinPriceChanger] = useState(false);
    const pairList = useSelector((state) => state.coin.supportedCoinList);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const getSlidesCount = () => {
        if (xxxl) return 5;
        if (xxl) return 5;
        if (xl) return 4;
        if (lg) return 3;
        if (sm) return 2;
        if (xs) return 1;
        // if(count === 0 || xl){
        //   if (window.screen.availWidth < 1370) {
        //     setCount(4);
        //   } else if (xxl) {
        //     setCount(6);
        //   } else setCount(5);
        //   if (!sidebarToggle && window.screen.availWidth >= 1200)
        //     setCount((count) => count + 1);
        // }
    };

    // console.log('pairList : ', pairList);

    useEffect(() => {
        let isMounted = true;
        let coinPriceChangerLoop;
        if (isMounted) {
            coinPriceChangerLoop = setInterval(() => {
                setCoinPriceChanger((state) => !state);
            }, 6000);

            setTimeout(() => {
                if (!sidebarToggle && xl) setCount(getSlidesCount() + 1);
                else setCount(getSlidesCount());
            }, 1000);
        }

        return () => {
            clearInterval(coinPriceChangerLoop);
            isMounted = false;
        };
    }, [sidebarToggle, xxxl, xxl, xl, lg, xs, sm]);

    return (
        <>
            {
                pairList && (
                    <Swiper
                        style={{ direction: 'ltr', marginTop: '0.75%' }}
                        speed={1000}
                        slidesPerView={count}
                        centeredSlides={false}
                        spaceBetween={10}
                        slidesPerGroup={1}
                        loop
                        loopFillGroupWithBlank
                        navigation
                        className="mySwiper"
                        data-tut="sliderTour"
                    >
                        {
                            pairList.filter((item) => item.destinationAssetSymbol === 'TOMAN').map((coin, index) => (
                                <SwiperSlide
                                    key={coin.sourceAssetSymbol}
                                    style={{ transition: '0.5s', width: '20%', cursor: 'pointer' }}
                                    onClick={() => {
                                        dispatch(selectMarketPair(pairList.filter((item) => (item.destinationAssetEnglishTitle).toLowerCase() === (coin.sourceAssetSymbol).toLowerCase() && (item.sourceAssetSymbol).toLowerCase() === 'toman')[0]));
                                        localStorage.setItem('selectedPair', '');
                                        history.push({
                                            pathname: `/market/${(coin.sourceAssetSymbol).toLowerCase()}-toman`,
                                        });
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index / 10 }}
                                    >
                                        <Card
                                            className="sliderDiv borderR9 "
                                            style={{ height: '56px' }}
                                        >
                                            <Grid container style={{ height: '100%', paddingLeft: '5%' }}>
                                                <Grid style={{ height: '100%', width: '21%' }} size={3}>
                                                    <img
                                                        src={coin.sourceAssetImageAddress}
                                                        alt=""
                                                        className="sliderLogo"
                                                    />
                                                </Grid>
                                                <Grid style={{ marginTop: '9px', width: isEn ? '23%' : '30%' }}>
                                                    <span style={{ fontWeight: 'bold' }}>{coin.sourceAssetSymbol}</span>
                                                </Grid>

                                                <Grid size={5}>
                                                    <Grid container>
                                                        <Grid
                                                            style={{
                                                                marginTop: '1px',
                                                                position: 'relative',
                                                                top: !coinPriceChanger ? '-10px' : '-1px',
                                                            }}
                                                            className={`animate__animated ${
                                                                coinPriceChanger
                                                                    ? 'animate__fadeInUp'
                                                                    : 'animate__slideOutUp'
                                                            }`}
                                                            size={12}>
                                                            <center>
                                                                <div className={`${!isEn ? ' ' : 'enNum'}`}>
                                                                    &nbsp;₮&nbsp;
                                                                    <satrexNumFormat
                                                                        num={coin.lastPriceInTether}
                                                                    />
                                                                </div>

                                                                <div className="flex center">
                                                                    <PercentageFormater
                                                                        value={(coin.changeForLastIn24HoursInPercent).toFixed(4)}
                                                                    />
                                                                </div>

                                                            </center>
                                                        </Grid>
                                                        <Grid
                                                            style={{
                                                                position: 'relative',
                                                                top: !coinPriceChanger ? '-43px' : '-47px',
                                                            }}
                                                            className={`animate__animated ${
                                                                !coinPriceChanger
                                                                    ? 'animate__fadeInUp'
                                                                    : 'animate__slideOutUp'
                                                            }`}
                                                            size={12}>
                                                            <center>
                                                                <div
                                                                    style={{
                                                                        direction: !isEn ? 'rtl' : 'ltr',
                                                                        textAlign: 'left',
                                                                    }}
                                                                    className={`${!isEn ? ' ' : 'enNum'} flex center`}
                                                                >
                                                                    <satrexNumFormat
                                                                        num={
                                                                            coin.lastPriceInToman
                                                                        }
                                                                    />
                                                                    <span style={{ fontSize: 11 }}>
                                                                    &nbsp;
                                                                        <Trans>toman</Trans>
                                                                        &nbsp;
                                                                    </span>
                                                                </div>
                                                                <div className="flex center">
                                                                    <PercentageFormater
                                                                        value={(coin.changeForLastIn24HoursInPercent).toFixed(4)}
                                                                    />
                                                                </div>
                                                            </center>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </motion.div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
            }
        </>
    );
};
export default slider;
