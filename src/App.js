import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Header, Message, Icon } from 'semantic-ui-react';
import Navigation from './Navigation/Navigation';

const LoadingWasm = () => (
  <Message icon info>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      We are fetching that content for you.
    </Message.Content>
  </Message>
);

function App() {
  const [simulator, setSimulator] = useState(undefined);
  if (!simulator)
    setTimeout(() => setSimulator(true), 3000);

  return (
    <Container>
      {simulator ? (
        <>
          <Navigation />
          <Header>
            Coucou
          </Header>
        </>
      ) : (
        <LoadingWasm />
      )}
    </Container>
  );
}

export default App;
