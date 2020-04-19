import { useState, useEffect, useCallback } from 'react';
import ls from 'local-storage';

const defaultData = {
  data: null,
  lastFetched: null,
};

/* eslint-disable import/prefer-default-export */
export const usePersistence = (kind, fetcher) => {
  const [loadedData, setData] = useState({
    ...defaultData,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sync = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher().then((loaded) => {
      const data = {
        data: loaded,
        lastFetched: Date.now(),
      };
      setData(data);
      ls(kind, data);
    }).catch((err) => {
      setError(err.message);
    }).finally(() => setLoading(false));
  }, [kind, fetcher, setData, setError]);

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
