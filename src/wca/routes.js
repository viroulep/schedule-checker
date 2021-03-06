import ls from 'local-storage';

const prodBaseUrl = 'https://www.worldcubeassociation.org';
const stagingBaseUrl = 'https://staging.worldcubeassociation.org';
const overridenBaseUrl = process.env.REACT_APP_WCA_URL;

export const isStaging = () => overridenBaseUrl || ls('staging');

const wcaUrl = () => (overridenBaseUrl || (isStaging() ? stagingBaseUrl : prodBaseUrl));

export const getOauthClientId = () => (isStaging() ? 'example-application-id' : '3A9BGEPZcmf7CA1D77meVRMzFGT-CZq6-6oXyPgelMU');

export const baseUrl = (path = '') => `${wcaUrl()}${path}`;

export const oauthUrl = (paramsAsString) => baseUrl(`/oauth/authorize?${paramsAsString}`);

export const apiUrl = (path) => baseUrl(`/api/v0${path}`);
export const selfUrl = () => apiUrl('/me');
export const competitionsUrl = (path) => apiUrl(`/competitions${path}`);
export const competitionWcifUrl = (id) => competitionsUrl(`/${id}/wcif`);
