import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { signIn } from '../wca/api';

const LoadingError = ({ error }) => (
  <Message negative>
    Something wrong happened when loading the data:
    <pre>
      {error}
    </pre>
    Your authentification token may have expired, you can try to
    {' '}
    <Button primary compact size="tiny" onClick={signIn} content="sign in" />
    {' '}
    again.
    <br />
    If the issue persists, it most likely means the WCA website is unreachable.
    or the WCA website is unreachable.
  </Message>
);

export default LoadingError;
