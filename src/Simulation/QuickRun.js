import React, { useState } from 'react';
import {
  Header,
} from 'semantic-ui-react';
import TimesDetail from './TimesDetail';
import QuickOpt from './QuickOpt';
import QuickSimu from './QuickSimu';
import './QuickRun.scss';

// Poor man's database
let savedTimes = [];

const QuickRunPage = ({
  simulator,
}) => {
  const [times, setTimes] = useState(savedTimes);
  const setPersistedTimes = (array) => {
    savedTimes = array;
    setTimes(array);
  };

  return (
    <>
      <Header>
        Group setup
      </Header>
      <div>
        There are currently
        {' '}
        {times.length}
        {' '}
        competitors in the group.
        <TimesDetail times={times} setTimes={setPersistedTimes} />
      </div>
      <QuickSimu simulator={simulator} times={times} />
      <QuickOpt simulator={simulator} times={times} />
    </>
  );
};

export default QuickRunPage;
