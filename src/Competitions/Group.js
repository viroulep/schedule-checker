import React, { useState, useEffect } from 'react';
import {
  Button, Divider, List, Header,
} from 'semantic-ui-react';
import { asVector, asMap } from '@viroulep/group-simulator';
import _ from 'lodash';

import { parseActivityCode, getRoundData } from '../wca/wcif';
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

const populateGroupWithTimes = (
  activity, setTimes, compWcif, groupsById, pbMap,
) => {
  // This try to infer the group population
  const { id, activityCode } = activity;
  const { eventId, roundNumber, groupNumber } = parseActivityCode(activityCode);
  // We are already done if any of the following is true:
  //   - we don't have a real event (eg: registration)
  //   - our indexes are not build yet (we need them!)
  //   - we don't have a round number
  if (!eventId
    || _.isEmpty(groupsById)
    || _.isEmpty(pbMap)
    || !roundNumber) {
    return;
  }

  // Easy case, it's first round, so we just get the group from the index!
  if (roundNumber === 1) {
    setTimes(competitorsToTimes(groupsById[id] || [], pbMap, eventId));
    return
  }

  // Else we're at a subsequent round, we need to get data from previous round
  // and from first round.
  const previousRoundData = getRoundData(
    compWcif.events, `${eventId}-r${roundNumber - 1}`,
  );

  // We're not guaranteed to run on a wellformed competition, we have to check
  // the advancementCondition has been set.
  const { advancementCondition } = previousRoundData;
  if (!advancementCondition) {
    return;
  }

  // Level holds the number of competitors that should be in *this* round.
  const { type, level } = advancementCondition;
  if (!type || !['ranking', 'percent'].includes(type)) {
    return;
  }

  const currentRoundCode = `${eventId}-r${roundNumber}`;
  let totalGroups = 0;
  const groupsForFirstRound = [];
  // Crawl the schedule for additional data
  compWcif.schedule.venues.forEach((v) => {
    v.rooms.forEach((r) => {
      r.activities.forEach((a) => {
        if (a.activityCode.startsWith(currentRoundCode)) {
          totalGroups += a.childActivities.length;
        } else if (a.activityCode.startsWith(`${eventId}-r1`)) {
          groupsForFirstRound.push(...a.childActivities.map((ca) => ca.id));
        }
      });
    });
  });

  // Map the group ids to an actual list of times!
  // Sort them using lodash sort, because javascript array sorting has this
  // dumb behavior of casting integer to string if the compareFunction is not
  // provided.
  const timesForFirstRound = _.sortBy(_.flatMap(
    groupsForFirstRound,
    (groupId) => competitorsToTimes(groupsById[groupId], pbMap, eventId),
  ));

  // Ranking is straightforward, otherwise compute the appropriate percentage.
  const totalQualified = type === 'ranking'
    ? level
    : Math.floor((timesForFirstRound.length * level) / 100);

  // totalGroups is not 0 because there is always us!
  const baseGroupSize = Math.floor(totalQualified / totalGroups);

  // This handles cases where the number of groups doesn't divide the number
  // of qualified competitors.
  const groupSize = groupNumber === totalGroups
    ? (totalQualified - (totalGroups - 1) * baseGroupSize)
    : baseGroupSize;
  const baseIndex = (groupNumber - 1) * baseGroupSize;
  // 'end' is excluded with slice, so we need to add 1
  const endIndex = baseIndex + groupSize + 1;
  const groupTimes = timesForFirstRound.slice(baseIndex, endIndex);
  setTimes(groupTimes);
};

const updateAccuracyArray = (
  index, accuracyArray, setAccuracyArray, simulated, activity,
) => {
  if (simulated === undefined) {
    return;
  }
  const { startTime, endTime } = activity;
  const estimate = secondsForRange(startTime, endTime);
  const absoluteDiff = Math.abs(simulated - estimate);
  const relativeDiff = Math.round((absoluteDiff / estimate) * 100);
  const newAcc = [
    ...accuracyArray,
  ];

  // Consider we're accurate if we're within 10% of the estimated time, or
  // if within 2 minutes.
  newAcc[index] = (relativeDiff < 10 || absoluteDiff < 120);
  if (!_.isEqual(accuracyArray, newAcc)) {
    setAccuracyArray(newAcc);
  }
};

const computeSimulatedTime = (
  times, simulator, activity, compWcif, setSimulated, setError,
) => {
  if (times.length === 0) {
    setSimulated(undefined);
    return;
  }
  const { activityCode } = activity;
  const { eventId } = parseActivityCode(activityCode);
  const timesVec = asVector(simulator.VectorTime, times);
  // We'll just use the default config with no override!
  const { cutoff, timeLimit } = getRoundData(compWcif.events, activityCode);
  const configOverride = {};
  if (timeLimit) {
    // NOTE: cumulative time limit across events are not supported
    // (and not planed to be).
    const { centiseconds } = timeLimit;
    configOverride.time_limit = Math.floor(centiseconds / 100);
  }
  if (cutoff) {
    // Because we only simulate timed event, we can safely assume the attemptResult
    // is a value representing centiseconds!
    const { attemptResult } = cutoff;
    configOverride.cutoff = Math.floor(attemptResult / 100);
  }

  // FIXME: parametrize that 'Runners' param!
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
};


const Group = ({
  index,
  simulator,
  activity,
  pbMap,
  groupsById,
  accuracyArray,
  setAccuracyArray,
  compWcif,
}) => {
  const [error, setError] = useState(undefined);
  const [simulated, setSimulated] = useState(undefined);
  const [times, setTimes] = useState([]);
  const {
    name, startTime, endTime,
  } = activity;

  useEffect(() => {
    computeSimulatedTime(
      times, simulator, activity, compWcif, setSimulated, setError,
    );
  }, [times, simulator, activity, compWcif, setSimulated, setError]);

  useEffect(() => {
    updateAccuracyArray(
      index, accuracyArray, setAccuracyArray, simulated, activity,
    );
  }, [index, accuracyArray, setAccuracyArray, simulated, activity]);

  useEffect(() => {
    if (times.length === 0) {
      populateGroupWithTimes(
        activity, setTimes, compWcif, groupsById, pbMap,
      );
    }
  }, [times.length, activity, setTimes, compWcif, groupsById, pbMap]);

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
