import {
  SELECT_MARKET_PAIR,
  GET_SUPPORTED_COIN_LIST,
  GET_COIN_PRICE_API,
  GET_SUPPORTED_ASSET_LIST,
  ADD_TOMAN_LOGO,
} from '../actions/CoinActions';
import _ from "lodash"
const initialState = {
  coinsList: [],
  coinLogos: null,
  selectedMarket: null,
  supportedCoinList: [],
  supportedAssetList: [],
  coinPaprikaList: [],
  dollarPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MARKET_PAIR: {
      return {
        ...state,
        selectedMarket: action.payload,
      };
    }
    case GET_SUPPORTED_COIN_LIST: {
      const logosArr = {};
      action.payload.forEach((item) => logosArr[item.sourceAssetSymbol] = item.sourceAssetImageAddress);
      return {
        ...state,
        supportedCoinList: action.payload,
        coinsList: _.keys(
          _.groupBy(action.payload, 'sourceAssetEnglishTitle'),
        ).map((v) => v.toLowerCase()),
        coinLogos: state.coinLogos ? { ...state.coinLogos, ...logosArr } : logosArr,
      };
      }

    case ADD_TOMAN_LOGO: {
      return {
        ...state,
        coinLogos: { ...state.coinLogos, TOMAN: action.payload },
      };
    }

    case GET_SUPPORTED_ASSET_LIST: {
      return {
        ...state,
        supportedAssetList: action.payload,
      };
    }
    case GET_COIN_PRICE_API: {
      return {
        ...state,
        coinPaprikaList: action.payload.coinPaprikaList,
        dollarPrice: action.payload.dollarPrice,
      };
    }

    default: {
      return state;
    }
  }
};
