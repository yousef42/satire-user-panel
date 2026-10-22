import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import persianDate from 'persian-date';
import HijriDate from 'hijri-date';
import { motion } from 'framer-motion';
import jmoment from 'jalali-moment';
import {
    setLayoutSettings,
    changeSidebarToggle,
    changeTheme,
} from '../../redux/actions/LayoutActions';
import { logoutUser, setLanguage } from '../../redux/actions/UserActions';
import { exiting } from '../../redux/actions/LoginActions';
import { isMdScreen } from '../../../utils';
import Trans from '../../components/lang';
import logo from '../../../images/newLogo/logo-2.png';
import history from '../../../history';

import Settings from './settings';

import ThemeAtrr from '../MasterTheme/ThemeAtrr';
import { withRouterCompat as withRouter } from '../../router/routerCompat';
import RootTourConfig from '../../RootTourConfig';
import TourGuide from '../../components/TourGuide';
import TextTitle from '../../views/pages/sessions/components/TextTitle';

class Layout1Topbar extends Component {
    topbarTimer = 0;

    constructor(props) {
        super(props);
        this.state = {
            time: '',
            anchorEl: '',
            sidenavToggleChecked: false,
            mouseMoved: true,
            timer: 200,
            firstLoadedPage: {},
        };
    }

    handleTourGuide = () => {
        const temp = {
            home: false,
            market: false,
            accounting: false,
            wallet: false,
            security: false,
            markets: false,
            reports: false,
            profile: false,
            'edit-personal-info-stage2': false,
            completedOrdersReportDetail: false,
            'fast-dealing': false,
            'deposit-withdrawal-crypto': false,
            'edit-bank-info': false,
            'edit-personal-info': false,
            requests: false,
            turnover: false,
            messages: false,
            deposit: false,
            active: '',
        };
        const storedLoadedPages = localStorage.getItem('loadedPages');
        if (!storedLoadedPages) {
            localStorage.setItem('loadedPages', JSON.stringify(temp));
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.props);
        const { location } = this.props;
        if (prevProps.location !== this.props.location) {
            this.handleTourGuide();
        }
        if (prevProps.language !== this.props.language) {
            this.timeSetting();
        }
    }

    updateSidebarMode = (sidebarSettings) => {
        const { settings, setLayoutSettings } = this.props;

        setLayoutSettings({
            ...settings,
            layout1Settings: {
                ...settings.layout1Settings,
                leftSidebar: {
                    ...settings.layout1Settings.leftSidebar,
                    ...sidebarSettings,
                },
            },
        });
    };

    handleSidebarToggle = () => {
        const { settings } = this.props;
        const { layout1Settings } = settings;

        let mode;
        if (isMdScreen()) {
            mode = layout1Settings.leftSidebar.mode === 'close' ? 'email' : 'close';
        } else {
            mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
        }
        this.updateSidebarMode({ mode });
    };

    handleSignOut = () => {
        this.props.logoutUser();
    };

    language;

    componentDidMount() {
        this.topbarTimer = setInterval(() => {
            this.timeSetting();
        }, 60000);
    }

    UNSAFE_componentWillMount() {
        this.handleTourGuide();
        this.timeSetting();
    }

    componentWillUnmount() {
        clearInterval(this.deActivityChecker);
        clearInterval(this.topbarTimer);
    }

    timeSetting = () => {
        switch (this.props.language) {
            case 'FA':
                return this.setState({
                    dateTime: <div style={{ display: 'flex' }}>
                        <span>{new persianDate().format('dddd DD MMMM YYYY   ')}</span>
                        {/* <span>{new persianDate().format("DD")}</span> */}
                        {/* <span>{new persianDate().format("MMMM")}</span> */}
                        {/* <span>{new persianDate().format("YYYY")}</span> */}
                        &nbsp;&nbsp;&nbsp;
                        <span>{new persianDate().format('h:mm a')}</span>
                              </div>,
                });
            case 'EN':
                return this.setState({ dateTime: new Date().toUTCString() });
            case 'ar':
                return this.setState({ dateTime: new HijriDate().toString() });
            case 'fr':
                return this.setState({ dateTime: new Date().toUTCString() });
            case 'gr':
                return this.setState({ dateTime: new Date().toUTCString() });
        }
    };

