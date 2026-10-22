import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import SatrexMarkets from '../../views/pages/satrexMarkets';
import { authRoutes } from '../../components/api';
import {
    satrexBorderDarkColor, satrexCream2, satrexDarkBlue,
    satrexDarkerBlueDarkMode,
    satrexGray,
    satrexGreen,
    satrexRed,
    satrexSemiDarkerBlueDarkMode,
} from '../../../styles/colors';
import {
    getCoinPriceApi,
    getSupportedCoinList,
} from '../../redux/actions/CoinActions';
import Slider from '../../components/slider';
import Trans, { isRtl } from '../../components/lang';
import AppContext from '../../appContext';
import RootRoutes from '../../RootRoutes';
import Layout1Sidenav from './Layout1Sidenav';
import Layout1Topbar from './Layout1Topbar';
import { isMdScreen, classList } from '../../../utils';
import {
    changeSidebarToggle,
    setLayoutSettings,
    setTopbarValues,
} from '../../redux/actions/LayoutActions';
import ThemeAtrr from '../MasterTheme/ThemeAtrr';
import history from '../../../history';
import SatrexNumFormat from '../../components/satrexNumFormat';
import TourContainer from './TourContainer';
import Content from './Content';
import SatrexLoader from '../../components/satrexLoader';

const layoutStyle = {
    layout: {
        backgroundColor: 'var(--bg-default, #fff)',
    },
};

class Layout1 extends Component {
    UNSAFE_componentWillMount() {
        if (authRoutes.indexOf(this.props.location.pathname) === -1) {
            if (isMdScreen()) {
                this.updateSidebarMode({ mode: 'close' });
            }
            if (this.props.location.pathname !== '/satrex-markets') {
                this.props.getSupportedCoinList();
                this.props.setTopbarValues();
            }
        }
    }

    componentDidMount() {
        Number.prototype.toFixedSpecial = function (n) {
            let str = this.toFixed(n);
            if (str.indexOf('e+') === -1) return str;

            // if number is in scientific notation, pick (b)ase and (p)ower
            str = str
                .replace('.', '')
                .split('e+')
                .reduce((b, p) => b + Array(p - b.length + 2).join(0));

            if (n > 0) str += `.${Array(n + 1).join(0)}`;

            return str;
        };

        if (window.screen.availWidth <= 1300) this.props.changeSidebarToggle(false);

        // this.coinPriceGetter = setInterval(() => {
        //     this.props.getCoinPriceApi();
        // }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.coinPriceGetter);
        // window.unload(function() {
        //
        //   localStorage.clear();
        // })
        // window.onbeforeunload = () => {
        //   localStorage.removeItem('bearerToken');
        //   localStorage.removeItem('expirationDate');
        // }
    }

    hasSidebar = () => (
        this.props.location.pathname === '/login'
        || this.props.location.pathname === '/register'
        || history.location.pathname.split('/')[1] === 'register'
        || this.props.location.pathname === '/reset-password'
        || this.props.location.pathname === '/forgot-password'
        || this.props.location.pathname === '/404'
    );

    updateSidebarMode = (sidebarSettings) => {
        const { settings, setLayoutSettings } = this.props;
        setLayoutSettings({
            ...settings,
            layout1Settings: {
                ...settings.layout1Settings,
                leftSidebar: {
                    ...settings.layout1Settings.leftSidebar,
                },
            },
        });
    };

