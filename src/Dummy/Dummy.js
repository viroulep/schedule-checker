import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import ModalGenRandom from '../GroupGeneration/ModalGenRandom';
import EventPicker from '../Pickers/Event';
import ModelPicker from '../Pickers/Model';
import { timeToString } from '../utils';
import { defaultModel, defaultEvent } from '../data/simu';


const Dummy = () => {
  const [times, setTimes] = useState([]);
  const [event, setEvent] = useState(defaultEvent);
  const [model, setModel] = useState(defaultModel);
  const OpenButton = ({ onClick }) => (
    <Button
      color='violet'
      content='Set group times'
      onClick={onClick}
    />
  );
  return (
    <>
      <div>
        dummy page, times: [
        {times.join(',')}
        ]
        time: {timeToString(3689)}, or: {timeToString(587)}.
      </div>
      <EventPicker event={event} setEvent={setEvent} />
      <ModelPicker model={model} setModel={setModel} />
      <ModalGenRandom
        times={times}
        setTimes={setTimes}
        OpenButton={OpenButton}
      />
    </>
  );
};

export default Dummy;
