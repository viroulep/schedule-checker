import React, { useState, useEffect } from 'react';
import { List, Header } from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';
import { parseActivityCode } from '../wca/wcif';
import { timeToString } from '../utils';

const Group = ({
  simulator,
  activity,
  pbMap,
  groupsById,
}) => {
  const [message, setMessage] = useState('No simulation result yet');
  const {
    id, name, activityCode, startTime, endTime,
  } = activity;
  const { eventId } = parseActivityCode(activityCode);
  const group = groupsById[id] || [];
  const secElapsed = Math.floor(
    (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000,
  );

  useEffect(() => {
    let times = (groupsById[id] || []).map((person) => pbMap[person][eventId]);
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

    const timesVec = asVector(simulator.VectorTime, times);
    // We'll just use the default config with no override!
    const localOverride = new simulator.MapStringInt();
    const { Err, Value } = simulator.simuGroup(
      eventId, timesVec, localOverride, 'Runners',
    );
    if (Err !== simulator.ErrorKind.SUCCESS) {
      setMessage(
        `An error occurred during the simulation: ${simulator.errorMessage(Err)}`,
      );
    } else {
      setMessage(`Simulation took ${timeToString(Value)}.`);
    }
  }, [id, eventId, groupsById, simulator, pbMap]);

  return (
    <List.Item>
      <Header as="h4">
        {name}
      </Header>
      <p>
        (
        {group.length}
        {' '}
        competitors)
      </p>
      <p>
        Scheduled for
        {' '}
        {timeToString(secElapsed)}
        .
      </p>
      <p>
        {message}
      </p>
    </List.Item>
  );
};

export default Group;
