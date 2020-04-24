import { useState, useEffect, useCallback } from 'react';
import ls from 'local-storage';

import { setOauthToken, wcaApiFetch } from './api';
import { isStaging } from './routes';

const defaultData = {
  data: null,
  lastFetched: null,
};

export const clearForNewUser = () => {
  const staging = ls('staging');
  const token = ls('token');
  const currentUser = ls('currentUser');
  ls.clear();
  ls('currentUser', currentUser);
  ls('token', token);
  ls('staging', staging);
};

export const getOauthTokenIfAny = () => {
  // Try getting it from the url, if we're redirected from the WCA website.
  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);
  if (hashParams.has('access_token')) {
    window.location.hash = '';
    setOauthToken(hashParams.get('access_token'));
    const stored = ls('currentUser');
    if (stored) {
      // We had a user!
      // It may be us, so just reset the lastFetched date to force a sync.
      stored.lastFetched = null;
      ls('currentUser', stored);
    }
  }
};

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

export const setRemoteIfNeeded = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('staging') && !isStaging()) {
    setStaging();
  }
  if (params.has('prod') && isStaging()) {
    setProd();
  }
};

/* eslint-disable import/prefer-default-export */
export const usePersistence = (kind, url) => {
  const [loadedData, setData] = useState({
    ...defaultData,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sync = useCallback(() => {
    setLoading(true);
    setError(null);
    wcaApiFetch(url).then((loaded) => {
      const data = {
        data: loaded,
        lastFetched: Date.now(),
      };
      setData(data);
      ls(kind, data);
    }).catch((err) => {
      setError(err.message);
    }).finally(() => setLoading(false));
  }, [kind, url, setData, setError]);

  useEffect(() => {
    const storedData = ls(kind) || {
      ...defaultData,
    };
    if (!storedData.lastFetched) {
      sync();
    } else {
      setData(storedData);
      setLoading(false);
    }
  }, [kind, sync]);

  return {
    loadedData,
    loading,
    error,
    sync,
  };
};
