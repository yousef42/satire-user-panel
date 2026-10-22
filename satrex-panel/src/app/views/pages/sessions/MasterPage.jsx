import React, { Component } from 'react';
import { Grid, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { withStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withRouterCompat as withRouter } from '../../../router/routerCompat';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { loginWithEmailAndPassword } from '../../../redux/actions/LoginActions';
import RtlComponent from '../../../components/rtlComponent';
import '../../../../styles/chart.scss';
import Candles from './components/Candles';
import TopShadow from './components/TopShadow';
import MainLogo from './components/MainLogo';
import TextTitle from './components/TextTitle';
import BottomShadow from './components/BottomShadow';
import { supportedLanguages } from '../../../components/lang';
import { setLanguage } from '../../../redux/actions/UserActions';
import { satrexGray } from '../../../../styles/colors';

const styles = (theme) => ({
    wrapper: {
        position: 'relative',
    },

    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class MasterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
        };
    }

    switchAgreement = () => {
        this.setState({ agreement: !this.state.agreement });
    };

    handleFormSubmit = (event) => {
        this.props.loginWithEmailAndPassword({ ...this.state });
    };

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            setTimeout(() => {
                this.setState({ mounted: true });
            }, 500);
        }

        // (countryCodes);
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    async handleLanguage(lang) {
        await this.props.setLanguage(lang);
        this.handleClose();
    }

    render() {
        const candleRows = Array.from(Array(150).keys());
        const isEn = this.props.language === 'EN'
            || this.props.language === 'GR'
            || this.props.language === 'FR';
        return (
            <div style={{ flex: 1, paddingBottom: 200 }}>
                <RtlComponent>
                    {
                        this._isMounted
                        && (
                            <center>
                                <div
                                    style={{
                                        maxWidth: '550px', height: '0px', zIndex: 1000, position: 'relative',
                                    }}
                                // dragConstraints={{
                                //     top: -0,
                                //     left: -0,
                                //     right: 0,
                                //     bottom: 0,
                                // }}
                                // drag
                                >
                                    <Paper className="formBox borderR9 animate__animated satrexFadeInUp">
                                        <Grid container style={{ direction: !isEn ? 'ltr' : 'rtl' }}>
                                            <Grid size={1}>
                                                <IconButton
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={this.handleClick}
                                                    className="topbarIcons"
                                                    style={{ width: 40, height: 40 }}
                                                >
                                                    <span style={{ fontSize: '16px', color: satrexGray }}>
                                                        {this.props.language}
                                                    </span>
                                                </IconButton>

                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={this.state.anchorEl}
                                                    keepMounted
                                                    open={Boolean(this.state.anchorEl)}
                                                    onClose={this.handleClose}
                                                // classes={{
                                                //     paper: classes.languageBox,
                                                // }}
                                                >
                                                    {supportedLanguages.map((item) => (
                                                        <MenuItem
                                                            key={item}
                                                            onClick={() => this.handleLanguage(item)}
                                                        >
                                                            {item}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Grid>
                                            <Grid size={10} />
                                            {
                                                this.props.back
                                                && (
                                                    <Grid size={1}>
                                                        <IconButton
                                                            onClick={() => {
                                                                this.props.history.push({ pathname: this.props.back.path });
                                                            }}
                                                        >
                                                            <ArrowRightAltRoundedIcon
                                                                style={{ transform: isEn ? 'rotate(180deg)' : '' }}
                                                            />
                                                        </IconButton>
                                                    </Grid>
                                                )
                                            }
                                            <Grid size={12}>
                                                {this.props.children}
                                            </Grid>
                                        </Grid>
                                    </Paper>

                                    {/* <RegisterFormTabs /> */}
                                </div>
                            </center>
                        )
                    }
                    <Grid container className="signup">
                        <Grid dir="rtl" size={12}>
                            <Grid container style={{ position: 'relative', top: -25 }}>
                                <Grid className="topLogoShadow" size={5}>
                                    <TopShadow />
                                </Grid>
                                <Grid className="mainLogo" size={2}>
                                    <motion.div
                                        className="position-relative loginMainLogo"
                                        initial={{ opacity: 0 }}
                                        transition={{ delay: 1 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <Grid container>
                                            <Grid style={{ marginTop: '10%' }} size={8}>
                                                <TextTitle />
                                            </Grid>

                                        </Grid>
                                    </motion.div>
                                </Grid>
                                <Grid className="bottomLogoShadow" size={5}>
                                    <BottomShadow />
                                </Grid>

                                <Grid className="loginCandles" size={12}>
                                    <Grid container className="animate__animated animate__fadeIn">
                                        <Grid className="candlesDiv" size={5} />
                                        <Grid className="candlesDiv" size={2} />
                                        <Grid className="candlesDiv" size={5} />
                                        <Grid
                                            style={{ overflow: 'hidden', maxHeight: '300px' }}
                                            className="center"
                                            size={12}>
                                            <Grid container style={{ direction: 'ltr', width: 'fit-content' }}>
                                                {candleRows.map((item, index) => (
                                                    <Candles
                                                        index={index}
                                                        key={index}
                                                        part={2}
                                                    />
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div
                        className={`rightShadowFadeOut ${this.state.mounted ? 'rightShadowFadeIn' : ''
                            }`}
                    />
                    <div
                        className={`leftShadowFadeOut ${this.state.mounted ? 'leftShadowFadeIn' : ''
                            }`}
                    />
                </RtlComponent>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    login: state.login,
    language: state.user.language,
});
export default withStyles(styles, { withTheme: true })(
    withRouter(connect(mapStateToProps, { loginWithEmailAndPassword, setLanguage })(MasterPage)),
);
