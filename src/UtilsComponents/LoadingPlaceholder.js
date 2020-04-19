import React from 'react';
import { Dimmer, Placeholder, Loader } from 'semantic-ui-react';

const LoadingPlaceholder = () => (
  <>
    <Dimmer active inverted>
      <Loader active inverted />
    </Dimmer>
    <Placeholder>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder>
  </>
);

export default LoadingPlaceholder;
