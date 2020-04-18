import React, { useState, useEffect } from 'react';
import { Link, Router } from '@reach/router';
import {
  Grid,
  Header,
  Form,
  Button,
  Segment,
  Message,
  Menu,
} from 'semantic-ui-react';
import _ from 'lodash';
import { asMap, asObject } from '@viroulep/group-simulator';

import {
  isPartiallyActive, isExactlyActive,
} from '../Navigation/utils';
import './Settings.scss';

const SettingsPanel = ({
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
        {Object.entries(props).map(([k, v]) => (
          <Grid.Column key={k}>
            <Form.Input
              inline
              min={0}
              type="number"
              label={k}
              value={v}
              onChange={(e) => updateInProps(k, e.target.value)}
            />
          </Grid.Column>
        ))}
      </Grid>
    </Form>
  );
};

const Settings = ({
  simulator,
}) => {
  const [setup, setSetup] = useState({});
  const [model, setModel] = useState({});
  const [scrambling, setScrambling] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    const mapSetup = asObject(simulator.getSetupProps());
    const mapModel = asObject(simulator.getModelProps());
    const mapScrambling = asObject(simulator.getScramblingProps());
    setSetup(mapSetup);
    setModel(mapModel);
    setScrambling(mapScrambling);
    setSaved({
      setup: mapSetup,
      model: mapModel,
      scrambling: mapScrambling,
    });
  }, [simulator]);

  const loadConfig = () => {
    simulator.loadConfig(
      asMap(simulator.MapStringInt, setup),
      asMap(simulator.MapStringInt, model),
      asMap(simulator.MapStringInt, scrambling),
    );
    setSaved({ setup, model, scrambling });
  }

  const seHasChanges = !_.isEqual(saved.setup, setup);
  const mHasChanges = !_.isEqual(saved.model, model);
  const scHasChanges = !_.isEqual(saved.scrambling, scrambling);
  const hasAnyChange = seHasChanges || mHasChanges || scHasChanges;

  const saveButton = (
    <Button
      content="Save settings"
      onClick={loadConfig}
      disabled={!hasAnyChange}
      positive
    />
  );

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
        <Menu.Item
          position="right"
          content={saveButton}
        />
      </Menu>
      <Segment attached="bottom">
        <Router>
          <SettingsPanel
            path="/"
            default
            simulator={simulator}
            props={setup}
            setProps={setSetup}
          />
          <SettingsPanel
            path="/model"
            simulator={simulator}
            props={model}
            setProps={setModel}
          />
          <SettingsPanel
            path="/scrambling"
            simulator={simulator}
            props={scrambling}
            setProps={setScrambling}
          />
        </Router>
      </Segment>
    </div>
  )
};

export default Settings;
