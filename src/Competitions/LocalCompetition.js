import React, { useState, useRef } from 'react';
import { Header, Button, Icon } from 'semantic-ui-react';
import ls from 'local-storage';

import LoadingError from '../UtilsComponents/LoadingError';
import Competition from './Competition';
import './LocalCompetition.scss';

const loadWcif = (event, fileInput, setWcif, setError) => {
  setError(null);
  setWcif(null);
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const wcif = JSON.parse(e.target.result);
      setWcif(wcif);
      ls('local-wcif', wcif);
    } catch (error) {
      setError(error.message);
    }
    // Clear the input so that we can re-upload the same file!
    /* eslint-disable no-param-reassign */
    fileInput.current.value = ''
  };
  reader.onerror = (e) => setError(`Couldn't load the JSON file (${e})`);
  reader.readAsText(event.target.files[0]);
};

const LocalCompetition = ({
  simulator,
}) => {
  const [error, setError] = useState(null);
  const [wcif, setWcif] = useState(ls('local-wcif'));
  const fileInput = useRef(null);
  return (
    <>
      <input
        type="file"
        ref={fileInput}
        accept=".json"
        style={{ display: 'none' }}
        onChange={(ev) => loadWcif(ev, fileInput, setWcif, setError)}
      />
      <Header as="h1">
        Check schedule from WCIF
        <span className="mr-2" />
        <Button
          icon
          className="upload-wcif"
          compact
          size="tiny"
          labelPosition="right"
          onClick={() => fileInput.current.click()}
        >
          <Icon name="upload" />
          Upload WCIF
        </Button>
      </Header>
      {error && (
        <LoadingError error={error} />
      )}
      {wcif && (
        <>
          <Header as="h2">
            {wcif.name}
          </Header>
          <Competition simulator={simulator} compWcif={wcif} />
        </>
      )}
    </>
  );
};

export default LocalCompetition;
