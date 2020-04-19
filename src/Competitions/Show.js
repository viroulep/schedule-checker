import React, { useCallback } from 'react';
import {
  Grid, Header, Segment,
} from 'semantic-ui-react';
import _ from 'lodash';

import { getCompetitionWcif } from '../wca/api';
import { usePersistence } from '../wca/persistence';
import SyncIcon from './SyncIcon';
import LoadingError from '../UtilsComponents/LoadingError';
import LoadingPlaceholder from '../UtilsComponents/LoadingPlaceholder';
import { parseActivityCode, activityCodeToName } from '../wca/wcif';
import events from '../data/events';

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
  comp,
}) => {
  const { schedule } = comp;
  const allActivities = getAllActivities(schedule);
  console.log(allActivities);
  return (
    <>
      <p>See the activities below, if any.</p>
      <Grid columns={3} stackable>
        {allActivities.map((activity) => {
          const { activityCode, name } = activity;
          const { eventId } = parseActivityCode(activityCode);
          const simulated = events.simulatedId.includes(eventId);
          const color = simulated ? 'green' : 'red';
          return (
            <Grid.Column key={activity.id}>
              <Segment color={color}>
                {eventId ? (
                  activityCodeToName(activityCode)
                ) : (
                  name
                )}
              </Segment>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  )
};

const Competition = ({
  competitionId,
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
  console.log(data);
  return (
    <>
      <Header className="my-comps">
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
        <CompetitionInfo comp={data} />
      )}
    </>
  );
};

export default Competition;
