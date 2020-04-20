import React, { useState, useEffect } from 'react';
import {
  Button, Container, Message, Icon,
} from 'semantic-ui-react';
import { getSimu } from '@viroulep/group-simulator';
import { Router } from '@reach/router';

import './App.scss';
import Navigation from './Navigation/Navigation';
import Settings from './Settings/Settings';
import QuickRunPage from './Simulation/QuickRun';
import { loadStoredConfig } from './utils';
import {
  setOauthToken,
  loginUser,
  setRemoteIfNeeded,
} from './wca/api';
import { isStaging } from './wca/routes';
import CompetitionsList from './Competitions/IndexList';
import Competition from './Competitions/Show';

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
      It&pos;s likely that there was an error and that your browser does not support WebAssembly.
    </p>

    <p>
      This module is necessary for this application, it is pointless to show
      you anything more than this error message at this point.
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
          <Icon name="circle notched" loading />
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

const Home = () => (
  <div>
    This page is a work in progress and most likely won&apos;t do what you expect.
    <br />
    You should not use it.
    <br />
    Come back later.
  </div>
);

const NotFound = () => <p>Oups, it&apos;s a 404</p>;

const getOauthTokenIfAny = () => {
  const hash = window.location.hash.replace(/^#/, '');
  const hashParams = new URLSearchParams(hash);
  if (hashParams.has('access_token')) {
    window.location.hash = '';
    setOauthToken(hashParams.get('access_token'));
  }
};

const Competitions = ({ children }) => <>{children}</>;

function App() {
  const [simulator, setSimulator] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loadWasm = async () => {
    const wasm = getSimu(() => { setSimulator(wasm); setLoading(false) });
  };

  // Pass '[]' as a dependency, so that it's ran just once.
  useEffect(() => {
    loadWasm();
    setRemoteIfNeeded();
    getOauthTokenIfAny();
    loginUser(setCurrentUser, setUserLoading);
    // Register a timeout on the loading process
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => { loadStoredConfig(simulator); }, [simulator]);

  return (
    <Container>
      <LoadingWasm simulator={simulator} loading={loading} />
      {simulator && (
        <>
          <Navigation
            user={currentUser}
            userLoading={userLoading}
          />
          {isStaging() && (
            <Message size="small">
              You&apos;re not currently using the WCA&apos;s production data.
            </Message>
          )}
          <Router basepath={process.env.PUBLIC_URL}>
            <Home path="/" />
            <Settings simulator={simulator} path="settings/*" />
            <QuickRunPage simulator={simulator} path="/quick-simu" />
            {currentUser && (
              <Competitions path="competitions">
                <CompetitionsList path="/" />
                <Competition path=":competitionId" simulator={simulator} />
              </Competitions>
            )}
            <NotFound default />
          </Router>
        </>
      )}
    </Container>
  );
}

export default App;