    render() {
        if (this.props.location.pathname === '/satrex-markets') {
            return (<SatrexMarkets />);
        }

        if (this.hasSidebar()) {
            return (
                <div
                    className="content-wrap sessionLayout"
                >
                    <Suspense fallback={<div><SatrexLoader /></div>}>
                        <RootRoutes />
                    </Suspense>
                </div>
            );
        }
        const { settings } = this.props;

        const { layout1Settings } = settings;
        const themeMode = settings?.themes?.[settings?.activeTheme]?.palette?.mode ?? 'light';
        const layoutClasses = {
            [`${settings.activeLayout} sidenav-${layout1Settings.leftSidebar.mode} theme-${themeMode} flex`]: true,
            'topbar-fixed': layout1Settings.topbar.fixed,
        };

        const isEn = !isRtl;
        const isLtr = this.props.language === 'EN'
            || this.props.language === 'fr'
            || this.props.language === 'gr';
        const renderSummaryValue = (value) => (
            <SatrexNumFormat
                num={Number(value || 0).toFixed(0)}
            />
        );
        const summaryStats = [
            {
                key: 'totalVolume',
                label: <Trans>satrexDayTradingVolume</Trans>,
                value: renderSummaryValue(this.props.totals.totalVolume),
                pointClass: 'greenPoint',
                valueClassName: isLtr ? 'enNum' : '',
            },
            {
                key: 'totalFund',
                label: <Trans>TetherCapital</Trans>,
                value: renderSummaryValue(this.props.totals.totalFund),
                pointClass: 'redPoint',
                valueClassName: `${isLtr ? 'enNum' : ''} moneySeprator`.trim(),
            },
            {
                key: 'totalTradable',
                label: <Trans>NegotiableCapital</Trans>,
                value: renderSummaryValue(this.props.totals.totalTradable),
                pointClass: 'greenPoint',
                valueClassName: `${isLtr ? 'enNum' : ''} moneySeprator`.trim(),
            },
        ];

        const materialTheme = createTheme({
            palette: {
                primary: {
                    main: satrexGreen,
                },
                secondary: {
                    main: satrexRed,
                },
            },

            overrides: {
                MuiTypography: {
                    root: {
                        fontFamily: isLtr
                            ? 'HelveticaLt !important'
                            : 'YekanBakh-Medium !important',
                    },
                },
                PrivateTabIndicator: {
                    vertical: {
                        width: '100%',
                    },
                },
                MuiSlider: {
                    marked: {
                        marginBottom: 0,
                    },
                    markLabel: {
                        top: 25,
                    },
                },
                MuiFormControlLabel: {
                    root: {
                        margin: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        padding: '0 10px',
                    },
                },
                MuiCard: {
                    root: {
                        backgroundColor: (this.props.extraTheme !== true && this.props.extraTheme) ? ThemeAtrr(this.props.extraTheme)?.cardStyle.backgroundColor : (!this.props.satrexTheme
                            ? satrexDarkerBlueDarkMode
                            : 'white'),
                        boxShadow: 'none',
                        transition: '0.3s',
                        border:
                            `solid 1px ${
                                this.props.satrexTheme ? '#ececec' : satrexBorderDarkColor}`,
                        borderRadius: '8px',
                    },
                },
                MuiDivider: {
                    root: {
                        borderTop: !this.props.satrexTheme ? 'solid 1px #313131' : 'none',
                    },
                },
                MuiPaginationItem: {
                    root: {
                        border: 'unset',
                    },
                },
                PrivateValueLabel: {
                    label: {
                        color: 'white !important',
                    },
                },
                MuiTableHead: {
                    root: {

                        padding: 15,
                        '& tr': {
                            // backgroundColor: !this.props.satrexTheme ? "#12121e" : "#ecebef",
                            backgroundColor: (this.props.extraTheme !== true && this.props.extraTheme) ? ThemeAtrr(this.props.extraTheme)?.tableStyle.headStyle.backgroundColor : (!this.props.satrexTheme
                                ? '#12121e'
                                : '#ecebef'),
                            minHeight: 55,
                            borderRadius: 10,
                            '& th': {
                                '& span': {
                                    color: this.props.satrexTheme ? '#0e0139' : '#ecebef',
                                },
                            },
                        },
                    },
                },
                MuiMenu: {
                    paper: {
                        color: !this.props.satrexTheme ? '#fff' : satrexGray,
                        backgroundColor: (this.props.extraTheme !== true && this.props.extraTheme) ? ThemeAtrr(this.props.extraTheme)?.cardStyle.backgroundColor : (!this.props.satrexTheme
                            ? satrexDarkerBlueDarkMode
                            : 'white'),
                        boxShadow: '0px 0px 20px -4px #c4c4c4',
                        transition: '0.3s',
                        border:
                            `solid 1px ${
                                this.props.satrexTheme ? '#ececec' : satrexBorderDarkColor}`,
                        borderRadius: '8px',
                    },
                },

                MuiListItem: {
                    root: {
                        direction: !isRtl ? 'ltr' : 'rtl',
                    },
                },
                MuiTableRow: {
                    root: {
                        '&:hover': {
                            backgroundColor: (this.props.extraTheme !== true && this.props.extraTheme) ? ThemeAtrr(this.props.extraTheme)?.tableStyle.rowHoverStyle.backgroundColor : (
                                this.props.satrexTheme
                                    ? ' rgba(0, 0, 0, 0.04)'
                                    : '#11111b !important'
                            ),
                        },
                    },
                    hover: {},
                },
                MuiTableCell: {
                    root: {
                        borderBottomColor: this.props.satrexTheme
                            ? 'rgba(224, 224, 224, 1)'
                            : satrexBorderDarkColor,
                        minHeight: 55,
                    },
                    stickyHeader: {
                        backgroundColor: 'transparent',
                    },
                },
                MuiTableContainer: {
                    root: {
                        padding: 2,
                    },
                },
                MuiInputBase: {
                    input: {
                        backgroundColor: (this.props.extraTheme !== true && this.props.extraTheme) ? ThemeAtrr(this.props.extraTheme).addressInput.backgroundColor : (
                            !this.props.satrexTheme
                                ? `${satrexSemiDarkerBlueDarkMode} !important`
                                : 'white !important'
                        ),
                        borderColor: !this.props.satrexTheme
                            ? `${satrexBorderDarkColor} !important`
                            : '#ced4da !important',
                    },
                },
                MuiDialog: {
                    paperScrollPaper: {
                        backgroundColor: ThemeAtrr(this.props.extraTheme, true)
                            ? ThemeAtrr(this.props.extraTheme).inputStyle.backgroundColor : !this.props.satrexTheme
                                ? satrexSemiDarkerBlueDarkMode
                                : 'white',
                        color: this.props.satrexTheme ? satrexGray : '#bebebe',
                    },
                },
                MuiDialogContentText: {
                    root: {
                        color: this.props.satrexTheme ? satrexGray : '#bebebe',
                    },
                },
                MuiDialogContent: {
                    root: {
                        '& input': {
                            color: !this.props.satrexTheme ? '#bebebe' : satrexGray,
                            border: !this.props.satrexTheme
                                ? `1px solid ${satrexBorderDarkColor} !important`
                                : '1px solid ' + '#ced4da !important',
                        },
                    },
                },
                MuiButtonBase: {
                    root: {
                        backgroundColor: 'transparent',
                        borderColor: !this.props.satrexTheme
                            ? `${satrexBorderDarkColor} !important`
                            : '#ced4da !important',
                    },
                },
                MuiButton: {
                    root: {
                        minWidth: 'fit-content',
                    },
                    textTransform: 'none',
                },
                MuiPaper: {
                    root: {
                        backgroundColor: !this.props.satrexTheme
                            ? satrexDarkerBlueDarkMode
                            : 'white',
                        boxShadow: 'none',
                        border:
                            `solid 1px ${
                                this.props.satrexTheme ? '#ececec' : satrexBorderDarkColor}`,
                        borderRadius: '8px',
                    },
                    elevation1: {
                        boxShadow: 'none',
                    },
                },
                makeStyles: {
                    bankNameDiv: {
                        backgroundColor: 'red',
                    },
                },
                MuiIconButton: {
                    label: {
                        width: '100%',
                    },
                    root: {
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: this.props.satrexTheme
                                ? 'rgba(0, 0, 0, 0.06)'
                                : 'rgba(255, 255, 255, 0.08)',
                        },
                    },
                },
                MuiBox: {
                    root: {
                        padding: '0px',
                    },
                },
                MuiGrid: {
                    root: {
                        fontFamily: isLtr
                            ? 'HelveticaLt !important'
                            : 'YekanBakh-Medium !important',
                        '& span': {
                            // fontFamily:isLtr ? 'HelveticaLt !important' : 'YekanBakh-Medium !important'
                        },
                    },
                },

                MuiPopover: {
                    paper: {
                        maxWidth: '100% !important',
                    },
                },
            },
        });

