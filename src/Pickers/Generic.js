import React from 'react';
import { Dropdown } from 'semantic-ui-react';

/* eslint-disable react/jsx-props-no-spreading */
const GenericPicker = ({
  val,
  setVal,
  options,
  ...props
}) => (
  <Dropdown
    {...props}
    value={val}
    onChange={(e, { value }) => setVal(value)}
    options={options}
  />
);

export default GenericPicker;
