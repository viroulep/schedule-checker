import React, { useState, useEffect } from 'react';
import {
  Grid,
  Form,
  Button,
  Segment,
  Message,
  Menu,
} from 'semantic-ui-react';
import _ from 'lodash';

import './Settings.scss';

const asMap = (nativeMap) => {
  console.log("asmap");
  const obj = {};
  const keys = nativeMap.keys();
  for (let i = 0; i < keys.size(); i++) {
    const k = keys.get(i);
    obj[k] = nativeMap.get(k);
  }
  return obj;
};

const asNativeMap = (simulator, obj) => {
  const native = new simulator.MapStringInt();
  Object.entries(obj).map(([k, v]) => native.set(k, v));
  return native;
};

const SetupSettings = ({
  simulator,
}) => {
  const [savedProps, setSavedProps] = useState({});
  const [props, setProps] = useState({});

  useEffect(() => {
    const theMap = asMap(simulator.getSetupProps());
    setProps(theMap);
    setSavedProps(theMap);
  }, [simulator]);

  const saveSettings = () => {
    setSavedProps(props);
    // TODO: check return code
    simulator.loadConfig(
      asNativeMap(simulator, props),
      simulator.getModelProps(),
      simulator.getScramblingProps());
  };

  const updateInProps = (k, v) => {
    const newProps = {
      ...props,
    };
    // NaN evaluates as false, so if NaN take 0
    newProps[k] = parseInt(v) || 0;
    setProps(newProps);
  };

  const test = () => {
    console.log(simulator.getSetupProps().get("cutoff"));
  };

  console.log(props);

  const hasChanged = !_.isEqual(savedProps, props);

  return (
    <Form className='settings-form'>
      <Grid doubling textAlign='right' columns={3}>
        {Object.entries(props).map(([k, v]) => {
          return (
            <Grid.Column key={k}>
              <Form.Input
                inline
                type='number'
                label={k}
                value={v}
                onChange={(e) => updateInProps(k, e.target.value)}
              />
            </Grid.Column>
          );
        })}
      </Grid>
      <Button
        primary
        content='Save settings'
        onClick={saveSettings}
        disabled={!hasChanged}
      />
      <Button color='pink' content='test' onClick={test} />
    </Form>
  );
};

const Settings = ({
  simulator,
}) => {
  const [active, setActive] = useState('bio');
  const handleClick = (e, { name }) => setActive(name);
  return (
    <div>
      <Segment attached='top'>
        <Message color='teal' content='All times are expressed in seconds.' />
        <SetupSettings simulator={simulator} />
      </Segment>
      <Menu attached='bottom' tabular>
        <Menu.Item
          name='bio'
          active={active === 'bio'}
          onClick={handleClick}
        />
        <Menu.Item
          name='pics'
          active={active === 'pics'}
          onClick={handleClick}
        />
        <Menu.Item
          name='companies'
          active={active === 'companies'}
          onClick={handleClick}
        />
        <Menu.Item
          name='links'
          active={active === 'links'}
          onClick={handleClick}
        />
      </Menu>
    </div>
  )
};

export default Settings;
