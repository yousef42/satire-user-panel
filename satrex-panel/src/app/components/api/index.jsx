import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Store } from '../../redux/Store';
import history from '../../../history';
import {
    setJwtToken,
    setRefreshTokenTime,
} from '../../redux/actions/LoginActions';
import { getCoinsList } from '../../redux/actions/CoinActions';
import {
    clearAuthSession,
    getStoredAccessToken,
    getStoredRefreshToken,
    persistAuthSession,
} from '../../services/authStorage';

const requestHeader = axios.create({

    baseURL: 'https://enduserapi.satrex.ir/api/v1',
    // baseURL: "https://enduserapi.ttm.satrex.ir/api/v1",
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Accept-language': Store.getState().user.language,
        // 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
    },
    withCredentials: false,
});

const requestHeaderV3 = axios.create({

    baseURL: 'https://enduserapi.satrex.ir/api/v3',
    // baseURL: "https://enduserapi.satrex.net/api/v3",
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Accept-language': Store.getState().user.language,
        // 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
    },
    withCredentials: false,
});

export default requestHeader;
export const defaultApi = () => {
    requestHeader.defaults.headers.common.Authorization = null;
    return requestHeader;
};

export const defaultApiV3 = () => {
    requestHeaderV3.defaults.headers.common.Authorization = null;
    return requestHeaderV3;
};


export const satrexApi = () => {
    let token = null;
    if (Store.getState().login.token) {
        token = Store.getState().login.token.token;
    } else {
        token = getStoredAccessToken();
    }

    requestHeader.defaults.headers.common.Authorization = `bearer ${token}`;
    return requestHeader;
};

export const satrexApiV3 = () => {
    let token = null;
    if (Store.getState().login.token) {
        token = Store.getState().login.token.token;
    } else {
        token = getStoredAccessToken();
    }

    requestHeaderV3.defaults.headers.common.Authorization = `bearer ${token}`;
    return requestHeaderV3;
};

export const satrexImageGet = () => {
    requestHeader.defaults.headers.common['Sec-Fetch-Dest'] = 'image';
    requestHeader.defaults.headers.common['Sec-Fetch-Mode'] = 'no-cors';
    requestHeader.defaults.headers.common.Authorization = null;
    requestHeader.defaults.headers.common.Accept = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8';
    return requestHeader;
};

export const baseUrl = 'https://enduserapi.satrex.ir';
// export const baseUrl = "https://enduserapi.ttm.satrex.ir";
axiosRetry(axios, {
    retries: 3, // number of retries
    retryDelay: (retryCount) => retryCount * 2000, // time interval between retries
    retryCondition: (error) =>
        // if retry condition is not specified, by default idempotent requests are retried
        error.response.status === 401 || !window.navigator.onLine
    ,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

requestHeader.interceptors.request.use(
    (config) => {
        config.headers['Accept-language'] = Store.getState().user.language === 'FA' ? 'fa-IR' : 'en';
        return config;
    },
);

requestHeaderV3.interceptors.request.use(
    (config) => {
        config.headers['Accept-language'] = Store.getState().user.language === 'FA' ? 'fa-IR' : 'en-US';
        return config;
    },
);

satrexApi().interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        if (!window.navigator.onLine) {
            originalRequest._retry = true;
            setTimeout(() => {
                satrexApi()(originalRequest);
            }, 10000);
        }
        if (error.response) {
            if (error.response.status === 400) {
                error.response.status = 200;
            }
            if (error.response.status === 401 && !originalRequest._retry) {
                console.warn('[Auth] API returned 401; attempting session refresh', {
                    url: originalRequest.url,
                    method: originalRequest.method,
                });
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return axios(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                isRefreshing = true;
                originalRequest._retry = true;

                return new Promise((resolve, reject) => {
                    const refreshToken = Store.getState().login.token?.refreshToken || getStoredRefreshToken();

                    if (!refreshToken) {
                        console.warn('[Auth] redirecting to login: refresh token is missing');
                        clearAuthSession();
                        processQueue(error, null);
                        history.replace({
                            pathname: '/login',
                        });
                        isRefreshing = false;
                        reject(error);
                        return;
                    }

                    defaultApiV3()
                        .post('/Token/Refresh', {
                            refreshToken,
                        })
                        .catch(() => defaultApi().post('/Token/Refresh', {
                            refreshToken,
                        }))
                        .then((res) => {
                            if (res.status === 201 || res.status === 200) {
                                if (!res.data.isSuccess) {
                                    console.warn('[Auth] redirecting to login: refresh token was rejected');
                                    clearAuthSession();
                                    processQueue(error, null);
                                    history.replace({
                                        pathname: '/login',
                                    });
                                    reject(error);
                                } else {
                                    const session = persistAuthSession(res.data.data);

                                    console.info('[Auth] access token refreshed successfully', {
                                        hasBearerToken: Boolean(session?.bearerToken),
                                        hasRefreshToken: Boolean(session?.refreshToken),
                                        expirationDate: session?.expirationDate,
                                    });

                                    satrexApi().defaults.headers.common.Authorization = `Bearer ${session.bearerToken}`;
                                    Store.dispatch(getCoinsList());
                                    Store.dispatch(
                                        setJwtToken(
                                            session.bearerToken,
                                            session.refreshToken,
                                        ),
                                    );
                                    Store.dispatch(
                                        setRefreshTokenTime(
                                            session.expirationDate,
                                        ),
                                    );
                                    originalRequest.headers.Authorization = `bearer ${session.bearerToken}`;
                                    processQueue(null, session.bearerToken);
                                    resolve(axios(originalRequest));
                                }
                            }
                        })
                        .catch((err) => {
                            console.warn('[Auth] redirecting to login: refresh request failed', {
                                status: err?.response?.status,
                            });
                            clearAuthSession();
                            processQueue(err, null);
                            history.replace({
                                pathname: '/login',
                            });
                            reject(err);
                        })
                        .then(() => {
                            isRefreshing = false;
                        });
                });
            }
            return Promise.reject(error);
        }
    },
);

export const authRoutes = ['/register', '/login', '/reset-password'];
