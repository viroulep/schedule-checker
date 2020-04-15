import React, { useState } from 'react';
import {
  Button, Header, Input,
} from 'semantic-ui-react';
import { asVector } from '@viroulep/group-simulator';
import EventPicker from '../Pickers/Event';
import ModelPicker from '../Pickers/Model';
import { timeToString, setInt } from '../utils';
import { defaultModel, defaultEvent } from '../data/simu';

const QuickOpt = ({
  simulator,
  times,
}) => {
  const [event, setEvent] = useState(defaultEvent);
  const [model, setModel] = useState(defaultModel);
  const [message, setMessage] = useState('');
  const [maxStations, setMaxStations] = useState(10);
  const [maxStaff, setMaxStaff] = useState(14);

  const runSimulation = () => {
    const timesVec = asVector(simulator.VectorTime, times);
    // We'll just use the default config with no override!
    const localOverride = new simulator.MapStringInt();
    const {
      Err, BestResult, Judges, Runners, Scramblers,
    } = simulator.optimizeStaff(
      event, timesVec, maxStations, maxStaff, localOverride, model,
    );
    if (Err !== simulator.ErrorKind.SUCCESS) {
      setMessage(
        `An error occurred during the simulation: ${simulator.errorMessage(Err)}`,
      );
    } else {
      const strResult = `The best group took ${timeToString(BestResult)},`;
      const strStaff = `using ${Judges} judges, ${Scramblers} scramblers, and ${Runners} runners. `;
      setMessage(`${strResult} ${strStaff}`);
    }
  };

  return (
    <>
      <Header>
        Quick staff optimizer
      </Header>
      <div className="opt-content">
        <div className="inputs">
          <Input
            min={3}
            type="number"
            label="Total staff"
            value={maxStaff}
            onChange={(e) => setInt(e, setMaxStaff, maxStaff)}
          />
          <Input
            min={1}
            type="number"
            label="Stations"
            value={maxStations}
            onChange={(e) => setInt(e, setMaxStations, maxStations)}
          />
        </div>
        <p>
          Given I have
          {' '}
          {maxStaff}
          {' '}
          staff and at most
          {' '}
          {maxStations}
          {' '}
          stations available, I want to get the shortest time for this group.
        </p>
        <div>
          This group is for
          {' '}
          <EventPicker event={event} setEvent={setEvent} inline upward={false} />
          {' '}
          and my staff will be using the
          {' '}
          <ModelPicker model={model} setModel={setModel} inline />
          {' '}
          system throughout the group.
        </div>
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

export default QuickOpt;
