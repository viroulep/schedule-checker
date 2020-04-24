import React, { useState, useEffect } from 'react';
import {
  Button, Divider, List, Header,
} from 'semantic-ui-react';
import { asVector, asMap } from '@viroulep/group-simulator';
import _ from 'lodash';

import { parseActivityCode } from '../wca/wcif';
import { timeToString } from '../utils';
import GroupGenerator from '../GroupGeneration/ModalGenRandom';


const competitorsToTimes = (competitors, pbMap, eventId) => {
  let times = competitors.map((person) => pbMap[person][eventId]);
  let noPb = 0;
  times = times.filter((t) => {
    if (t === undefined) {
      noPb += 1;
    }
    return t !== undefined;
  });
  const worst = times[times.length - 1];
  if (worst) {
    for (let i = 0; i < noPb; i += 1) {
      times.push(worst);
    }
  }
  return times;
};

const secondsForRange = (startTime, endTime) => Math.floor(
  (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000,
);

const openGroupButton = (size) => ({ onClick }) => (
  <Button
    size="tiny"
    compact
    content={`Manage times (${size})`}
    className="mb-2"
    onClick={onClick}
  />
);


const Group = ({
  index,
  simulator,
  activity,
  pbMap,
  groupsById,
  accuracyArray,
  setAccuracyArray,
  roundWcif,
}) => {
  const [error, setError] = useState(undefined);
  const [simulated, setSimulated] = useState(undefined);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (times.length === 0) {
      return;
    }
    const { activityCode } = activity;
    const { eventId } = parseActivityCode(activityCode);
    const timesVec = asVector(simulator.VectorTime, times);
    // We'll just use the default config with no override!
    const { cutoff, timeLimit } = roundWcif;
    const configOverride = {};
    if (timeLimit) {
      // NOTE: cumulative time limit across events are not supported
      // (and not planed to be).
      const { centiseconds } = timeLimit;
      configOverride.time_limit = Math.floor(centiseconds / 100);
    }
    if (cutoff) {
      // Because we only simulate timed event
      const { attemptResult } = cutoff;
      configOverride.cutoff = Math.floor(attemptResult / 100);
    }

    const { Err, Value } = simulator.simuGroup(
      eventId, timesVec, asMap(simulator.MapStringInt, configOverride), 'Runners',
    );

    if (Err !== simulator.ErrorKind.SUCCESS) {
      setError(
        `An error occurred during the simulation: ${simulator.errorMessage(Err)}`,
      );
    } else {
      setSimulated(Value);
    }
  }, [times, simulator, activity, roundWcif]);

  useEffect(() => {
    if (simulated === undefined) {
      return;
    }
    const { startTime, endTime } = activity;
    const estimate = secondsForRange(startTime, endTime);
    const diff = Math.abs(Math.round(((simulated - estimate) / estimate) * 100));
    const newAcc = [
      ...accuracyArray,
    ];
    newAcc[index] = diff < 10;
    if (!_.isEqual(accuracyArray, newAcc)) {
      setAccuracyArray(newAcc);
    }
  }, [index, accuracyArray, setAccuracyArray, simulated, activity]);

  const {
    id, name, activityCode, startTime, endTime,
  } = activity;
  const { eventId } = parseActivityCode(activityCode);

  useEffect(() => {
    setTimes(competitorsToTimes(groupsById[id] || [], pbMap, eventId));
  }, [groupsById, id, pbMap, eventId]);

  return (
    <List.Item>
      <Divider horizontal>
        <Header as="h4">
          {name}
        </Header>
      </Divider>
      <p>
        Scheduled for
        {' '}
        {timeToString(secondsForRange(startTime, endTime))}
        .
      </p>
      <Header as="h5" content="Simulation" className="mb-2" />
      <GroupGenerator
        times={times}
        setTimes={setTimes}
        OpenButton={openGroupButton(times.length)}
        headerContent={`Times for ${name}`}
      />
      <p>
        {error && (
          <>{error}</>
        )}
        {!error && simulated && (
          <>
            Simulation took
            {timeToString(simulated)}
            .
          </>
        )}
        {!error && !simulated && (
          <>No simulation result yet</>
        )}
      </p>
    </List.Item>
  );
};

export default Group;
