import ls from 'local-storage';
import {
  getOauthClientId,
  oauthUrl,
} from './routes';

// For now, this is only some internal details
const getOauthToken = () => ls('token') || '';

export const setOauthToken = (token) => ls('token', token);

export const wcaApiFetch = (url, fetchOptions = {}) => {
  const oauthToken = getOauthToken();
  if (oauthToken.length === 0) {
    // No point in even trying!
    return new Promise(() => {
      throw new Error('Oauth token empty, please log in.');
    });
  }
  return fetch(url,
    {
      ...fetchOptions,
      headers: new Headers({
        Authorization: `Bearer ${oauthToken}`,
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response;
    })
    .then((response) => response.json());
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
