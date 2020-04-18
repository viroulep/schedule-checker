import ls from 'local-storage';
import {
  selfUrl,
  competitionWcifUrl,
  getOauthClientId,
  oauthUrl,
  setStaging,
  setProd,
  isStaging,
} from './routes';

// For now, this is only some internal details
const getOauthToken = () => ls('token') || '';

export const setOauthToken = (token) => ls('token', token);
export const signOut = () => {
  ls('token', '');
};

export const setRemoteIfNeeded = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('staging') && !isStaging()) {
    signOut();
    setStaging();
  }
  if (params.has('prod') && isStaging()) {
    signOut();
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


// Call this upon loading to get the token in local storage is still valid!
export const loginUser = (setUser, setLoading) => {
  if (getOauthToken().length === 0) {
    return;
  }

  setLoading(true);
  getMe().then((user) => {
    setUser(user.me);
  }).catch(() => {
    // invalid token or other error, reset everything.
    ls('token', '');
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
