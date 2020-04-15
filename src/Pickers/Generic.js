import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const GenericPicker = ({
  val,
  setVal,
  options,
}) => (
  <Dropdown
    value={val}
    selection
    onChange={(e, { value }) => setVal(value)}
    options={options}
  />
);

export default GenericPicker;
