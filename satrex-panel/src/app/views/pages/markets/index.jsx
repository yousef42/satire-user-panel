import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Card, InputBase, useMediaQuery } from '@mui/material';
import { Divider } from '@mui/material';
import { alpha as colorFade } from '@mui/material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import { AnimatePresence, motion } from 'framer-motion';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexSemiDarkerBlueDarkMode,
} from '../../../../styles/colors';
import { selectMarketPair } from '../../../redux/actions/CoinActions';
import { setFavoriteMarkets } from '../../../redux/actions/MarketActions';
import SatrexTable from '../../../components/Table/SatrexTable';
import history from '../../../../history';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import Trans, { transFn } from '../../../components/lang';
import tourLoader from '../../../../utils/helpers/tourLoader';
import AnimatedPage from '../../../components/AnimatedPage';
import TableRowPlaceholder from '../../../components/Table/TableRowPlaceholder';
import { usePairsDifferentialPriceForLast24Hours } from '../../../../utils/queries';
import PercentageFormater from '../../../components/PercentageFormater';
import StarCmp from './StarCmp';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import _ from "lodash"
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
                <Box p={3}>
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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1%',
    },
    selectedTab: {
        backgroundColor: colorFade(satrexGreen, 0.2),
        '& span': {
            color: satrexGreen,
        },
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,

        marginLeft: 0,
        textAlign: 'left',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchEn: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        textAlign: 'right',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '39px',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '-2%',
        zIndex: 10,
        color: (props) => (props.satrexTheme ? satrexGray : '#ecebef'),
    },
    searchIconEn: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: '-2%',
        zIndex: 10,
        color: (props) => (props.satrexTheme ? satrexGray : '#ecebef'),
    },
    inputRoot: {
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        border: (props) => `solid 1px ${props.satrexTheme ? '#ADADAD' : satrexBorderDarkColor}`,
        borderRadius: '0.3em',
        backgroundColor: (props) => ((props.extraTheme !== true && props.extraTheme)
            ? ThemeAtrr(props.extraTheme)?.inputStyle?.backgroundColor
            : (!props.satrexTheme ? satrexSemiDarkerBlueDarkMode : 'transparent')),
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
        [theme.breakpoints.up('sm')]: {
            width: '150px',
            '&:focus': {
                width: '180px',
            },
        },
    },
    inputInputEn: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        paddingLeft: '10px',
        transition: theme.transitions.create('width'),
        width: '100%',
        border: (props) => `solid 1px ${props.satrexTheme ? '#ADADAD' : satrexBorderDarkColor}`,
        borderRadius: '0.3em',
        backgroundColor: (props) => ((props.extraTheme !== true && props.extraTheme)
            ? ThemeAtrr(props.extraTheme)?.inputStyle?.backgroundColor
            : (!props.satrexTheme ? satrexSemiDarkerBlueDarkMode : 'transparent')),
        color: (props) => (props.satrexTheme ? 'inherit' : '#ecebef'),
        [theme.breakpoints.up('sm')]: {
            width: '180px',
            '&:focus': {
                width: '200px',
            },
        },
    },
    tableHead: {
        fontSize: '11px',
    },
}));
export default function FullWidthTabs() {
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const classes = useStyles({ satrexTheme, extraTheme });
    const [value, setValue] = React.useState(0);
    const [cryptoSearch, setCryptoSearch] = React.useState('');
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const { data: coinlist, isLoading: loading } = usePairsDifferentialPriceForLast24Hours();
    const cardBackgroundColor = (extraTheme !== true && extraTheme)
        ? ThemeAtrr(extraTheme)?.cardStyle?.backgroundColor
        : (!satrexTheme ? satrexDarkerBlueDarkMode : 'white');
    const cardBorderColor = satrexTheme ? '#ececec' : satrexBorderDarkColor;
    const titleColor = satrexTheme ? '#282828' : '#ecebef';

    const redirectToMarket = (pair) => {
        const [srcPair, desPair] = (pair).split('-');
        // console.log(pairList.filter(item=>(item.destinationAssetSymbol).toLowerCase() === desPair && (item.sourceAssetSymbol).toLowerCase() === srcPair)[0])
        dispatch(selectMarketPair(coinlist.filter((item) => (item.destinationAssetSymbol).toLowerCase() === desPair && (item.sourceAssetSymbol).toLowerCase() === srcPair)[0]));
        // localStorage.setItem("selectedPair", asset);
        history.push({
            pathname: `/market/${pair}`,
        });
    };

    const { setIsOpen, setSteps } = useTour();
    const favM = useSelector((state) => state.market.favoriteMarkets);
    const coinLogos = useSelector((state) => state.coin.coinLogos);
    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');

    useEffect(() => {
        let isMounted = true;
        if (coinlist && isMounted) {
            const favorits = coinlist.filter((item) => item.pairIsFavorite === true);
            tourLoader(setIsOpen, setSteps, 'markets');
            dispatch(
                setFavoriteMarkets(favorits),
            );
            if (favorits.length === 0) {
                setValue(1);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [coinlist]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) setMounted(true);
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AnimatedPage>
            <Card
                style={{
                    marginTop: '28px',
                    backgroundColor: cardBackgroundColor,
                    border: `solid 1px ${cardBorderColor}`,
                    boxShadow: 'none',
                }}
                className={`contentCard ${isEn ? 'enApp' : 'faApp'} satrexMarketStyles ${satrexTheme ? 'marketThemeLight' : 'marketThemeDark'}`}
            >
                <Grid container className="cardHeader" style={{ height: '20%' }}>
                    <Grid size={8}>
                        <Trans>
            <span style={{ fontSize: '17px', color: titleColor }}>
              <Trans>markets</Trans>
            </span>
                        </Trans>
                    </Grid>

                    <Grid className={!isEn ? classes.search : classes.searchEn} size={4}>
                        <Grid container>
                            <Grid size={1}>
                                <div
                                    className={!isEn ? classes.searchIcon : classes.searchIconEn}
                                >
                                    <SearchIcon />
                                </div>
                            </Grid>
                            <Grid size={11}>
                                <InputBase
                                    data-tut="searchMarketpage"
                                    placeholder={`${transFn('searchCrypto')}...`}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: !isEn ? classes.inputInput : classes.inputInputEn,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={cryptoSearch}
                                    onChange={() => {
                                        setCryptoSearch(event.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <div style={{ width: '100%', marginTop: '15px' }}>
                    <Grid container spacing={2}>
                        <Grid style={{ width: 'fit-content' }}>
                            <Button
                                data-tut="favMarkets"
                                disableElevation
                                onClick={() => setValue(0)}
                                className={`grayButton ${value === 0 ? 'selectedMarketTab' : ''}`}
                                type="button"
                                style={{ width: 'fit-content', whiteSpace: 'nowrap' }}
                            >
                                <Trans>favoritMarkets</Trans>
                            </Button>
                        </Grid>
                        <Grid
                            container
                            style={{ width: 'fit-content' }}
                            spacing={2}
                            data-tut="marketTypes">
                            {Object.keys(_.groupBy(coinlist || [], 'destinationAssetEnglishTitle')).map(
                                (key, index) => (
                                    <Grid key={index} style={{ paddingBottom: '15px', width: 'fit-content' }}>
                                        <Button
                                            disableElevation
                                            onClick={() => setValue(index + 1)}
                                            className={`grayButton ${
                                                value === index + 1 ? 'selectedMarketTab' : ''
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
                        <AnimatePresence exitBeforeEnter>
                            {
                                !loading && favM.length > 0
                                && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: 1 }}
                                    >
                                        <SatrexTable
                                            key={`favorite-markets-${favM.length}`}
                                            disableInfiniteScroll
                                            responsiveSizes={[sm, md, lg, xl]}
                                            actionTodo={redirectToMarket}
                                            searchItem={cryptoSearch}
                                            disablePaginate
                                            asset={
                                                _.uniqBy(favM.map((item, index) => ({
                                                    ...item,
                                                    sourceAssetUrlGraphData: item.sourceAssetUrlGraphData
                                                        ? (
                                                            <img
                                                                src={item.sourceAssetUrlGraphData}
                                                                alt="sourceAssetUrlGraphDataImage"
                                                            />
                                                        ) : null,
                                                    symbol: <span>
                                            {item.sourceAssetSymbol}
                                                        /
                                                        {item.destinationAssetSymbol}
                                                            </span>,
                                                    coinTitle: <div
                                                        className=" coinRow"
                                                        style={{
                                                            position: 'relative',
                                                            padding: 10,
                                                            textAlign: isEn ? 'left' : 'right',
                                                            direction: isEn ? 'ltr' : 'rtl',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <img
                                                            src={item.sourceAssetImageAddress}
                                                            style={{
                                                                width: 33, height: 33, zIndex: 2, position: 'relative',
                                                            }}
                                                            alt="sourceAssetBase64Image"
                                                        />
                                                        {
                                                            coinLogos && coinLogos[(item.destinationAssetSymbol).toUpperCase()]
                                                            && (
                                                                <img
                                                                    src={coinLogos[(item.destinationAssetSymbol).toUpperCase()]}
                                                                    style={{
                                                                        width: 12,
                                                                        height: 12,
                                                                        position: 'absolute',
                                                                        borderRadius: 12,
                                                                        right: !isEn ? 7 : 'unset',
                                                                        left: isEn ? 7 : 'unset',
                                                                        bottom: 15,
                                                                        zIndex: 3,
                                                                    }}
                                                                    alt="sourceAssetBase64Image"
                                                                />
                                                            )

                                                        }
                                                        &nbsp;&nbsp;
                                                        <span
                                                            className="colorWhite"
                                                            style={{ whiteSpace: 'nowrap' }}
                                                        >
                                                        <Trans>
                                                                {isEn
                                                                    ? (
                                                                        <>
                                                                            {item.sourceAssetEnglishTitle}
                                                                            /
                                                                            {item.destinationAssetEnglishTitle}
                                                                        </>
                                                                    )
                                                                    : (
                                                                        <>
                                                                            {item.sourceAssetPersianTitle}
                                                                            /
                                                                            {item.destinationAssetPersianTitle}
                                                                        </>
                                                                    )}
                                                        </Trans>
                                                        </span>
                                                               </div>,
                                                    searchParams: ['sourceAssetEnglishTitle', 'sourceAssetPersianTitle', 'sourceAssetSymbol'],
                                                    star: <StarCmp item={item} />,
                                                    changeForLastIn24HoursInPercent: <PercentageFormater
                                                        value={item.changeForLastIn24HoursInPercent}
                                                    />,
                                                    lastPriceInTether: <SatrexNumFormat
                                                        num={item.lastPriceInTether}
                                                    />,
                                                })), 'pairId')
                                            }
                                            headerData={[
                                                { Header: <Trans>#</Trans>, accessor: 'star' },
                                                {
                                                    Header: <div style={{ width: '100%', textAlign: 'center' }}>
                                                        <Trans>cryptocurrency</Trans>
                                                            </div>,
                                                    accessor: 'coinTitle',
                                                },
                                                { Header: <Trans>symbol</Trans>, accessor: 'pairSymbol' },
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
                                            ]}
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
                        >
                            {
                                Object.keys(_.groupBy(coinlist || [], 'destinationAssetEnglishTitle')).map(
                                    (key, index) => (
                                        <TabPanel
                                            value={value}
                                            key={index + 1}
                                            index={index + 1}
                                            dir={!isEn ? 'rtl' : 'ltr'}
                                        >
                                            <SatrexTable
                                                key={`market-tab-${key}-${(_.groupBy(coinlist, 'destinationAssetEnglishTitle')[key] || []).length}`}
                                                responsiveSizes={[sm, md, lg, xl]}
                                                actionTodo={redirectToMarket}
                                                searchItem={cryptoSearch}
                                                disablePaginate
                                                disableInfiniteScroll
                                                asset={(_.groupBy(coinlist, 'destinationAssetEnglishTitle')[key] || []).map((item, index) => ({
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
                                                    star: <StarCmp item={item} />,
                                                    lastPriceInTether: <SatrexNumFormat
                                                        num={item.lastPriceInTether}
                                                    />,
                                                    changeForLastIn24HoursInPercent: <PercentageFormater
                                                        value={item.changeForLastIn24HoursInPercent}
                                                    />,
                                                }))}
                                                headerData={[
                                                    { Header: <Trans>#</Trans>, accessor: 'star' },
                                                    {
                                                        Header: <div style={{ width: '100%', textAlign: 'center' }}>
                                                            <Trans>cryptocurrency</Trans>
                                                                </div>,
                                                        accessor: 'coinTitle',
                                                    },
                                                    { Header: <Trans>symbol</Trans>, accessor: 'pairSymbol' },
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
                                                ]}
                                            />
                                        </TabPanel>
                                    ),
                                )
                            }
                        </motion.div>
                    </AnimatePresence>
                </div>
            </Card>
        </AnimatedPage>
    );
}
