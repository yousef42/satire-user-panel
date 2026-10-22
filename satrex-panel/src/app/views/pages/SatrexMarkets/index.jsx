import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import _ from "lodash"
import { selectMarketPair } from '../../../redux/actions/CoinActions';
import SatrexTable from '../../../components/Table/SatrexTable';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import history from '../../../../history';
import satrexNumFormat from '../../../components/satrexNumFormat';
import Trans from '../../../components/lang';
import TableRowPlaceholder from '../../../components/Table/TableRowPlaceholder';
import { useNoAuthMarketList } from '../../../../utils/queries';
import PercentageFormater from '../../../components/PercentageFormater';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
} from '../../../../styles/colors';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function FullWidthTabs() {
    const [value, setValue] = React.useState(0);
    const [cryptoSearch, setCryptoSearch] = React.useState('');
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.user.language);
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const pairList = useSelector((state) => state.coin.supportedCoinList);
    const { data: coinlist, isLoading: loading } = useNoAuthMarketList();
    const pageBackgroundColor = (extraTheme !== true && extraTheme)
        ? (ThemeAtrr(extraTheme)?.contentStyle?.backgroundColor
            || ThemeAtrr(extraTheme)?.cardStyle?.backgroundColor)
        : (!satrexTheme ? satrexDarkerBlueDarkMode : 'white');
    const pageBorderColor = satrexTheme ? '#ececec' : satrexBorderDarkColor;

    const redirectToMarket = (pair) => {
        const [srcPair, desPair] = (pair).split('-');
        // console.log(pairList.filter(item=>(item.destinationAssetSymbol).toLowerCase() === desPair && (item.sourceAssetSymbol).toLowerCase() === srcPair)[0])
        dispatch(selectMarketPair(coinlist.filter((item) => (item.destinationAssetSymbol).toLowerCase() === desPair && (item.sourceAssetSymbol).toLowerCase() === srcPair)[0]));
        // localStorage.setItem("selectedPair", asset);
        history.push({
            pathname: `/market/${pair}`,
        });
    };

    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setMounted(true);
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div
            style={{
                width: '100vw',
                minWidth: '100%',
                height: '100vh',
                minHeight: '100%',
                backgroundColor: pageBackgroundColor,
            }}
            className={`${isEn ? 'enApp' : 'faApp'} satrexMarketStyles ${satrexTheme ? 'marketThemeLight' : 'marketThemeDark'}`}
        >
            <div
                style={{
                    padding: 20,
                    minHeight: '100%',
                    backgroundColor: pageBackgroundColor,
                    border: `solid 1px ${pageBorderColor}`,
                    borderRadius: 16,
                }}
            >
                <div style={{ width: '100%', marginTop: '15px' }}>
                    <Grid container spacing={3} style={{ paddingRight: 7, paddingLeft: 7 }}>
                        <Grid
                            container
                            style={{ width: 'fit-content' }}
                            spacing={3}
                            data-tut="marketTypes">
                            {Object.keys(_.groupBy(coinlist, 'destinationAssetEnglishTitle')).map(
                                (key, index) => (
                                    <Grid key={index} style={{ paddingBottom: '15px', width: 'fit-content' }}>
                                        <Button
                                            disableElevation
                                            onClick={() => setValue(index)}
                                            className={`grayButton ${
                                                value === index ? 'selectedMarketTab' : ''
                                            }`}
                                            type="button"
                                            style={{ width: 'fit-content' }}
                                        >
                                            <label htmlFor="" style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                                                <span><Trans>marketsOf</Trans></span>
                                                &nbsp;
                                                <span>
                      <Trans>{key.toLowerCase()}</Trans>
                                                </span>
                                                &nbsp;
                                            </label>
                                        </Button>
                                    </Grid>
                                ),
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div style={{ position: 'relative', top: '-6px' }}>
                    <TabPanel value={value} index={0} dir={!isEn ? 'rtl' : 'ltr'}>
                        <AnimatePresence exitBeforeEnter>
                            {
                                loading
                                && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ marginTop: 15 }}
                                    >
                                        <TableRowPlaceholder
                                            rowsCount={3}
                                            columnsCount={6}
                                            coinIcon
                                        />
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                        {/* {loading && ( */}
                        {/*    <center style={{ marginTop: '5%', marginBottom: '3%' }}> */}
                        {/*        <Loader loading={loading} /> */}
                        {/*    </center> */}
                        {/* )} */}
                    </TabPanel>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 1 }}
                            style={{ marginTop: 28 }}
                        >
                            {
                                Object.keys(_.groupBy(coinlist, 'destinationAssetEnglishTitle')).map(
                                    (key, index) => (
                                        <TabPanel
                                            value={value}
                                            key={index}
                                            index={index}
                                            dir={!isEn ? 'rtl' : 'ltr'}
                                        >
                                            <SatrexTable
                                                disableSetting
                                                responsiveSizes={[sm, md, lg, xl]}
                                                searchItem={cryptoSearch}
                                                disablePaginate
                                                asset={_.groupBy(coinlist, 'destinationAssetEnglishTitle')[key].map((item, index) => ({
                                                    ...item,
                                                    sourceAssetUrlGraphData: item.sourceAssetUrlGraphData
                                                        ? (
                                                            <img
                                                                src={item.sourceAssetUrlGraphData}
                                                                alt="sourceAssetUrlGraphDataImage"
                                                            />
                                                        ) : null,
                                                    coinTitle: <div
                                                        className=" coinRow"
                                                        style={{
                                                            padding: 10,
                                                            textAlign: isEn ? 'left' : 'right',
                                                            direction: isEn ? 'ltr' : 'rtl',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src={item.sourceAssetImageAddress}
                                                            style={{ width: 30, height: 30 }}
                                                            alt="sourceAssetBase64Image"
                                                        />
                                                        &nbsp;&nbsp;
                                                        <span
                                                            className="colorWhite"
                                                            style={{ whiteSpace: 'nowrap' }}
                                                        >
                                                            <Trans>
                                                                                        {isEn
                                                                                            ? item.sourceAssetEnglishTitle
                                                                                            : item.sourceAssetPersianTitle}
                                                            </Trans>
                                                        </span>
                                                               </div>,
                                                    searchParams: ['sourceAssetEnglishTitle', 'sourceAssetPersianTitle', 'sourceAssetSymbol'],
                                                    lastPriceInToman: <satrexNumFormat
                                                        num={(item.lastPriceInToman).toFixed(0)}
                                                    />,
                                                    lastPriceInTether: <satrexNumFormat
                                                        num={item.lastPriceInTether}
                                                    />,
                                                    changeForLastIn24HoursInPercent: <PercentageFormater
                                                        value={item.changeForLastIn24HoursInPercent}
                                                    />,
                                                    deal: <Button
                                                        data-tut="loginReport"
                                                        variant="contained"
                                                        color="primary"
                                                        disableElevation
                                                        className="whiteButton showReportBtn"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            history.push('login');
                                                            // getLogDetail(item, loginHistory.loginHistories[Math.max(index - 1, 0)]);
                                                        }}
                                                    >
                                                        <span style={{ padding: 5 }}>
                                                            <Trans>sell</Trans>
                                                            &nbsp;&nbsp;/&nbsp;&nbsp;
                                                            <Trans>buy</Trans>
                                                        </span>

                                                          </Button>,
                                                }))}
                                                headerData={[
                                                    {
                                                        Header: <div style={{ width: '100%', textAlign: 'center' }}>
                                                            <Trans>cryptocurrency</Trans>
                                                                </div>,
                                                        accessor: 'coinTitle',
                                                    },
                                                    {
                                                        Header: <Trans>PriceInTomans</Trans>,
                                                        accessor: 'lastPriceInToman',
                                                    },
                                                    {
                                                        Header: <Trans>PriceInTether</Trans>,
                                                        accessor: 'lastPriceInTether',
                                                        hide: !sm,
                                                    },
                                                    {
                                                        Header: <Trans>ChangesIn24Hours</Trans>,
                                                        accessor: 'changeForLastIn24HoursInPercent',
                                                        hide: !md,
                                                    },
                                                    {
                                                        Header: <Trans>market</Trans>,
                                                        accessor: 'sourceAssetUrlGraphData',
                                                        hide: !lg,
                                                    },
                                                    { Header: <Trans>Deal</Trans>, accessor: 'deal' },
                                                ]}
                                            />
                                        </TabPanel>
                                    ),
                                )
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
