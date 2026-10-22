import {
  GET_BANK_ACCOUNTS,
  ADD_BANK_ACCOUNTS,
  REMOVE_BANK_ACCOUNTS,
  BANK_CONFIRMED,
} from '../actions/BankActions';

const initialState = {
  accounts: [],
  bankConfirmed: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BANK_ACCOUNTS: {
      return {
        accounts: action.payload,
      };
    }
    case ADD_BANK_ACCOUNTS: {
      return {
        ...state,
      };
    }
    case REMOVE_BANK_ACCOUNTS: {
      return {
        ...state,
      };
    }
    case BANK_CONFIRMED: {
      return {
        ...state,
        bankConfirmed: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