        return (
            <ThemeProvider theme={materialTheme}>
                <TourContainer>
                    <div
                        className={`mainContent ${classList(
                            layoutClasses,
                        )} ${
                            this.props.loginStatus === null
                                ? ''
                                : this.props.sidebarToggle
                                    ? 'sidenav-full'
                                    : 'sidenav-compact'
                        }`}
                        style={layoutStyle.layout}
                    >

                        <div
                            style={{
                                backgroundColor: this.hasSidebar() ? satrexDarkBlue : satrexCream2,
                                overflow: 'auto',
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                flexFlow: 'column',
                                position: 'absolute',
                                direction:
                                    this.props.language === 'EN'
                                    || this.props.language === 'fr'
                                    || this.props.language === 'gr'
                                        ? 'rtl'
                                        : 'ltr',
                            }}
                        >
                            {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                                <div
                                    className="topbarContainer"
                                    style={{
                                        width: '100%',
                                        height: 55,
                                        direction:
                                            this.props.language === 'EN'
                                            || this.props.language === 'fr'
                                            || this.props.language === 'gr'
                                                ? 'ltr'
                                                : 'rtl',
                                    }}
                                >
                                    <Layout1Topbar className="elevation-z8" />
                                </div>
                            )}

                            <div style={{ flex: 1, position: 'relative' }}>
                                <div
                                    className="centerContent"
                                    style={{
                                        backgroundColor: this.hasSidebar() ? satrexDarkBlue : satrexCream2,
                                        display: 'flex',
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    <div
                                        style={{
                                            ...ThemeAtrr(this.props.extraTheme).contentStyle,
                                            width: (document.documentElement.clientWidth < 1300) && layout1Settings.leftSidebar.show && 'calc(100% - 61px)',
                                            overflow: 'auto',
                                            position: 'relative',
                                            zIndex: 11,
                                        }}
                                        className={`content-wrap contentStyle ${
                                            !this.hasSidebar()
                                                ? (
                                                    (this.props.language === 'EN'
                                                        || this.props.language === 'fr'
                                                        || this.props.language === 'gr'
                                                    )
                                                        ? (document.documentElement.clientWidth >= 1300
                                                            ? 'content-wrapLtr'
                                                            : 'content-wrapMiniLtr')
                                                        : (document.documentElement.clientWidth >= 1300
                                                            ? 'content-wrapRtl'
                                                            : 'content-wrapMiniRtl'))
                                                : ''
                                        } position-relative`}
                                    >
                                        <style>
                                            {`
                                              .contentStyle {
                                                overflow: auto;
                                                direction: ${!isLtr ? 'ltr' : 'rtl'};
                                                background-color: ${this.props.satrexTheme
                                                        ? satrexCream2
                                                        : satrexSemiDarkerBlueDarkMode};
                                              }
                                            `}
                                        </style>
                                        <Grid
                                            id="content"
                                            container
                                            style={{
                                                height: '100%',
                                                direction: isLtr ? 'ltr' : 'rtl',
                                                transition: '0.3s',
                                                overflowX: 'hidden',
                                            }}
                                        >
                                            {layout1Settings.topbar.show && (
                                                <Grid
                                                    container
                                                    dir={!isLtr ? 'ltr' : 'rtl'}
                                                    style={{
                                                        marginTop: '15px',
                                                        paddingLeft: (this.props.location.pathname).split('/')[1] !== 'market' ? '3%' : '0.5%',
                                                        paddingRight: (this.props.location.pathname).split('/')[1] !== 'market' ? '3%' : '0.5%',
                                                        width: '100%',
                                                        justifyContent: 'flex-start',
                                                    }}
                                                >
                                                    <Grid
                                                        size={12}
                                                    >
                                                        <div
                                                            className="layoutSummaryBar"
                                                            dir={isLtr ? 'ltr' : 'rtl'}
                                                        >
                                                            {summaryStats.map((item) => (
                                                                <div
                                                                    key={item.key}
                                                                    className="layoutSummaryItem"
                                                                >
                                                                    <div className="layoutSummaryMarker">
                                                                        <div className={item.pointClass} />
                                                                    </div>
                                                                    <div className="layoutSummaryContent">
                                                                        <span className="layoutSummaryLabel colorWhite">
                                                                            {item.label}
                                                                            :
                                                                        </span>
                                                                        <span className={item.valueClassName}>
                                                                            {item.value}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            )}

                                            {layout1Settings.topbar.show
                                                && layout1Settings.topbar.fixed && (
                                                    (<div
                                                        style={{
                                                            paddingLeft: (this.props.location.pathname).split('/')[1] !== 'market' ? '2%' : '0.5%',
                                                            paddingRight: (this.props.location.pathname).split('/')[1] !== 'market' ? '2%' : '0.5%',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Slider />
                                                    </div>)
                                                    // <div>test</div>
                                                )}

                                            {layout1Settings.topbar.show
                                                && !layout1Settings.topbar.fixed && (
                                                    <Layout1Topbar style={{ height: '80px' }} />
                                                )}
                                            <div
                                                className="content"
                                                style={{
                                                    minHeight: '800px',
                                                    height: layout1Settings.topbar.show ? 'fit-content' : '100%',
                                                    width: '100%',
                                                    paddingLeft: layout1Settings.topbar.show ? (this.props.location.pathname).split('/')[1] !== 'market' ? '2%' : '0.5%' : '0px',
                                                    paddingRight: layout1Settings.topbar.show ? (this.props.location.pathname).split('/')[1] !== 'market' ? '2%' : '0.5%' : '0px',
                                                }}
                                            >
                                                <Content>
                                                    <RootRoutes />
                                                </Content>
                                            </div>

                                            <div className="my-auto" />
                                        </Grid>
                                    </div>
                                    {layout1Settings.topbar.show
                                        && (
                                            <motion.div
                                                className={`sidenav ${(window.screen.availWidth <= 1300 || document.documentElement.clientWidth <= 1300) ? 'sidenavFixedWidth' : ''}`}
                                                style={{ height: 10 }}
                                            />
                                        )}
                                    {layout1Settings.leftSidebar.show && <Layout1Sidenav />}
                                </div>
                            </div>
                        </div>
                    </div>
                </TourContainer>
            </ThemeProvider>
        );
    }
}

Layout1.propTypes = {
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    settings: state.layout.settings,
    language: state.user.language,
    coinPaprikaList: state.coin.coinPaprikaList,
    sidebarToggle: state.layout.sidebarToggle,
    loginStatus: state.login.token?.token,
    totals: state.layout.totals,
    satrexTheme: state.layout.theme,
    extraTheme: state.layout.extraTheme,
    dollarPrice: state.coin.dollarPrice,
});

export default connect(mapStateToProps, {
    setLayoutSettings,
    getSupportedCoinList,
    changeSidebarToggle,
    setTopbarValues,
    getCoinPriceApi,
})(Layout1);
