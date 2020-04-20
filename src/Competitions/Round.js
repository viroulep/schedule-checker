import React, { useState } from 'react';
import {
  List, Header, Grid, Segment,
} from 'semantic-ui-react';
import { parseActivityCode } from '../wca/wcif';
import Group from './Group';
import EventIcon from '../UtilsComponents/EventIcon';


const Round = ({
  simulator,
  comp,
  activity,
  pbMap,
  groupsById,
}) => {
  const { activityCode, name, childActivities } = activity;
  const { eventId } = parseActivityCode(activityCode);
  const [inaccurate, setInaccurate] = useState(undefined);
  let color = 'black';
  if (inaccurate !== undefined) {
    color = inaccurate ? 'orange' : 'green';
  }

  return (
    <Grid.Column key={activity.id}>
      <Segment color={color}>
        <Header as="h3">
          {eventId && (
            <EventIcon id={eventId} />
          )}
          <Header.Content>
            {name}
          </Header.Content>
        </Header>
        <List relaxed>
          {childActivities.map((ca) => (
            <Group
              key={ca.id}
              activity={ca}
              color={color}
              inaccurate={inaccurate}
              setInaccurate={setInaccurate}
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
