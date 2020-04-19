import ls from 'local-storage';
import {
  selfUrl,
  competitionWcifUrl,
  competitionsUrl,
  getOauthClientId,
  oauthUrl,
  setStaging,
  setProd,
  isStaging,
} from './routes';

// For now, this is only some internal details
const getOauthToken = () => ls('token') || '';

export const setOauthToken = (token) => ls('token', token);

export const setRemoteIfNeeded = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('staging') && !isStaging()) {
    setStaging();
  }
  if (params.has('prod') && isStaging()) {
    setProd();
  }
};

const wcaApiFetch = (url, fetchOptions = {}) => fetch(url,
  {
    ...fetchOptions,
    headers: new Headers({
      Authorization: `Bearer ${getOauthToken()}`,
      'Content-Type': 'application/json',
    }),
  })
  .then((response) => {
    if (!response.ok) throw new Error(response.statusText);
    return response;
  })
  .then((response) => response.json());

export const getMe = () => wcaApiFetch(selfUrl());
export const getCompetitionWcif = (id) => wcaApiFetch(competitionWcifUrl(id));

export const getManageableCompetitions = () => {
  // Last 12 months: months * days * hours * minByHour * secByMin * milli
  const oneYearAgo = new Date(Date.now() - 12 * 28 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    managed_by_me: true,
    start: oneYearAgo.toISOString(),
  });
  return wcaApiFetch(competitionsUrl(`?${params.toString()}`));
};

// Call this upon loading to check the token in local storage is still valid!
// TODO: store user, only re-login if token is expired!
export const loginUser = (setUser, setLoading) => {
  if (getOauthToken().length === 0) {
    return;
  }

  setLoading(true);
  getMe().then((user) => {
    setUser(user.me);
  }).catch(() => {
    // invalid token or other error, reset everything.
    ls.clear();
  }).finally(() => setLoading(false));
};

export const signIn = () => {
  const { origin } = window.location;
  const params = new URLSearchParams({
    client_id: getOauthClientId(),
    response_type: 'token',
    redirect_uri: `${origin}${process.env.PUBLIC_URL}`,
    scope: 'public manage_competitions',
  });
  window.location = oauthUrl(params.toString());
};
