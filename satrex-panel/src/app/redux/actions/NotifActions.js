export const SHOW_SUCCESS = 'SHOW_SUCCESS';
export const SHOW_FAILED = 'SHOW_FAILED';
export const SHOW_INFO = 'SHOW_INFO';
export const CLOSE_ALERT = 'SHOW_INFO';

export function showSuccessAlert(user) {
  return (dispatch) => {
    dispatch({
      type: SHOW_SUCCESS,
      data: user,
    });
  };
}
export function showFailedAlert(user) {
  return (dispatch) => {
    dispatch({
      type: SHOW_FAILED,
      data: user,
    });
  };
}
export function showInfoAlert(user) {
  return (dispatch) => {
    dispatch({
      type: SHOW_INFO,
      data: user,
    });
  };
}
export function closeAlert(user) {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ALERT,
      data: user,
    });
  };
}
