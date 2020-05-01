import React, {
  Fragment, useState, useEffect,
} from 'react';
import {
  Divider, Dropdown, Form, Grid, Header, Checkbox, Segment,
} from 'semantic-ui-react';
import _ from 'lodash';
import { SettingsDescription } from '@viroulep/group-simulator';

import { parseActivityCode } from '../wca/wcif';
import { loadStoredConfig } from '../utils';
import { defaultModel } from '../data/simu';
import ModelPicker from '../Pickers/Model';
import Round from './Round';
import Events from '../data/events';

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

const formatDate = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const getAllActivities = (schedule, roomId, onlySimulated) => {
  // Return all activities for given room
  const room = _.flatMap(
    schedule.venues,
    (venue) => venue.rooms,
  ).find((r) => r.id === roomId);
  if (!room) {
    return [];
  }
  const sortedActivities = _.sortBy(room.activities.filter(
    (a) => !onlySimulated
    || Events.simulatedId.includes(parseActivityCode(a.activityCode).eventId),
  ), ['startTime']);
  return _.groupBy(sortedActivities, (a) => formatDate(new Date(a.startTime)));
};

const settingsToDisplay = [
  'judges', 'scramblers', 'runners', 'extra_rate', 'miscramble_rate',
];

const SettingsInfo = ({
  simulator,
  selectedModel,
  setSelectedModel,
}) => {
  const { mapSetup } = loadStoredConfig(simulator);
  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <Segment color="teal">
      <Header as="h2">
        Settings
      </Header>
      <p>
        You can adjust them in the &quot;settings&quot; section,
        except for the system used that you can select below.
      </p>
      <Form className="mb-2">
        <Grid columns={3}>
          <Grid.Row>
            {settingsToDisplay.map((s) => (
              <Grid.Column key={s}>
                <Form.Field inline>
                  <label>{SettingsDescription.setup[s].text}</label>
                  :
                  {' '}
                  {mapSetup[s]}
                </Form.Field>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </Form>
      <div>
        I want to use the
        {' '}
        <ModelPicker model={selectedModel} setModel={setSelectedModel} inline />
        {' '}
        system.
      </div>
    </Segment>
  );
};

const Competition = ({
  simulator,
  compWcif,
}) => {
  const { schedule } = compWcif;
  const [pbMap, setPbMap] = useState({});
  const [groupsById, setGroups] = useState({});
  const [onlySimulated, setOnlySimulated] = useState(true);
  const [selectedModel, setSelectedModel] = useState(defaultModel);

  const allRoomsOptions = _.flatMap(
    schedule.venues,
    (venue) => venue.rooms.map((r) => ({
      key: r.id,
      value: r.id,
      text: `${r.name} in ${venue.name}`,
    })),
  )

  // Selected room
  const [room, setRoom] = useState(null);
  const handleChangeRoom = (e, { value }) => setRoom(value);

  const allActivities = getAllActivities(schedule, room, onlySimulated);

  useEffect(() => {
    buildIndex(compWcif, setPbMap, setGroups)
    const defaultVenue = compWcif.schedule.venues[0];
    if (defaultVenue) {
      const defaultRoom = defaultVenue.rooms[0];
      if (defaultRoom) {
        setRoom(defaultRoom.id);
      }
    }
  }, [compWcif]);

  return (
    <>
      <Grid
        columns={2}
        stackable
      >
        <Grid.Column>
          <Dropdown
            onChange={handleChangeRoom}
            options={allRoomsOptions}
            value={room}
            selection
            className="mb-2"
          />
          <p>
            You can review the schedule for that room below.
          </p>
        </Grid.Column>
        <Grid.Column>
          <Checkbox
            toggle
            label="Show only event that can be simulated"
            checked={onlySimulated}
            onChange={() => setOnlySimulated(!onlySimulated)}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <SettingsInfo
            simulator={simulator}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </Grid.Column>
      </Grid>
      {_.map(allActivities, (v, k) => (
        <Fragment key={k}>
          <Divider horizontal>
            <Header as="h2">
              {new Date(k).toDateString()}
            </Header>
          </Divider>
          <Grid columns={3} stackable>
            {v.map((activity) => (
              <Round
                key={activity.id}
                activity={activity}
                compWcif={compWcif}
                pbMap={pbMap}
                groupsById={groupsById}
                simulator={simulator}
                selectedModel={selectedModel}
              />
            ))}
          </Grid>
        </Fragment>
      ))}
    </>
  )
};

export default Competition;
