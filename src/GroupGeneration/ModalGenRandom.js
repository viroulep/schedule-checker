import React, { useState, useEffect } from 'react';
import {
  Segment, Divider, Header, Form, Button, Modal, Grid,
} from 'semantic-ui-react';
import _ from 'lodash';

import { setInt } from '../utils';
import GenericPicker from '../Pickers/Generic';

const generateRandomArray = (min, max, size) => Array.from(Array(size))
  .map(() => Math.floor(Math.random() * (max - min + 1)) + min);

const DEFAULT_MIN = 10;
const DEFAULT_MAX = 15;

const FormAddRandom = ({
  generated,
  setGenerated,
}) => {
  const [min, setMin] = useState(DEFAULT_MIN);
  const [max, setMax] = useState(DEFAULT_MAX);
  const [amount, setAmount] = useState(10);
  const error = min > max ? {
    content: 'Max must be greater than min',
  } : null;

  const generateAndAppend = () => setGenerated([
    ...generated,
    ...generateRandomArray(min, max, amount),
  ]);

  useEffect(() => {
    setMin(_.min(generated) || DEFAULT_MIN);
    setMax(_.max(generated) || DEFAULT_MAX);
  }, [generated]);

  return (
    <>
      <Header as="h4" textAlign="center">
        Generate random times
      </Header>
      <p>
        The form below let you add some randomly generated number within
        {' '}
        <em>min</em>
        {' '}
        and
        {' '}
        <em>max</em>
        .
      </p>
      <Form>
        <Form.Input
          inline
          min={1}
          type="number"
          label="Min"
          value={min}
          onChange={(e) => setInt(e, setMin, min)}
        />
        <Form.Input
          inline
          min={1}
          type="number"
          label="Max"
          value={max}
          error={error}
          onChange={(e) => setInt(e, setMax, max)}
        />
        <Form.Input
          inline
          min={1}
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setInt(e, setAmount, amount)}
        />
        <Button
          color="violet"
          disabled={!!error}
          content="Generate and append"
          onClick={generateAndAppend}
        />
      </Form>
    </>
  )
};

const amountOptions = Array.from(Array(10).keys()).map((n) => ({
  text: n + 1,
  key: n + 1,
  value: n + 1,
}));

const FormAddOne = ({
  generated,
  setGenerated,
}) => {
  const [time, setTime] = useState(_.max(generated) || DEFAULT_MAX);
  const [amount, setAmount] = useState(1);
  const generateAndAppend = () => setGenerated([
    ...generated,
    ...Array.from(Array(amount)).map(() => time),
  ]);
  return (
    <>
      <Header as="h4" textAlign="center">
        Add specific time(s)
      </Header>
      <p>
        You can add a specific time one or more time by using the form below.
      </p>
      <Form className="mb-2">
        <Form.Input
          inline
          min={1}
          type="number"
          label="Time"
          value={time}
          onChange={(e) => setInt(e, setTime, time)}
        />
      </Form>
      <div className="mb-2">
        I want to add this value
        {' '}
        <GenericPicker
          inline
          scrolling
          val={amount}
          setVal={setAmount}
          options={amountOptions}
        />
        {' '}
        times.
      </div>
      <Button
        color="violet"
        content="Append"
        onClick={generateAndAppend}
      />
    </>
  );
};

const ModalGenRandom = ({
  times,
  setTimes,
  OpenButton,
  headerContent,
}) => {
  const [open, setOpenValue] = useState(false);
  const [generated, setGenerated] = useState([]);

  const setOpen = () => setOpenValue(true);
  const setClose = () => setOpenValue(false);

  useEffect(() => {
    setGenerated(times);
  }, [times, open]);

  return (
    <>
      {OpenButton ? (
        <OpenButton onClick={setOpen} />
      ) : (
        <Button primary onClick={setOpen}>Generate group</Button>
      )}
      <Modal open={open} centered={false} onClose={setClose}>
        <Modal.Header>
          {headerContent ? (
            <>{headerContent}</>
          ) : (
            <>Generate competitors for group</>
          )}
        </Modal.Header>
        <Modal.Content>
          <p>
            Use this form to generate a population for the group.
            Each number represents the average time of one competitor,
            therefore if you want 20 competitors in the group you need to
            generate 20 numbers.
          </p>
          <p>
            There are
            {' '}
            {generated.length}
            {' '}
            competitors in the group currently:
            <br />
            <code>
              {generated.join(', ')}
            </code>
          </p>
          <Segment basic>
            <Grid columns={2} relaxed="very" className="mb-2">
              <Grid.Column>
                <FormAddRandom generated={generated} setGenerated={setGenerated} />
              </Grid.Column>
              <Grid.Column>
                <FormAddOne generated={generated} setGenerated={setGenerated} />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
          <Button
            basic
            negative
            content="Clear times"
            onClick={() => setGenerated([])}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button
              positive
              onClick={() => { setTimes(generated); setClose(); }}
              content="Save"
            />
            <Button.Or />
            <Button color="black" onClick={setClose} content="Discard" />
          </Button.Group>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalGenRandom;
