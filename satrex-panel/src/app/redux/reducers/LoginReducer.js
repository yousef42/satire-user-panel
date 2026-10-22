import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  RESET_PASSWORD,
  CAPTCHA_COMPLETED,
  EXITING,
  HANDLE_TOKEN_QUEUE,
  REFRESH_TOKEN_TIME,
} from '../actions/LoginActions';
import { SET_JWT_TOKEN } from '../actions/UserActions';

const initialState = {
  success: false,
  loading: false,
  captcha: false,
  error: {
    username: null,
    password: null,
  },
  token: null,
  numberOfRequest: 0,
  refreshTokenTime: null,
};

const LoginReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    }
    case CAPTCHA_COMPLETED: {
      return {
        ...state,
        captcha: true,
      };
    }
    case SET_JWT_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case EXITING: {
      return {
        ...state,
        token: null,
        refreshTokenTime: null,
      };
    }
    case HANDLE_TOKEN_QUEUE: {
      return {
        ...state,
        numberOfRequest: state.numberOfRequest + 1,
      };
    }
    case REFRESH_TOKEN_TIME: {
      return {
        ...state,
        refreshTokenTime: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
