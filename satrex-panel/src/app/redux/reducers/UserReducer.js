import {
  SET_USER_DATA,
  REMOVE_USER_DATA,
  USER_LOGGED_OUT,
  USER_LANGUAGE,
  GET_USER_LEVEL_PERCENTAGE,
} from '../actions/UserActions';

const initialState = {
  language: 'FA',
  levelPrecentage: null,
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.data,
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state,
      };
    }
    case GET_USER_LEVEL_PERCENTAGE: {
      return {
        ...state,
        levelPrecentage: action.payload,
      };
    }
    case USER_LOGGED_OUT: {
      return state;
    }
    case USER_LANGUAGE: {
      return {
        ...state,
        language: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
