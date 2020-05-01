import React, { useState, useEffect } from 'react';
import {
  Button, Header, Icon,
} from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';

import { parseActivityCode, localConfigFromActivity } from '../wca/wcif';
import { timeToString } from '../utils';

const computeBestConfig = (
  activity,
  compWcif,
  maxStaff,
  maxStations,
  times,
  selectedModel,
  setBestConfig,
  setError,
  simulator,
) => {
  if (times.length === 0) {
    setBestConfig(null);
    return;
  }
  const { activityCode } = activity;
  const { eventId } = parseActivityCode(activityCode);
  const timesVec = asVector(simulator.VectorTime, times);
  const configOverride = localConfigFromActivity(simulator, compWcif, activityCode);
  const bestConfig = simulator.optimizeStaff(
    eventId, timesVec, 10, maxStaff, configOverride, selectedModel,
  );
  if (bestConfig.Err !== simulator.ErrorKind.SUCCESS) {
    setError(
      `An error occurred during the simulation: ${simulator.errorMessage(bestConfig.Err)}`,
    );
  } else {
    setBestConfig(bestConfig);
  }
};


const BestConfigSection = ({
  activity,
  compWcif,
  maxStaff,
  maxStations,
  times,
  selectedModel,
  simulator,
}) => {
  const [bestConfig, setBestConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const compute = () => {
    setLoading(true);
    computeBestConfig(
      activity,
      compWcif,
      maxStaff,
      maxStations,
      times,
      selectedModel,
      setBestConfig,
      setError,
      simulator,
    );
    setLoading(false);
  }

  useEffect(() => setBestConfig(null), [
    activity, compWcif, maxStaff, maxStations, times, selectedModel, simulator,
  ]);

  return (
    <>
      {error && (
        <pre>
          {error}
        </pre>
      )}
      {!error && loading && (
        <Icon name="spinner" loading />
      )}
      {!error && !loading && bestConfig && (
        <div>
          <Header as="h5" content="Best configuration found" />
          Time:
          {' '}
          {timeToString(bestConfig.BestResult)}
          <br />
          Judges:
          {' '}
          {bestConfig.Judges}
          <br />
          Scramblers:
          {' '}
          {bestConfig.Scramblers}
          <br />
          Runners:
          {' '}
          {bestConfig.Runners}
        </div>
      )}
      {!error && !loading && !bestConfig && (
        <Button
          circular
          compact
          icon="calculator"
          onClick={compute}
        />
      )}
    </>
  );
};

export default BestConfigSection;
