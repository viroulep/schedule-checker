import React, { useState, useEffect, useRef } from 'react';
import { Link, Router } from '@reach/router';
import {
  Grid,
  Header,
  Form,
  Dropdown,
  Segment,
  Message,
  Menu,
  Popup,
} from 'semantic-ui-react';
import _ from 'lodash';
import { asMap, SettingsDescription } from '@viroulep/group-simulator';
import yaml from 'js-yaml';

import {
  isPartiallyActive, isExactlyActive,
} from '../Navigation/utils';
import './Settings.scss';
import { storeConfig, loadStoredConfig, clearAndRefreshSettings } from '../utils';

const exportAsYaml = (simulator) => {
  const { mapSetup, mapModel, mapScrambling } = loadStoredConfig(simulator);
  const yamlDump = yaml.safeDump({
    setup: mapSetup,
    model: mapModel,
    scrambling: mapScrambling,
  });
  const blob = new Blob([yamlDump], {
    type: 'application/x-yaml',
  });
  const blobURL = window.URL.createObjectURL(blob);
  const tmp = document.createElement('a');
  tmp.href = blobURL;
  tmp.setAttribute('download', 'simulator-settings.yml');
  document.body.appendChild(tmp);
  tmp.click();
};

const DropdownMenu = ({
  saveAction,
  hasChanges,
  simulator,
  onFileSelected,
}) => {
  const fileInput = useRef(null);
  return (
    <Dropdown item icon="cogs" className="right">
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={saveAction}
          disabled={!hasChanges}
        >
          Save settings
        </Dropdown.Item>
        <Dropdown.Item onClick={clearAndRefreshSettings}>Reset settings to default</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Settings as YAML</Dropdown.Header>
        <Dropdown.Item onClick={() => fileInput.current.click()}>
          Import
          <input
            type="file"
            ref={fileInput}
            accept=".yml,.yaml"
            style={{ display: 'none' }}
            onChange={(ev) => onFileSelected(ev, fileInput)}
          />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => exportAsYaml(simulator)}>Export</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
};

const SettingsPanel = ({
  options,
  props,
  setProps,
}) => {
  const updateInProps = (k, v) => {
    const newProps = {
      ...props,
    };
    // NaN evaluates as false, so if NaN take 0
    newProps[k] = parseInt(v, 10) || 0;
    setProps(newProps);
  };

  return (
    <Form className="settings-form">
      <Grid doubling textAlign="right" columns={3}>
        {Object.entries(options).map(([k, data]) => (
          <Grid.Column key={k}>
            <Form.Input
              inline
              min={0}
              type="number"
              label={(
                <Popup
                  /* eslint-disable-next-line */
                  trigger={<label>{data.text}</label>}
                  position="left center"
                >
                  {data.desc}
                </Popup>
              )}
              value={props[k] || 0}
              onChange={(e) => updateInProps(k, e.target.value)}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Form>
  );
};

const loadStoredAndSet = (
  simulator, setSetup, setModel, setScrambling, setSaved,
) => {
  const { mapSetup, mapModel, mapScrambling } = loadStoredConfig(simulator);
  setSetup(mapSetup);
  setModel(mapModel);
  setScrambling(mapScrambling);
  const newConfig = {
    setup: mapSetup,
    model: mapModel,
    scrambling: mapScrambling,
  };
  setSaved(newConfig);
  storeConfig(newConfig);
};

const loadConfig = (
  simulator, setup, model, scrambling,
  setSetup, setModel, setScrambling, setSaved,
) => {
  // We let the simulator handle the validation, therefore we:
  //   - clear the stored data
  //   - load the submitted config
  //   - load the stored config (which will return the - sanitized - config
  //   set in the simulator)
  //   - set the saved config.
  storeConfig({});
  simulator.loadConfig(
    asMap(simulator.MapStringInt, setup),
    asMap(simulator.MapStringInt, model),
    asMap(simulator.MapStringInt, scrambling),
  );
  loadStoredAndSet(simulator, setSetup, setModel, setScrambling, setSaved);
};

const Settings = ({
  simulator,
}) => {
  const [setup, setSetup] = useState({});
  const [model, setModel] = useState({});
  const [scrambling, setScrambling] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    loadStoredAndSet(
      simulator, setSetup, setModel, setScrambling, setSaved,
    );
  }, [simulator, setSetup, setModel, setScrambling, setSaved]);

  const saveAction = () => {
    loadConfig(
      simulator, setup, model, scrambling,
      setSetup, setModel, setScrambling, setSaved,
    );
  }

  const [loadError, setLoadError] = useState(null);
  const loadFromYaml = (event, fileInput) => {
    setLoadError(null);
    const importYamlString = (yamlString) => {
      try {
        const asObj = yaml.safeLoad(yamlString);
        const newConfig = {
          setup: {},
          model: {},
          scrambling: {},
          ...asObj,
        };
        loadConfig(
          simulator, newConfig.setup, newConfig.model, newConfig.scrambling,
          setSetup, setModel, setScrambling, setSaved,
        );
      } catch (error) {
        setLoadError(error.message);
      }
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      importYamlString(e.target.result)
      // Clear the input so that we can re-upload the same file!
      /* eslint-disable no-param-reassign */
      fileInput.current.value = ''
    };
    reader.onerror = (e) => setLoadError(`Couldn't load the YAML file (${e})`);
    reader.readAsText(event.target.files[0]);
  };

  const seHasChanges = !_.isEqual(saved.setup, setup);
  const mHasChanges = !_.isEqual(saved.model, model);
  const scHasChanges = !_.isEqual(saved.scrambling, scrambling);
  const hasAnyChange = seHasChanges || mHasChanges || scHasChanges;

  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <div>
      <Header>
        Simulator settings
      </Header>
      <Message color="violet">
        All values are unsigned integers.
        <br />
        All times are expressed in seconds.
      </Message>
      {loadError && (
        <Message negative>
          Error while loading the settings:
          <pre>{loadError}</pre>
        </Message>
      )}
      <Menu attached="top" pointing color="violet">
        <Link to="" getProps={isExactlyActive}>
          Setup
          {' '}
          {seHasChanges ? '*' : ''}
        </Link>
        <Link to="model" getProps={isPartiallyActive}>
          Model parameters
          {' '}
          {mHasChanges ? '*' : ''}
        </Link>
        <Link to="scrambling" getProps={isPartiallyActive}>
          Scrambling costs
          {' '}
          {scHasChanges ? '*' : ''}
        </Link>
        <DropdownMenu
          simulator={simulator}
          saveAction={saveAction}
          hasChanges={hasAnyChange}
          onFileSelected={loadFromYaml}
        />
      </Menu>
      <Segment attached="bottom">
        <Router>
          <SettingsPanel
            path="/"
            default
            simulator={simulator}
            options={SettingsDescription.setup}
            props={setup}
            setProps={setSetup}
          />
          <SettingsPanel
            path="/model"
            simulator={simulator}
            options={SettingsDescription.model}
            props={model}
            setProps={setModel}
          />
          <SettingsPanel
            path="/scrambling"
            simulator={simulator}
            options={SettingsDescription.scrambling}
            props={scrambling}
            setProps={setScrambling}
          />
        </Router>
      </Segment>
    </div>
  )
};

export default Settings;
