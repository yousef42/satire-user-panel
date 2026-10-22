import jwtAuthService from '../../services/jwtAuthService';
import {
    clearAuthSession,
    persistAuthSession,
} from '../../services/authStorage';
import { SET_JWT_TOKEN } from './UserActions';
import history from '../../../history.js';
import { setTopbarValues } from './LayoutActions';

import { Store } from '../Store';
import { getSupportedCoinList } from './CoinActions';
import { satrexApi } from '../../components/api';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const CAPTCHA_COMPLETED = 'CAPTCHA_COMPLETED';
export const EXITING = 'EXITING';
export const HANDLE_TOKEN_QUEUE = 'HANDLE_TOKEN_QUEUE';
export const REFRESH_TOKEN_TIME = 'REFRESH_TOKEN_TIME';

export function loginWithEmailAndPassword({ email, password }) {
    return (dispatch) => {
        jwtAuthService
            .loginWithEmailAndPassword(email, password)
            .then((user) => {
                if (user.data.isSuccess) {
                    const session = persistAuthSession(user.data.data);
                    dispatch(
                        setJwtToken(
                            session?.bearerToken,
                            session?.refreshToken,
                        ),
                    );
                    dispatch(setRefreshTokenTime(session?.expirationDate));
                    Store.dispatch(setTopbarValues());
                    Store.dispatch(getSupportedCoinList());
                    history.replace({
                        pathname: '/home',
                        state: {
                            prevPath: history?.location?.pathname,
                        },
                    });
                    return dispatch({
                        type: LOGIN_SUCCESS,
                    });
                }
                // errorAlert();
                history.push({
                    pathname: '/login',
                });
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: user.data.Errors[0].Description,
                });
            })
            .catch(() => {
                history.push({
                    pathname: '/login',
                });
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: 'failedInMission',
                });
            });
    };
}

export function resetPassword({ email }) {
    return (dispatch) => {
        dispatch({
            payload: email,
            type: RESET_PASSWORD,
        });
    };
}

export const setJwtToken = (token, refreshToken) => (dispatch) => {
    dispatch({
        type: SET_JWT_TOKEN,
        payload: { token, refreshToken },
    });
};

export const exiting = () => async (dispatch) => {
    await satrexApi().post('/Token/Logout');
    clearAuthSession();
    return dispatch({
        type: EXITING,
    });
};

export const captchaCompleted = () => (dispatch) => {
    dispatch({
        type: CAPTCHA_COMPLETED,
    });
};
export const addNewRequest = () => (dispatch) => {
    dispatch({
        type: HANDLE_TOKEN_QUEUE,
    });
};
export const setRefreshTokenTime = (date) => (dispatch) => {
    dispatch({
        type: REFRESH_TOKEN_TIME,
        payload: date,
    });
};
