import api from '../../components/api';

export const GET_BANK_ACCOUNTS = 'GET_BANK_ACCOUNTS';
export const ADD_BANK_ACCOUNTS = 'ADD_BANK_ACCOUNTS';
export const REMOVE_BANK_ACCOUNTS = 'REMOVE_BANK_ACCOUNTS';
export const BANK_CONFIRMED = 'BANK_CONFIRMED';
export const getBankAccounts = () => (dispatch) => {
    api.get('/api/v1/BankAccounts').then((data) => {
      dispatch({
        type: GET_BANK_ACCOUNTS,
        payload: data,
      });
    });
  };

export const addBankAccount = (bankAccount) => (dispatch) => {
    dispatch({
      type: ADD_BANK_ACCOUNTS,
      payload: bankAccount,
    });
  };

export const removeBankAccount = (index) => (dispatch) => {
    dispatch({
      type: REMOVE_BANK_ACCOUNTS,
      payload: index,
    });
  };
export const bankConfirmed = (status) => (dispatch) => {
    dispatch({
      type: BANK_CONFIRMED,
      payload: status,
    });
  };
