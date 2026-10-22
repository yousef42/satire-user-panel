import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { setLanguage, setUserData } from '../redux/actions/UserActions';
import history from '../../history.js';
import {
  setJwtToken,
  setRefreshTokenTime,
} from '../redux/actions/LoginActions';
import { changeTheme } from '../redux/actions/LayoutActions';
import { availTheme } from '../MasterLayout/MasterTheme/ThemeAtrr';
import {
  getStoredExpirationDate,
} from '../services/authStorage';

class Auth extends Component {
  state = {};

  constructor(props) {
    super(props);

    if (localStorage.getItem('language')) this.props.setLanguage(localStorage.getItem('language'));
    if (localStorage.getItem('theme') === 'true' || localStorage.getItem('theme') === 'false' || availTheme[localStorage.getItem('theme')]) this.props.changeTheme(localStorage.getItem('theme') === 'true' ? true : (localStorage.getItem('theme') === 'false' ? false : localStorage.getItem('theme')));
    else this.props.changeTheme(false);
    this.checkJwtAuth();
  }

  checkJwtAuth = () => {
    const storedExpirationDate = getStoredExpirationDate();
    const hasBearerToken = Boolean(localStorage.getItem('bearerToken'));
    const hasRefreshToken = Boolean(localStorage.getItem('refreshToken'));

    // Keep this diagnostic data token-safe: never print token values in the console.
    console.info('[Auth] startup session check', {
      pathname: history.location.pathname,
      hasBearerToken,
      hasRefreshToken,
      expirationDate: storedExpirationDate,
      isDevelopment: import.meta.env.DEV,
    });

    // در حالت توسعه (npm run dev) اجازهٔ دیدن همه صفحات بدون لاگین
    if (import.meta.env.DEV) {
      console.info('[Auth] skipping redirect in development mode');
      this.props.setRefreshTokenTime(localStorage.getItem('expirationDate'));
      this.props.setJwtToken(
        localStorage.getItem('bearerToken'),
        localStorage.getItem('refreshToken'),
      );
      return;
    }

    this.props.setRefreshTokenTime(storedExpirationDate);
    this.props.setJwtToken(
      localStorage.getItem('bearerToken'),
      localStorage.getItem('refreshToken'),
    );

    if (
        (history.location.pathname !== '/register' && history.location.pathname.split('/')[1] !== 'register'
            && !hasBearerToken && history.location.pathname !== '/satrex-markets')
    ) {
      console.warn('[Auth] redirecting to login: no bearer token in storage', {
        pathname: history.location.pathname,
      });
      history.replace({
        pathname: '/login',
        state: { prevRoute: history.location.pathname },
      });
    } else {
      console.info('[Auth] session restored; waiting for API to validate the token');
    }
  };

  render() {
    // function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); }
    // document.addEventListener('keydown', disableF5);
    const { children } = this.props;
    return <>{children}</>;
  }
}

const mapStateToProps = (state) => ({
  setUserData: PropTypes.func.isRequired,
  login: state.login,
});

export default connect(mapStateToProps, {
  setUserData,
  setJwtToken,
  setLanguage,
  setRefreshTokenTime,
  changeTheme,
})(Auth);
