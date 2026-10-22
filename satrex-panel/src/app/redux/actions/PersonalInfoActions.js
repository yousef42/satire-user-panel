// import satrexApi from '../../views/api'
import { satrexApi } from '../../components/api';

export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO';
export const ADD_PERSONAL_INFO = 'ADD_PERSONAL_INFO';
export const ADD_PASSPORT_IMAGE = 'ADD_PASSPORT_IMAGE';
export const ADD_NATIONAL_IMAGE = 'ADD_NATIONAL_IMAGE';
export const ADD_PERSONAL_IMAGE = 'ADD_PERSONAL_IMAGE';

export const getPersonalInfo = () =>
  // setAuthHeader();
   (dispatch) => {
    satrexApi()
      .post('/PersonalInfo/Get')
      .then(({ data }) => {
        if (data.data) {
          dispatch({
            type: GET_PERSONAL_INFO,
            payload: data.data,
          });
        }
      });
  };
