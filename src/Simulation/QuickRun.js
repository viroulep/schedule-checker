import React, { useState } from 'react';
import {
  Button, Header, Segment,
} from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';
import ModalGenRandom from '../GroupGeneration/ModalGenRandom';
import EventPicker from '../Pickers/Event';
import ModelPicker from '../Pickers/Model';
import { timeToString } from '../utils';
import { defaultModel, defaultEvent } from '../data/simu';
import './QuickRun.scss';

// Poor man's database
let savedTimes = [];

const TimesDetail = ({
  times,
  setTimes,
}) => {
  const [open, setOpen] = useState(false);
  const OpenButton = ({ onClick }) => (
    <Button
      color="violet"
      content="Set group times"
      onClick={onClick}
      compact
    />
  );

  return (
    <div className="times-details">
      <ModalGenRandom
        times={times}
        setTimes={setTimes}
        OpenButton={OpenButton}
      />
      <Button onClick={() => setOpen(!open)} compact>
        {open ? (
          <>Hide details.</>
        ) : (
          <>Show average times.</>
        )}
      </Button>
      {open && (
        <Segment>
          <code>
            {times.join(', ')}
          </code>
        </Segment>
      )}
    </div>
  );
};


const QuickRunPage = ({
  simulator,
}) => {
  const [times, setTimes] = useState(savedTimes);
  const setPersistedTimes = (array) => {
    savedTimes = array;
    setTimes(array);
  };
  const [event, setEvent] = useState(defaultEvent);
  const [model, setModel] = useState(defaultModel);
  const [message, setMessage] = useState('');

  const runSimulation = () => {
    const timesVec = asVector(simulator.VectorTime, times);
    const { Err, Value } = simulator.simuGroup(event, timesVec, model);
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
      <div>
        There are currently
        {' '}
        {times.length}
        {' '}
        competitors in the group.
        <TimesDetail times={times} setTimes={setPersistedTimes} />
      </div>
      <div>
        I want to simulate this group for
        {' '}
        <EventPicker event={event} setEvent={setEvent} inline />
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

export default QuickRunPage;
