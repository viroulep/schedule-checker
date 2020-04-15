import React from 'react';

import { availableModels } from '../data/simu';
import GenericPicker from './Generic';

const modelOptions = availableModels.map((m) => ({
  text: m,
  key: m,
  value: m,
}));

const ModelPicker = ({
  model,
  setModel,
}) => <GenericPicker val={model} setVal={setModel} options={modelOptions} />;

export default ModelPicker;
