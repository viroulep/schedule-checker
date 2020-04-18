import React, { useState } from 'react';
import {
  Button, Header, Message,
} from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';
import EventPicker from '../Pickers/Event';
import ModelPicker from '../Pickers/Model';
import { timeToString } from '../utils';
import { defaultModel, defaultEvent } from '../data/simu';

const QuickSimu = ({
  simulator,
  times,
}) => {
  const [event, setEvent] = useState(defaultEvent);
  const [model, setModel] = useState(defaultModel);
  const [message, setMessage] = useState('');

  const runSimulation = () => {
    const timesVec = asVector(simulator.VectorTime, times);
    // We'll just use the default config with no override!
    const localOverride = new simulator.MapStringInt();
    const { Err, Value } = simulator.simuGroup(event, timesVec, localOverride, model);
    if (Err !== simulator.ErrorKind.SUCCESS) {
      setMessage(
        `An error occurred during the simulation: ${simulator.errorMessage(Err)}`,
      );
    } else {
      setMessage(`The group took ${timeToString(Value)}.`);
    }
  };

  return (
    <>
      <Header>
        Quick group simulation
      </Header>
      <Message
        compact
        color="brown"
      >
        You can adjust the number of judges/scramblers/runners in the settings.
      </Message>
      <div>
        I want to simulate this group for
        {' '}
        <EventPicker event={event} setEvent={setEvent} inline scrolling />
        {' '}
        and my staff will be using the
        {' '}
        <ModelPicker model={model} setModel={setModel} inline />
        {' '}
        system throughout the group.
      </div>
      <Button
        primary
        className="run-simu"
        content="Run it!"
        onClick={runSimulation}
      />
      <p>
        {message}
      </p>
    </>
  );
};

export default QuickSimu;
