import React from 'react';

import { availableModels } from '../data/simu';
import GenericPicker from './Generic';

const modelOptions = availableModels.map((m) => ({
  text: m,
  key: m,
  value: m,
}));

/* eslint-disable react/jsx-props-no-spreading */
const ModelPicker = ({
  model,
  setModel,
  ...props
}) => (
  <GenericPicker
    {...props}
    val={model}
    setVal={setModel}
    options={modelOptions}
  />
);

export default ModelPicker;
