import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Card, InputBase, useMediaQuery } from '@mui/material';
import { Divider } from '@mui/material';
import { useHistoryCompat as useHistory } from '../../../router/routerCompat';
import { Button } from '@mui/material';
import { FormatIndentIncrease } from '@mui/icons-material';
import { useTour } from '@reactour/tour';
import SuspendNotif from '../../../components/suspendNotif';
import {
    satrexGreen,
    satrexRed,
} from '../../../../styles/colors';
import SatrexNumFormat from '../../../components/SatrexNumFormat';
import Trans, { transFn } from '../../../components/lang';
import SatrexTable from '../../../components/Table/SatrexTable';
import AnimatedPage from '../../../components/AnimatedPage';
import TableLoader from '../../../components/Table/TableLoader';
import { useWalletList } from '../../../../utils/queries';
import useStyles from './styles';
import tourLoader from '../../../../utils/helpers/tourLoader';
import ThemeAtrr from '../../../MasterLayout/MasterTheme/ThemeAtrr';
import {
    satrexBorderDarkColor,
    satrexDarkerBlueDarkMode,
    satrexGray,
} from '../../../../styles/colors';

export default function (props) {
    const { setIsOpen, setSteps } = useTour();
    const lang = useSelector((state) => state.user.language);
    const isEn = lang === 'EN' || lang === 'gr' || lang === 'fr';
    const satrexTheme = useSelector((state) => state.layout.theme);
    const extraTheme = useSelector((state) => state.layout.extraTheme);
    const classes = useStyles({ satrexTheme, extraTheme });
    const [onlyNonZero, setOnlyNonZero] = useState(false);
    const [cryptoSearch, setCryptoSearch] = React.useState('');
    const level = useSelector((state) => state.layout.totals.qualifyLevel);
    const history = useHistory();

    const sm = useMediaQuery('(min-width:576px)');
    const md = useMediaQuery('(min-width:768px)');
    const lg = useMediaQuery('(min-width:992px)');
    const xl = useMediaQuery('(min-width:1200px)');

    const { data: coinList, isLoading: loading } = useWalletList();
    const walletItems = (Array.isArray(coinList) ? coinList : (Array.isArray(coinList?.data) ? coinList.data : []));
    const isTomanAsset = (item) => {
        const englishTitle = String(item?.assetEnglishTitle || '').trim().toUpperCase();
        const persianTitle = String(item?.assetPersianTitle || '').trim();
        return englishTitle === 'TOMAN' || persianTitle.includes('تومان');
    };
    const navigateToWalletAction = (item, type) => {
        if (isTomanAsset(item)) {
            history.push({
                pathname: type === 'deposit' ? '/deposit' : '/withdrawal',
            });
            return;
        }
        history.push({
            pathname: '/deposit-withdrawal-crypto',
            state: {
                asset: item.assetEnglishTitle,
                type,
            },
        });
    };
    const cardBackgroundColor = (extraTheme !== true && extraTheme)
        ? ThemeAtrr(extraTheme)?.cardStyle?.backgroundColor
        : (!satrexTheme ? satrexDarkerBlueDarkMode : 'white');
    const cardBorderColor = satrexTheme ? '#ececec' : satrexBorderDarkColor;
    const primaryTextColor = satrexTheme ? satrexGray : '#ecebef';
    const secondaryTextColor = satrexTheme ? 'inherit' : '#d8d7df';

    useEffect(() => {
        if (walletItems.length > 0) {
            tourLoader(setIsOpen, setSteps, 'wallet');
        }
    }, [walletItems.length]);

    return (
        <AnimatedPage>
            <Card
                style={{
                    marginTop: '28px',
                    backgroundColor: cardBackgroundColor,
                    border: `solid 1px ${cardBorderColor}`,
                    boxShadow: 'none',
                }}
                className="contentCard"
            >

                <Grid container className="cardHeader" style={{ height: '20%' }}>
                    <Grid size={8}>
          <span style={{ fontSize: '17px', color: primaryTextColor }}>
            <Trans>wallet</Trans>
          </span>
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
                                    placeholder={`${transFn('searchCrypto')}...`}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: !isEn ? classes.inputInput : classes.inputInputEn,
                                    }}
                                    data-tut="searchWalletpage"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={cryptoSearch}
                                    onChange={(e) => {
                                        setCryptoSearch(e.target.value);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <center>
                    <Grid
                        container
                        style={{
                            textAlign: !isEn ? 'right' : 'left',
                            marginTop: 8,
                            padding: 5,
                            paddingBottom: 0,
                        }}
                    >
                        <Grid
                            style={{ display: 'flex', alignItems: 'center' }}
                            size={{
                                xs: 12,
                                md: 9
                            }}>
                            <span style={{ color: secondaryTextColor }}>
                            <span
                                style={{ color: 'red' }}
                            >
                                                <Trans>note</Trans>
                                &nbsp;
                            </span>
                            <Trans>note1InWalletPage</Trans>
                            .
                            </span>
                        </Grid>
                        <Grid
                            size={{
                                xs: 12,
                                md: 3
                            }}>
                            <Button
                                onClick={() => setOnlyNonZero(!onlyNonZero)}
                                disableElevation
                                className="chipBtn selectedChipBtn"
                                type="button"
                                style={{
                                    width: 'fit-content',
                                    whiteSpace: 'nowrap',
                                    paddingRight: 15,
                                    paddingLeft: 15,
                                    height: 33,
                                    float: isEn ? 'right' : 'left',
                                }}
                                data-tut="nonZeroBtn"
                            >
                                <FormatIndentIncrease
                                    style={{ color: satrexGreen }}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <TableLoader
                        loading={loading}
                        placeholderOptions={{
                            coinIcon: true,
                        }}
                    >
                        {
                            walletItems.length > 0
                            && (
                                <div
                                    data-tut="walletTable"
                                    className={(onlyNonZero || walletItems.length < 10) ? 'walletTable' : ''}
                                >

                                    <SatrexTable
                                        responsiveSizes={[sm, md, lg, xl]}
                                        disablePaginate
                                        disableInfiniteScroll
                                        searchItem={cryptoSearch}
                                        asset={
                                            walletItems.filter((item) => item.totalFund > 0 || !onlyNonZero).map((item) => ({
                                                ...item,
                                                searchParams: ['assetEnglishTitle', 'assetPersianTitle'],
                                                wallet: <div
                                                    className=" coinRow"
                                                    style={{
                                                        padding: 10,
                                                        textAlign: isEn ? 'left' : 'right',
                                                        direction: isEn ? 'ltr' : 'rtl',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <img
                                                        src={item.assetImageAddress}
                                                        style={{ width: 30, height: 30 }}
                                                        alt="assetImageAddress"
                                                    />
                                                    &nbsp;&nbsp;
                                                    <span
                                                        className="colorWhite"
                                                        style={{ whiteSpace: 'nowrap' }}
                                                    >
<Trans>
              {isEn
                  ? item.assetEnglishTitle
                  : item.assetPersianTitle}
</Trans>
                                                    </span>
                                                        </div>,
                                                operations: (
                                                    <div className={classes.actionsWrapper}>
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            onClick={() => {
                                                                navigateToWalletAction(item, 'deposit');
                                                            }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Enter' || event.key === ' ') {
                                                                    navigateToWalletAction(item, 'deposit');
                                                                }
                                                            }}
                                                            data-tut="deposit"
                                                            className={`${classes.actionButton} depositAction`}
                                                        >
                                                            <i
                                                                style={{ fontSize: 18, color: satrexRed }}
                                                                className="flaticon-money-2"
                                                            />
                                                            <span
                                                                className={classes.actionLabel}
                                                                style={{ color: satrexRed }}
                                                            >
                                                                <Trans>Deposit</Trans>
                                                            </span>
                                                        </div>
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            onClick={() => {
                                                                navigateToWalletAction(item, 'withdrawal');
                                                            }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Enter' || event.key === ' ') {
                                                                    navigateToWalletAction(item, 'withdrawal');
                                                                }
                                                            }}
                                                            data-tut="withdrawal"
                                                            className={`${classes.actionButton} withdrawalAction`}
                                                        >
                                                            <i
                                                                style={{ fontSize: 18, color: satrexGreen }}
                                                                className="flaticon-money-1"
                                                            />
                                                            <span
                                                                className={classes.actionLabel}
                                                                style={{ color: satrexGreen }}
                                                            >
                                                                <Trans>Withdrawal</Trans>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ),
                                                totalFund: <SatrexNumFormat
                                                    num={item.totalFund}
                                                />,
                                                totalTradable: <SatrexNumFormat
                                                    num={item.totalTradable}
                                                />,
                                                totalTradablePriceInTether: <SatrexNumFormat
                                                    num={item.totalTradablePriceInTether}
                                                />,
                                                price: <SatrexNumFormat
                                                    num={item.price}
                                                />,
                                            }))
                                        }
                                        headerData={[
                                            { Header: <Trans>wallet</Trans>, accessor: 'wallet' },
                                            { Header: <Trans>inventory</Trans>, accessor: 'totalFund' },
                                            { Header: <Trans>totalTradable</Trans>, accessor: 'totalTradable' },
                                            {
                                                Header: <>
                                                    <Trans>inventory</Trans>
                                                    /
                                                    <Trans>tether</Trans>
                                                        </>,
                                                accessor: 'totalTradablePriceInTether',
                                                hide: !xl,
                                            },
                                            {
                                                Header: <Trans>price</Trans>,
                                                accessor: 'price',
                                                hide: !sm,

                                            },
                                            {
                                                Header: <Trans>operations</Trans>,
                                                accessor: 'operations',
                                                hide: !md,
                                            },
                                        ]}
                                    />

                                    {/* { */}
                                    {/*    loading && ( */}
                                    {/*        <center style={{ marginTop: '5%', marginBottom: '3%' }}> */}
                                    {/*            <Loader loading={loading} /> */}
                                    {/*        </center> */}
                                    {/*    ) */}
                                    {/* } */}
                                </div>
                            )
                        }

                    </TableLoader>
                </center>
                {level?.code && level?.code === '0' && <SuspendNotif />}
            </Card>
        </AnimatedPage>
    );
}
