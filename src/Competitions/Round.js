import React from 'react';
import {
  List, Header, Grid, Segment,
} from 'semantic-ui-react';
import Group from './Group';


const Round = ({
  simulator,
  comp,
  activity,
  pbMap,
  groupsById,
}) => {
  const { name, childActivities } = activity;
  return (
    <Grid.Column key={activity.id}>
      <Segment color="black">
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
