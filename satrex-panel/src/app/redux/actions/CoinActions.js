import CoinpaprikaAPI from '@coinpaprika/api-nodejs-client';
import { defaultApiV3, satrexApiV3 } from '../../components/api';
import { satrexGreen } from '../../../styles/colors';

export const GET_COINS_LIST = 'GET_COINS_LIST';
export const SELECT_MARKET_PAIR = 'SELECT_MARKET_PAIR';
export const GET_SUPPORTED_COIN_LIST = 'GET_SUPPORTED_COIN_LIST';
export const GET_COIN_PRICE_API = 'GET_COIN_PRICE_API';
export const GET_SUPPORTED_ASSET_LIST = 'GET_SUPPORTED_ASSET_LIST';
export const ADD_TOMAN_LOGO = 'ADD_TOMAN_LOGO';
export const GET_DOLLAR_PRICE = 'GET_DOLLAR_PRICE';

export const getCoinsList = () => (dispatch) => {
    dispatch({
      type: GET_COINS_LIST,
      payload: '',
    });
  };

export const selectMarketPair = (asset) => (dispatch) => {
    dispatch({
      type: SELECT_MARKET_PAIR,
      payload: asset,
    });
  };

export const getSupportedCoinList = () => (dispatch) => {
    satrexApiV3()
      .get('/Board/GetPairsDifferentialPriceForLast24Hours')
      .catch(() => defaultApiV3().get('/Board/GetPairsDifferentialPriceForLast24Hours'))
      .then((res) => {
        if (res && res.data && res.data.data != null) {
          dispatch({
            type: GET_SUPPORTED_COIN_LIST,
            payload: res.data.data,
          });
        }
      })
      .catch(() => {});
  };

export const getSupportedAssetList = () => (dispatch) => {
    satrexApi.post('Pair/GetList').then((res) => {
      if (res && res.data && res.data.data != null) {
        dispatch({
          type: GET_SUPPORTED_ASSET_LIST,
          payload: res.data.data,
        });
      }
    }).catch(() => {});
  };

export const addTomanLogo = (logo) => (dispatch) => {
    dispatch({
      type: ADD_TOMAN_LOGO,
      payload: logo,
    });
  };

export const getCoinPriceApi = () => (dispatch, getState) => {
    const client = new CoinpaprikaAPI();
    // axios.get('https://api.coinpaprika.com/v1/ticker').then((data)=>{
    // })
    client.getTicker().then((data) => {
      const coinPaprikaList = [];
      let dollarPrice = 0;
      for (let i = 0; i < 2500; i++) {
        const supportedCoins = getState().coin.coinsList.map((item) => item.replace(/\s/g, ''));
        const supportedCoin = getState().coin.supportedCoinList.filter((item) => item.sourceAssetSymbol === data[i].symbol && item.destinationAssetSymbol === 'TOMAN')[0];
        if (data[i].name === 'Iranian Rial') {
          dollarPrice = data[i];
        }
          // console.log('coin : ', data[i]);
        const coinIndex = supportedCoins.indexOf(
          data[i].name.toLowerCase().replace(/\s/g, ''),
          0,
        );

        if (coinIndex >= 0) {
          coinPaprikaList.push({
            name: data[i].name,
            symbol: data[i].symbol,
            change: parseFloat(data[i].percent_change_24h ?? 0),
            color: data[i].percent_change_24h >= 0 ? satrexGreen : 'red',
            price: parseFloat(supportedCoin.lastPriceInTether),
            tomanPrice: parseFloat(supportedCoin.lastPriceInToman),
            totalSupply: data[i].total_supply,
            rank: data[i].rank,
            marketCapUsd: data[i].market_cap_usd,
            pair: `${data[i].symbol}USD`,
            pairId: supportedCoin?.pairId,
          });
        }
        if (i > 2498) {
          dispatch({
            type: GET_COIN_PRICE_API,
            payload: { coinPaprikaList, dollarPrice },
          });
          break;
        }
      }
    });
  };
