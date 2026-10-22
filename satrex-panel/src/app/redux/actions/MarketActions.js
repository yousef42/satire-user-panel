export const ADD_FAVORITE_MARKET = 'ADD_FAVORITE_MARKET';
export const REMOVE_FAVORITE_MARKET = 'REMOVE_FAVORITE_MARKET';
export const SET_FAVORITE_MARKETS = 'SET_FAVORITE_MARKETS';

export const addFavoriteMark = (row) => (dispatch) => {
    dispatch({
      type: ADD_FAVORITE_MARKET,
      payload: row,
    });
  };
export const removeFavMarket = (row) => (dispatch) => {
    dispatch({
      type: REMOVE_FAVORITE_MARKET,
      payload: row,
    });
  };
export const setFavoriteMarkets = (row) => (dispatch) => {
    dispatch({
      type: SET_FAVORITE_MARKETS,
      payload: row,
    });
  };
