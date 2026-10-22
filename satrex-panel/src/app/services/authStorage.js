import moment from 'moment';
import starkString from 'starkstring';

const AUTH_DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss';

const normalizeTokenValue = (tokenCandidate) => {
  if (!tokenCandidate) {
    return null;
  }

  if (typeof tokenCandidate === 'string') {
    return tokenCandidate;
  }

  return tokenCandidate.tokenValue
    || tokenCandidate.access_token
    || tokenCandidate.accessToken
    || tokenCandidate.token
    || null;
};

const getAccessTokenValue = (authData = {}) => (
  normalizeTokenValue(authData.jwtToken)
  || normalizeTokenValue(authData.accessToken)
  || authData.access_token
  || authData.bearerToken
  || normalizeTokenValue(authData.token)
);

const getRefreshTokenValue = (authData = {}) => (
  normalizeTokenValue(authData.refreshToken)
  || authData.refresh_token
  || authData.refreshTokenValue
  || null
);

const getExpirySeconds = (authData = {}) => (
  authData?.jwtToken?.expiresInSeconds
  || authData?.expiresInSeconds
  || authData?.expires_in
  || authData?.expiresIn
  || 86400
);

export const buildAccessTokenExpiry = (expiresInSeconds) => (
  starkString(
    moment()
      .add(Number(expiresInSeconds || 0) + 120, 'seconds')
      .format(AUTH_DATE_FORMAT),
  )
    .englishNumber()
    .toString()
);

export const persistAuthSession = (authData = {}) => {
  const bearerToken = getAccessTokenValue(authData);
  const refreshToken = getRefreshTokenValue(authData);

  if (!bearerToken) {
    return null;
  }

  const expirationDate = buildAccessTokenExpiry(getExpirySeconds(authData));

  localStorage.setItem('bearerToken', bearerToken);
  if (refreshToken) {
    localStorage.setItem(
      'refreshToken',
      starkString(refreshToken).englishNumber().toString(),
    );
  } else {
    localStorage.removeItem('refreshToken');
  }
  localStorage.setItem('expirationDate', expirationDate);

  return {
    bearerToken,
    refreshToken,
    expirationDate,
  };
};

export const clearAuthSession = () => {
  localStorage.removeItem('bearerToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expirationDate');
};

export const getStoredAccessToken = () => localStorage.getItem('bearerToken');

export const getStoredRefreshToken = () => localStorage.getItem('refreshToken');

export const getStoredExpirationDate = () => localStorage.getItem('expirationDate');

export const isAuthDateExpired = (dateValue) => {
  if (!dateValue) {
    return true;
  }

  const parsedDate = moment(dateValue, AUTH_DATE_FORMAT, true);
  if (!parsedDate.isValid()) {
    return true;
  }

  return moment().isAfter(parsedDate);
};
