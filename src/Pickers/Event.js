import React from 'react';

import GenericPicker from './Generic';
import events from '../data/events';

const eventsForSimu = events.forSimulation.map((e) => ({
  text: e.name,
  key: e.id,
  value: e.id,
}));

/* eslint-disable react/jsx-props-no-spreading */
const EventPicker = ({
  event,
  setEvent,
  ...props
}) => (
  <GenericPicker
    {...props}
    val={event}
    setVal={setEvent}
    options={eventsForSimu}
  />
);

export default EventPicker;
