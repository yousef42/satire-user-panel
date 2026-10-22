import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material';
import { connect } from 'react-redux';
import { withRouterCompat as withRouter } from '../../router/routerCompat';
import {
  setLayoutSettings,
  setDefaultSettings,
} from '../../redux/actions/LayoutActions';
import { logoutUser } from '../../redux/actions/UserActions';
import satrexFadeBackground from '../../../images/dashboard.svg';
import Sidenav from '../SharedCompoents/Sidenav';
import SidenavTheme from '../MasterTheme/SidenavTheme';
import { satrexBorderDarkColor } from '../../../styles/colors';
import ThemeAtrr from '../MasterTheme/ThemeAtrr';

class Layout1Sidenav extends Component {
  updateSidebarMode = (sidebarSettings) => {
    const { settings, setLayoutSettings, setDefaultSettings } = this.props;
    const updatedSettings = {
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    };
    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  handleSidenavToggle = () => {
    this.props.changeSidebarToggle(!this.props.sidebarToggle);
    const mode = this.props.sidebarToggle ? 'full' : 'compact';
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutUser();
  };

  render() {
    const { settings } = this.props;
    const sidenavTheme = settings?.themes?.[settings?.layout1Settings?.leftSidebar?.theme] || createTheme({});

    return (
      <ThemeProvider theme={sidenavTheme}>
        <SidenavTheme theme={sidenavTheme} settings={settings} />
        <style>
{`
                    .sidebarStyle {
                      border-color : ${this.props.satrexTheme
            ? '#ececec'
            : satrexBorderDarkColor
        };
                      transition: 0.3s;
                      overflow-y: auto; 
                      }
                  `}
        </style>

        <div
id="sidenav"
          className={`sidenav  sidebarStyle ${
            this.props.user.language === 'EN'
            || this.props.user.language === 'fr'
            || this.props.user.language === 'gr'
              ? 'sidenavLtr'
              : 'sidenavRtl'
          } ${this.props.satrexTheme ? 'sidenav__hold' : 'sidenav__holdDark'}`}
          style={{ ...ThemeAtrr(this.props.extraTheme).sidebarStyle, borderColor: this.props.satrexTheme ? '#ececec' : satrexBorderDarkColor }}
        >

          <div
            style={{
              direction:
                this.props.lang === 'EN'
                || this.props.user.language === 'fr'
                || this.props.user.language === 'gr'
                  ? 'ltr'
                  : 'rtl',
              paddingLeft: '3px',
              paddingRight: '3px',
            }}
          >
            <Sidenav />

            <div className="satrexFadeDiv">
              <div
                style={{ background: `url(${satrexFadeBackground})` }}
                className={
                  this.props.lang === 'EN'
                    ? 'satrexFadeLogoLtr'
                    : 'satrexFadeLogoRtl'
                }
              />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

Layout1Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setDefaultSettings: PropTypes.func.isRequired,
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: state.user,
  settings: state.layout.settings,
  satrexTheme: state.layout.theme,
  extraTheme: state.layout.extraTheme,
  sidebarToggle: state.layout.sidebarToggle,
  lang: state.user.language,
});

export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings,
    setDefaultSettings,
    logoutUser,
  })(Layout1Sidenav),
);
