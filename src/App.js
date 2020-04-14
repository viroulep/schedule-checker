import React, { useState, useEffect } from 'react';
import { Button, Container, Message, Icon } from 'semantic-ui-react';
import { getSimu } from '@viroulep/group-simulator';

import './App.css';
import Navigation from './Navigation/Navigation';
import Settings from './Settings/Settings';


const LoadingMessage = () => (
  <>
    <Message.Header>Loading required content</Message.Header>
    Please wait while the page is loading a required module.
  </>
);

const FailureMessage = () => (
  <>
    <p>
      The loading of the module timed out.
      It's likely that there was an error and that your browser does not support WebAssembly.
    </p>

    <p>
      This module is necessary for this application, it is pointless to show you anything more than this error message at this point.
      <br />
      Feel free to check this website to make sure your browser is supported.
    </p>
    <Button
      href="https://caniuse.com/#feat=wasm"
      target="_blank"
      secondary
    >
      Check browser compatibility
    </Button>
  </>
);

// Use dismissable with wasm: info loading, green loaded, red timeout!
const LoadingWasm = ({
  simulator,
  loading,
}) => (
  <>
    {!simulator && (
      <Message
        icon
        color={loading ? 'teal' : 'red'}
      >
        {loading && (
          <Icon name='circle notched' loading />
        )}
        <Message.Content>
          {loading ? (
            <LoadingMessage />
          ) : (
            <FailureMessage />
          )}
        </Message.Content>
      </Message>
    )}
  </>
);

function App() {
  const [simulator, setSimulator] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const loadWasm = async () => {
    const wasm = getSimu(() => { setSimulator(wasm); setLoading(false) });
  };

  // Pass '[]' as a dependency, so that it's ran just once.
  useEffect(() => {
    loadWasm();
    // Register a timeout on the loading process
    setTimeout(() => setLoading(false), 3000);
  }, []);

  /*const doSomething = () => {
    const times = new simulator.VectorTime();
    console.log(times);
    for (let i = 0; i < 12; i++) {
      // people do 12s average
      times.push_back(12);
    }
    console.log(simulator.getSetupProps());
    const { Err, Value } = simulator.simuGroup("333", times, simulator.DEFAULT_MODEL);
    console.log(simulator);
    if (Err !== simulator.ErrorKind.SUCCESS) {
      console.log(simulator.errorMessage(Err));
    } else {
      console.log("Result of the simulation:");
      const minutes = Math.floor(Value / 60);
      const seconds = Value - minutes * 60;
      console.log(`It lasted ${minutes} minutes and ${seconds} seconds.`);
    }
  }*/

  return (
    <Container>
      <LoadingWasm simulator={simulator} loading={loading} />
      {simulator && (
        <>
          <Navigation />
          <Settings simulator={simulator} />
        </>
      )}
    </Container>
  );
}

export default App;
