import React, { useState, useEffect } from 'react';
import {
  Button, Divider, List, Header,
} from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';

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
  simulator,
  activity,
  pbMap,
  groupsById,
  inaccurate,
  setInaccurate,
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
    const localOverride = new simulator.MapStringInt();
    const { Err, Value } = simulator.simuGroup(
      eventId, timesVec, localOverride, 'Runners',
    );
    if (Err !== simulator.ErrorKind.SUCCESS) {
      setError(
        `An error occurred during the simulation: ${simulator.errorMessage(Err)}`,
      );
    } else {
      setSimulated(Value);
    }
  }, [times, simulator, activity]);

  useEffect(() => {
    if (simulated === undefined) {
      return;
    }
    const { startTime, endTime } = activity;
    const estimate = secondsForRange(startTime, endTime);
    const accuracy = Math.abs(Math.round(((simulated - estimate) / estimate) * 100));
    setInaccurate(inaccurate || accuracy >= 10);
  }, [inaccurate, setInaccurate, simulated, activity]);

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
