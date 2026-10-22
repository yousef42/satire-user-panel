import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import { useSelector } from 'react-redux';
import { useTour } from '@reactour/tour';
import { Grid, InputBase, useMediaQuery } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import { Divider } from '@mui/material';
import history from '../../../../history';
import Trans, { transFn } from '../../../components/lang';
import {
    satrexGray,
} from '../../../../styles/colors';
import SatrexTable from '../../../components/Table/SatrexTable';
import SatrexNumFormat from '../../../components/satrexNumFormat';
import tourLoader from '../../../../utils/helpers/tourLoader';
import { defaultApiV3, satrexApiV3 } from '../../../components/api';
import TableRowPlaceholder from '../../../components/Table/TableRowPlaceholder';
import PercentageFormater from '../../../components/PercentageFormater';
import AnimatedBox from '../../../components/AnimatedBox';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '1%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
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
        border: 'solid 1px #ADADAD',
        borderRadius: '0.3em',
        [theme.breakpoints.up('sm')]: {
            width: '180px',
            '&:focus': {
                width: '200px',
            },
        },
    },
    tableHead: {
        fontSize: '11px',
        width: '8%',
        '&:hover': {
            '& svg': {
                color: satrexGray,
            },
        },
    },
    sortIcon: {
        marginLeft: 10,
        transform: 'rotate(90deg)',
        fontSize: '13px',
    },
}));

const dashboardMarket = (props) => {
    const { setIsOpen, setSteps } = useTour();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const classes = useStyles();
    const queryClient = useQueryClient();
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');
    const [cryptoSearch, setCryptoSearch] = React.useState('');
    const normalizeMarketSummaryResponse = (response) => {
        if (Array.isArray(response?.data?.data)) return response.data.data;
        if (response?.data?.isSuccess && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        return null;
    };

    const getMarket24hours = async () => {
        try {
            const authResponse = await satrexApiV3().get('/Board/GetPairsDifferentialPriceForLast24Hours');
            const authData = normalizeMarketSummaryResponse(authResponse);
            if (authData) return authData;
        } catch (error) {
            // Fall back to the public response shape if the auth request fails.
        }

        try {
            const publicResponse = await defaultApiV3().get('/Board/GetPairsDifferentialPriceForLast24Hours');
            const publicData = normalizeMarketSummaryResponse(publicResponse);
            if (publicData) return publicData;
        } catch (error) {
            return [];
        }

        return [];
    };

    const { data: coinList, isLoading: marketLoading } = useQuery('getMarket24hours', getMarket24hours);
    const redirectToMarket = (pair) => {
        history.push({
            pathname: `/market/${pair}`,
        });
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) tourLoader(setIsOpen, setSteps, 'home');
        const coinPriceUpdater = setInterval(() => {
            queryClient.invalidateQueries('getMarket24hours');
        }, 5000);

        return () => {
            isMounted = false;
            clearInterval(coinPriceUpdater);
        };
    }, []);

    useEffect(() => {

    }, []);

    // console.log('%c here is the problem', 'background: #222; color: #bada55');
    return (
        <AnimatedBox className="contentCard">
            <Grid
                container
                className="cardHeader"
                style={{ height: '20%', padding: 0, paddingBottom: 15 }}
            >
                <Grid style={{ marginTop: '5px' }} size={8}>
                    <Trans>
                  <span style={{ fontSize: '17px' }}>
                    <Trans>MarketsInTheLast24Hours</Trans>
                  </span>
                    </Trans>
                </Grid>

                <Grid className={!isEn ? classes.search : classes.searchEn} size={4}>
                    <Grid container>
                        <Grid size={1}>
                            <div
                                className={
                                    !isEn ? classes.searchIcon : classes.searchIconEn
                                }
                            >
                                <SearchIcon />
                            </div>
                        </Grid>
                        <Grid size={11}>
                            <InputBase
                                placeholder={`${transFn('searchCrypto')}...`}
                                classes={{
                                    root: classes.inputRoot,
                                    input: !isEn
                                        ? classes.inputInput
                                        : classes.inputInputEn,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={cryptoSearch}
                                onChange={(event) => {
                                    setCryptoSearch(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <div style={{ marginTop: '10px' }}>
                <div data-tut="dashboardMarketList">
                    <center>
                        <div className={classes.root}>
                            <AnimatePresence exitBeforeEnter>
                                {
                                    marketLoading
                                    && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ marginTop: 15, width: '100%' }}
                                        >
                                            <TableRowPlaceholder
                                                rowsCount={3}
                                                columnsCount={4}
                                                coinIcon
                                            />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                            <AnimatePresence exitBeforeEnter>
                                {
                                    coinList
                                    && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: 1 }}
                                            data-tut="walletTable"
                                        >
                                            <SatrexTable
                                                disablePaginate
                                                responsiveSizes={[xl, md, lg]}
                                                actionTodo={redirectToMarket}
                                                searchItem={cryptoSearch}
                                                asset={coinList.map((item) => ({
                                                    ...item,
                                                    sourceAssetUrlGraphData: item.sourceAssetUrlGraphData
                                                        ? <img src={item.sourceAssetUrlGraphData} alt="urlGraphData" /> : null,
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
                                                                                {
                                                                                    isEn
                                                                                    ? item.sourceAssetEnglishTitle
                                                                                    : item.sourceAssetPersianTitle
                                                                                }
                                                    </Trans>
                                                        </span>
                                                               </div>,
                                                    lastPrice:
                                                        <SatrexNumFormat
                                                            num={item.destinationAssetSymbol === 'TOMAN'
                                                                ? item.lastPriceInToman
                                                                : item.lastPriceInTether}
                                                        />,
                                                    changeForLastIn24HoursInPercent: <PercentageFormater
                                                        value={item.changeForLastIn24HoursInPercent}
                                                    />,
                                                    searchParams: ['sourceAssetEnglishTitle', 'sourceAssetPersianTitle', 'sourceAssetSymbol'],
                                                }))}
                                                headerData={[
                                                    {
                                                        Header: <div style={{ width: '100%', textAlign: 'center' }}>
                                                            <Trans>cryptocurrency</Trans>
                                                                </div>,
                                                        accessor: 'coinTitle',
                                                    },
                                                    {
                                                        Header: coinList.some((item) => item.destinationAssetSymbol === 'TOMAN')
                                                            ? <Trans>PriceInTomans</Trans>
                                                            : <Trans>PriceInTether</Trans>,
                                                        accessor: 'lastPrice',
                                                    },
                                                    {
                                                        Header: <Trans>ChangesIn24Hours</Trans>,
                                                        accessor: 'changeForLastIn24HoursInPercent',
                                                    },
                                                    // { Header: <Trans>rank</Trans>, accessor: 'rank', hide: !md },
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
                        </div>
                    </center>
                    {/* {marketLoading && ( */}
                    {/*    <center style={{ marginTop: '5%', marginBottom: '3%' }}> */}
                    {/*        <Loader loading={marketLoading} /> */}
                    {/*    </center> */}
                    {/* )} */}

                </div>
            </div>
        </AnimatedBox>
    );
};

export default dashboardMarket;
