import {
  SHOW_FAILED,
  SHOW_INFO,
  SHOW_SUCCESS,
  CLOSE_ALERT,
} from '../actions/NotifActions';

const initialState = {
  showAlert: {
    open: false,
    vertical: '',
    horizontal: '',
  },
};
const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case SHOW_SUCCESS: {
      return {
        ...state,
        showAlert: action.payload,
      };
    }
    case SHOW_FAILED: {
      return {
        ...state,
        showAlert: action.payload,
      };
    }
    case SHOW_INFO: {
      return {
        ...state,
        showAlert: action.payload,
      };
    }
    case CLOSE_ALERT: {
      return {
        ...state,
        showAlert: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
