import ls from 'local-storage';

const prodBaseUrl = 'https://www.worldcubeassociation.org';
const stagingBaseUrl = 'https://staging.worldcubeassociation.org';
const overridenBaseUrl = process.env.REACT_APP_WCA_URL;

export const setStaging = () => {
  ls.clear();
  ls('staging', true);
  document.location.reload();
};
export const setProd = () => {
  ls.clear();
  ls('staging', false);
  document.location.reload();
};

export const isStaging = () => overridenBaseUrl || ls('staging');

const WCA_URL = overridenBaseUrl || (isStaging() ? stagingBaseUrl : prodBaseUrl);

export const getOauthClientId = () => ((overridenBaseUrl || isStaging())
  ? 'example-application-id'
  : '3A9BGEPZcmf7CA1D77meVRMzFGT-CZq6-6oXyPgelMU');

export const baseUrl = (path = '') => `${WCA_URL}${path}`;

export const oauthUrl = (paramsAsString) => baseUrl(`/oauth/authorize?${paramsAsString}`);

export const apiUrl = (path) => baseUrl(`/api/v0${path}`);
export const selfUrl = () => apiUrl('/me');
export const competitionsUrl = (path) => apiUrl(`/competitions${path}`);
export const competitionWcifUrl = (id) => competitionsUrl(`/${id}/wcif`);
