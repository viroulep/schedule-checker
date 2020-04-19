import React, { useCallback, useState, useEffect } from 'react';
import {
  Grid, Header, Segment,
} from 'semantic-ui-react';
import _ from 'lodash';

import { getCompetitionWcif } from '../wca/api';
import { usePersistence } from '../wca/persistence';
import SyncIcon from './SyncIcon';
import LoadingError from '../UtilsComponents/LoadingError';
import LoadingPlaceholder from '../UtilsComponents/LoadingPlaceholder';
import Round from './Round';

const buildIndex = (wcif, setPbMap, setGroupMap) => {
  const pbMap = {
  };
  const groupsById = {
  };

  wcif.persons.forEach((p) => {
    if (!p.registrantId) {
      return;
    }
    const pbs = {};
    p.personalBests.forEach((pb) => { pbs[pb.eventId] = Math.floor(pb.best / 100); });
    pbMap[p.registrantId] = pbs;
    p.assignments.forEach((a) => {
      if (a.assignmentCode === 'competitor') {
        if (!groupsById[a.activityId]) {
          groupsById[a.activityId] = [];
        }
        groupsById[a.activityId].push(p.registrantId);
      }
    });
  });

  setPbMap(pbMap);
  setGroupMap(groupsById);
};

const getAllActivities = (schedule) => {
  // Return all activities for first venue/first room
  // TODO: extend to take for a given room
  const venue = schedule.venues[0];
  if (!venue) {
    return [];
  }
  const room = venue.rooms[0];
  if (!room) {
    return [];
  }
  return _.sortBy(room.activities, ['startTime']);
};

const CompetitionInfo = ({
  simulator,
  comp,
}) => {
  const { schedule } = comp;
  const allActivities = getAllActivities(schedule);
  const [pbMap, setPbMap] = useState({});
  const [groupsById, setGroups] = useState({});
  useEffect(() => buildIndex(comp, setPbMap, setGroups), [comp]);

  return (
    <>
      <p>
        See the activities below, if any. Green means that it can be simulated,
        Red means it cannot.
      </p>
      <Grid columns={3} stackable>
        {allActivities.map((activity) => (
          <Round
            key={activity.id}
            activity={activity}
            comp={comp}
            pbMap={pbMap}
            groupsById={groupsById}
            simulator={simulator}
          />
        ))}
      </Grid>
    </>
  )
};

const Competition = ({
  competitionId,
  simulator,
}) => {
  const fetchData = useCallback(
    () => getCompetitionWcif(competitionId),
    [competitionId],
  );
  const {
    loadedData, loading, error, sync,
  } = usePersistence(
    `competitions.${competitionId}`,
    fetchData,
  );
  const { data, lastFetched } = loadedData;
  return (
    <>
      <Header as="h1" className="my-comps">
        {data ? (
          data.name
        ) : (
          competitionId
        )}
        <SyncIcon
          loading={loading}
          sync={sync}
          lastFetched={lastFetched}
        />
      </Header>
      {error && (
        <LoadingError error={error} />
      )}
      {loading && (
        <Segment>
          <LoadingPlaceholder />
        </Segment>
      )}
      {!loading && data && (
        <CompetitionInfo comp={data} simulator={simulator} />
      )}
    </>
  );
};

export default Competition;
