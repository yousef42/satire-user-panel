import history from '../../../history.js';
import jwtAuthService from '../../services/jwtAuthService';
import { satrexApi } from '../../components/api';

export const SET_USER_DATA = 'USER_SET_DATA';
export const REMOVE_USER_DATA = 'USER_REMOVE_DATA';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LANGUAGE = 'USER_LANGUAGE';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const GET_USER_LEVEL_PERCENTAGE = 'GET_USER_LEVEL_PERCENTAGE';

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      data: user,
    });
  };
}

export function getUserLevelPercentage() {
  return (dispatch) => {
    satrexApi()
      .post('/Dashboard/GetUserProfileCompletedLevelPercentage')
      .then((res) => {
        if (res && res.data && res.data.data != null) {
          dispatch({
            type: GET_USER_LEVEL_PERCENTAGE,
            payload: res.data.data.percentage,
          });
        }
      })
      .catch(() => {});
  };
}

export const setLanguage = (language) => {
  localStorage.setItem('language', language);
  return (dispatch) => {
    dispatch({
      type: USER_LANGUAGE,
      payload: language,
    });
  };
};

export function logoutUser() {
  return (dispatch) => {
    jwtAuthService.logout();

    history.push({
      pathname: '/login',
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}
