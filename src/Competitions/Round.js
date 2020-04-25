import React, { useState } from 'react';
import {
  List, Header, Grid, Segment,
} from 'semantic-ui-react';
import { parseActivityCode } from '../wca/wcif';
import Group from './Group';
import EventIcon from '../UtilsComponents/EventIcon';


const Round = ({
  simulator,
  compWcif,
  activity,
  pbMap,
  groupsById,
}) => {
  const { activityCode, name, childActivities } = activity;
  const { eventId } = parseActivityCode(activityCode);
  const [accuracyArray, setAccuracyArray] = useState(
    childActivities.map(() => undefined),
  );
  let color = 'black';
  if (accuracyArray.every((a) => a)) {
    color = 'green';
  } else if (accuracyArray.some((a) => a !== undefined)) {
    color = 'orange';
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
          {childActivities.map((ca, index) => (
            <Group
              index={index}
              key={ca.id}
              activity={ca}
              color={color}
              accuracyArray={accuracyArray}
              setAccuracyArray={setAccuracyArray}
              compWcif={compWcif}
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
