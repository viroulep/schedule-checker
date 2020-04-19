import React from 'react';
import { Message } from 'semantic-ui-react';

const LoadingError = ({ error }) => (
  <Message negative>
    Something wrong happened when loading the data:
    <pre>
      {error}
    </pre>
    Your authentification token may have expired, you may try to sign out then
    back in, or to use the &quot;Clear locally stored data&quot; option in the menu.
    <br />
    If the issue persists, it most likely means the WCA website is unreachable.
    or the WCA website is unreachable.
  </Message>
);

export default LoadingError;
