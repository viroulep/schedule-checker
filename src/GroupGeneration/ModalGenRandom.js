import React, { useState, useEffect } from 'react';
import {
  Form, Button, Modal,
} from 'semantic-ui-react';

import { setInt } from '../utils';

const generateRandomArray = (min, max, size) => Array.from(Array(size))
  .map(() => Math.floor(Math.random() * (max - min + 1)) + min);

const ModalGenRandom = ({
  times,
  setTimes,
  OpenButton,
  headerContent,
}) => {
  const [open, setOpenValue] = useState(false);
  const [generated, setGenerated] = useState([]);
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(15);
  const [amount, setAmount] = useState(20);

  const setOpen = () => setOpenValue(true);
  const setClose = () => setOpenValue(false);
  const error = min > max ? {
    content: 'Max must be greater than min',
  } : null;

  const generateAndAppend = () => setGenerated([
    ...generated,
    ...generateRandomArray(min, max, amount),
  ]);

  useEffect(() => setGenerated(times), [times]);

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
            <br />
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
            <Button
              basic
              negative
              content="Clear times"
              onClick={() => setGenerated([])}
            />
          </Form>
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
