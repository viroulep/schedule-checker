import React, { useState } from 'react';
import {
  Button, Segment,
} from 'semantic-ui-react';
import ModalGenRandom from '../GroupGeneration/ModalGenRandom';

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

export default TimesDetail;
