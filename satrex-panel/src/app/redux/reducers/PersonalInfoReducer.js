import {
  GET_PERSONAL_INFO,
  ADD_PERSONAL_INFO,
  ADD_NATIONAL_IMAGE,
  ADD_PERSONAL_IMAGE,
} from '../actions/PersonalInfoActions';

const initialState = {
  personalInfo: {},
  nationalCardImage: null,
  passportImage: null,
  personalImage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_INFO: {
      return {
        ...state,
        personalInfo: action.payload,
      };
    }
    case ADD_PERSONAL_INFO: {
      return {
        ...state,
        personalInfo: action.payload,
      };
    }
    case ADD_NATIONAL_IMAGE: {
      return {
        ...state,
        nationalCardImage: action.payload,
      };
    }
    case ADD_PERSONAL_IMAGE: {
      return {
        ...state,
        personalImage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
