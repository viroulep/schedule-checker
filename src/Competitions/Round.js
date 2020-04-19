import React from 'react';
import {
  List, Header, Grid, Segment,
} from 'semantic-ui-react';
import Group from './Group';
import { parseActivityCode } from '../wca/wcif';
import events from '../data/events';


const Round = ({
  simulator,
  comp,
  activity,
  pbMap,
  groupsById,
}) => {
  const { activityCode, name, childActivities } = activity;
  const { eventId } = parseActivityCode(activityCode);

  return (
    <Grid.Column key={activity.id}>
      <Segment color={events.simulatedId.includes(eventId) ? 'green' : 'red'}>
        <Header as="h3">{name}</Header>
        <List divided relaxed>
          {childActivities.map((ca) => (
            <Group
              key={ca.id}
              activity={ca}
              comp={comp}
              pbMap={pbMap}
              groupsById={groupsById}
              simulator={simulator}
            />
          ))}
        </List>
      </Segment>
    </Grid.Column>
  );
};

export default Round;