    async handleLanguage(lang) {
        await this.props.setLanguage(lang);
        this.handleClose();
        this.timeSetting();
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSidenavToggle = () => {
        this.props.changeSidebarToggle(!this.props.sidebarToggle);
    };

    changeTheme = () => {
        this.props.changeTheme();
    };

    render() {
        const {
            theme, settings, className, style,
        } = this.props;
        const topbarTheme = settings.themes[settings.layout1Settings.topbar.theme] || theme;

        const { classes } = this.props;

        return (
            <div className="topbar">
                <Grid
                    container
                    style={ThemeAtrr(this.props.extraTheme).topbarStyle}
                    className={`topbar-hold ${className} ${
                        this.props.satrexTheme ? 'satrexTopBar' : 'satrexTopBarDark'
                    } satrexTopBar`}
                >
                    <Grid
                        size={{
                            xs: 5,
                            md: 8
                        }}>
                        <Grid container>
                            <Grid
                                className="topbarLogo"
                                size={{
                                    xs: 11,
                                    md: 4,
                                    lg: 5
                                }}>
                                <Grid container>
                                    <Grid style={{ width: '17%' }}>
                                        <IconButton
                                            className="sidenav__toggle topbarIcons"
                                            onClick={this.handleSidenavToggle}
                                            style={{
                                                cursor: 'pointer !important',
                                                height: '48px',
                                                padding:
                                                    window.screen.availWidth < 1200 ? '5px' : '15px',
                                            }}
                                            data-tut="menu"
                                        >

                                            <MenuIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid
                                        style={{ minWidth: '30px', cursor: 'pointer' }}
                                        onClick={() => history.push({ pathname: '/home' })}
                                        size={1}>
                                        {/* <motion.img
                                            transition={{
                                                ease: 'easeInOut',
                                                duration: 2,
                                                flip: 'Infinity',
                                                repeatDelay: 5,
                                            }}
                                            initial={{ rotateY: 0, rotateZ: 0 }}
                                            animate={{ rotateY: 360, rotateZ: 360 }}
                                            src={logo}
                                            alt=""
                                            className="logo"
                                        /> */}
                                    </Grid>
                                    <Grid
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => history.push({ pathname: '/home' })}
                                        size={8}>
                                        <div className="logoText">
                                            <TextTitle color={this.props.satrexTheme ? 'black' : 'white'} />
                                        </div>
                                        {/* <img */}

                                        {/*    src={ */}
                                        {/*        this.props.satrexTheme ? logoBlackText : logoLightText */}
                                        {/*    } */}
                                        {/*    alt="" */}
                                        {/* */}
                                        {/* /> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                className="quickAccess"
                                size={{
                                    xs: 1,
                                    sm: 8,
                                    md: 8,
                                    lg: 7
                                }}>
                                <Grid container className="topbarTabs" spacing={4}>
                                    {/* <Grid xs={2}>{lang({lang:this.props.language,value:'ali'})}</Grid> */}
                                    <div data-tut="toolbarQuickAccess" style={{ display: 'flex' }}>
                                        <NavLink to="/home" className="topbarItem">
                                            <Grid>
                                                <Trans>dashboard</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink to="/wallet" className="topbarItem">
                                            <Grid>
                                                <Trans>wallet</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink
                                            to="/markets"
                                            className={`topbarItem ${
                                                this.props.location.pathname.split('/')[1] === 'market'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                        >
                                            <Grid>
                                                <Trans>markets</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink to="/fast-dealing" className="topbarItem">
                                            <Grid>
                                                <Trans>quickDealing</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink to="/download-application" className="topbarItem">
                                            <Grid>
                                                <Trans>downloadApplication</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink to="/messages" className="topbarItem">
                                            <Grid>
                                                <Trans>messages</Trans>
                                            </Grid>
                                        </NavLink>
                                        <NavLink to="/edit-personal-info" className="topbarItem">
                                            <Grid>
                                                <Trans>profile</Trans>
                                            </Grid>
                                        </NavLink>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        size={{
                            xs: 7,
                            md: 4
                        }}>
                        <Grid container>
                            <Grid
                                size={{
                                    xs: 12,
                                    lg: 12
                                }}>
                                <Grid container>
                                    {
                                        document.documentElement.clientWidth > 1200
                                            ? (
                                                <Grid
                                                    style={{ paddingTop: 18, display: 'flex' }}
                                                    className="topbarDateTime"
                                                    size={{
                                                        xs: 8,
                                                        md: 9
                                                    }}>
                                                    <span><Trans>today</Trans></span>
                                                    <span style={{
                                                        flex: 1,
                                                        paddingLeft: '3%',
                                                        paddingRight: '3%',
                                                    }}
                                                    >
                                                        {this.state.dateTime}
                                                    </span>
                                                </Grid>
                                            )
                                            : (
                                                <Grid style={{ paddingTop: 18 }} size={7}>
                                                    <Trans>today</Trans>
                                                    {' '}
                                                    {jmoment().format('HH:mm:ss jYYYY/jMM/jDD')}
                                                </Grid>
                                            )
                                    }

                                    <Grid
                                        size={{
                                            xs: 4,
                                            md: 3
                                        }}>
                                        <Grid
                                            container
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-start',
                                                flexWrap: 'nowrap',
                                                gap: '8px',
                                            }}
                                        >
                                            {/* <Grid xs={2} item style={{ paddingTop: "8px" }}> */}
                                            {/* {this.props.satrexTheme && ( */}
                                            {/*  <IconButton */}
                                            {/*    aria-label="delete" */}
                                            {/*    className="topbarIcons" */}
                                            {/*    onClick={this.changeTheme} */}
                                            {/*  > */}
                                            {/*    <Brightness3Icon style={{ fontSize: "16px" }} /> */}
                                            {/*  </IconButton> */}
                                            {/* )} */}
                                            {/* {!this.props.satrexTheme && ( */}
                                            {/*  <IconButton */}
                                            {/*    aria-label="delete" */}
                                            {/*    className="topbarIcons" */}
                                            {/*    onClick={this.changeTheme} */}
                                            {/*  > */}
                                            {/*    <WbSunnyIcon style={{ fontSize: "16px" }} /> */}
                                            {/*  </IconButton> */}
                                            {/* )} */}
                                            {/* </Grid> */}
                                            {/* <Grid xs={2} item style={{ paddingTop: "8px" }}> */}
                                            {/*  <IconButton */}
                                            {/*    aria-label="delete" */}
                                            {/*    className="topbarIcons" */}
                                            {/*    style={{ paddingTop: "22px" }} */}
                                            {/*  > */}
                                            {/*    <i */}
                                            {/*      className="flaticon-speech-bubble" */}
                                            {/*      style={{ fontSize: "16px" }} */}
                                            {/*    /> */}
                                            {/*  </IconButton> */}
                                            {/* </Grid> */}

                                            {/* <Grid xs={3} item style={{paddingTop: "8px"}} > */}
                                            {/*    <Link to="/profile"> */}
                                            {/*        <IconButton */}
                                            {/*            aria-label="delete" */}
                                            {/*            className="topbarIcons" */}
                                            {/*            style={{paddingTop: "15px"}} */}
                                            {/*            data-tut="profilePage" */}
                                            {/*        > */}
                                            {/*            <i */}
                                            {/*                className="flaticon-user" */}
                                            {/*                style={{fontSize: "16px"}} */}
                                            {/*            /> */}
                                            {/*        </IconButton> */}
                                            {/*    </Link> */}
                                            {/* </Grid> */}

                                            <Grid style={{ paddingTop: '8px', flexShrink: 0 }}>
                                                <Settings />
                                            </Grid>

                                            {/*                  <Grid xs={3} item style={{paddingTop: "8px"}}> */}
                                            {/*                      <IconButton */}
                                            {/*                          data-tut="toolbarChangeLang" */}
                                            {/*                          aria-controls="simple-menu" */}
                                            {/*                          aria-haspopup="true" */}
                                            {/*                          onClick={this.handleClick} */}
                                            {/*                          className="topbarIcons" */}
                                            {/*                          style={{paddingTop: "11px", width: "39px"}} */}
                                            {/*                      > */}
                                            {/* <span style={{fontSize: "16px"}}> */}
                                            {/*  /!*{this.props.language}*!/ */}
                                            {/* </span> */}
                                            {/*                      </IconButton> */}

                                            {/*                      <Menu */}
                                            {/*                          marginThreshold={0} */}
                                            {/*                          elevation={2} */}
                                            {/*                          id="simple-menu" */}
                                            {/*                          anchorEl={this.state.anchorEl} */}
                                            {/*                          keepMounted */}
                                            {/*                          open={Boolean(this.state.anchorEl)} */}
                                            {/*                          onClose={this.handleClose} */}
                                            {/*                      > */}
                                            {/*                          /!*{supportedLanguages.map((item) => {*!/ */}
                                            {/*                          /!*    return (*!/ */}
                                            {/*                          /!*        <MenuItem*!/ */}
                                            {/*                          /!*            key={item}*!/ */}
                                            {/*                          /!*            onClick={() => this.handleLanguage(item)}*!/ */}
                                            {/*                          /!*        >*!/ */}
                                            {/*                          /!*            {item}*!/ */}
                                            {/*                          /!*        </MenuItem>*!/ */}
                                            {/*                          /!*    );*!/ */}
                                            {/*                          /!*})}*!/ */}
                                            {/*                      </Menu> */}
                                            {/*                  </Grid> */}
                                            <Grid style={{ paddingTop: '8px', flexShrink: 0 }}>
                                                {
                                                    RootTourConfig[this.props.location.pathname.split('/')[1]]
                                                    && <TourGuide />
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="helpButton" />
            </div>
        );
    }
}

Layout1Topbar.propTypes = {
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    setLayoutSettings: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    settings: state.layout.settings,
    language: state.user.language,
    sidebarToggle: state.layout.sidebarToggle,
    satrexTheme: state.layout.theme,
    extraTheme: state.layout.extraTheme,
    levelPrecentage: state.user.levelPrecentage,
});

export default withRouter(
    connect(mapStateToProps, {
        setLayoutSettings,
        logoutUser,
        setLanguage,
        changeSidebarToggle,
        changeTheme,
        exiting,
    })(Layout1Topbar),
);
