import {
  ADD_FAVORITE_MARKET,
  REMOVE_FAVORITE_MARKET,
  SET_FAVORITE_MARKETS,
} from '../actions/MarketActions';

const initialState = {
  favoriteMarkets: [],
};

const MarketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_MARKET: {
      return {
        ...state,
        favoriteMarkets: [...state.favoriteMarkets, action.payload],
      };
    }
    case REMOVE_FAVORITE_MARKET: {
      return {
        ...state,
        favoriteMarkets: state.favoriteMarkets.filter(
          (item) => item.pairId !== action.payload.pairId,
        ),
      };
    }
    case SET_FAVORITE_MARKETS: {
      return {
        ...state,
        favoriteMarkets: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default MarketReducer;
