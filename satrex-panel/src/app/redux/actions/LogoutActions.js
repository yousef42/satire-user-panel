import jwtAuthService from '../../services/jwtAuthService';
import history from '../../../history.js';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_LOADING = 'LOGIN_LOADING';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export function loginWithEmailAndPassword({ email, password }) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOADING,
        });

        jwtAuthService
            .loginWithEmailAndPassword(email, password)
            .then((user) => {
                if (user.data.isSuccess) {
                    localStorage.setItem('bearerToken', user.data.data.access_token);
                    history.push({
                        pathname: '/',
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
            .catch((error) => {
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
