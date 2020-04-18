import ls from 'local-storage';
import { asMap, asObject } from '@viroulep/group-simulator';

const SECS_IN_MINUTE = 60;
const SECS_IN_HOUR = 60 * SECS_IN_MINUTE;

const integerDivision = (x, y) => ({
  result: Math.floor(x / y),
  remainder: x % y,
});

export const timeToString = (time) => {
  let { result, remainder } = integerDivision(time, SECS_IN_HOUR);
  const hour = result;
  ({ result, remainder } = integerDivision(remainder, SECS_IN_MINUTE));
  const hourStr = hour > 0 ? `${hour} hours` : '';
  const minStr = result > 0 ? `${result} minutes` : '';
  const secStr = `${remainder} seconds`;
  return [hourStr, minStr, secStr].join(' ');
};

export const setInt = (e, set, def) => set(parseInt(e.target.value, 10) || def);

export const loadStoredConfig = (simulator) => {
  if (!simulator) {
    return {};
  }
  const saved = ls('config') || {};
  const mapSetup = saved.setup || asObject(simulator.getSetupProps());
  const mapModel = saved.model || asObject(simulator.getModelProps());
  const mapScrambling = saved.scrambling || asObject(simulator.getScramblingProps());
  const err = simulator.loadConfig(
    asMap(simulator.MapStringInt, mapSetup),
    asMap(simulator.MapStringInt, mapModel),
    asMap(simulator.MapStringInt, mapScrambling),
  );
  if (err !== simulator.ErrorKind.SUCCESS) {
    /* eslint-disable-next-line */
    console.error(`Could not load local config: ${simulator.errorMessage(err)}`);
    return {
      mapSetup: asObject(simulator.getSetupProps()),
      mapModel: asObject(simulator.getModelProps()),
      mapScrambling: asObject(simulator.getScramblingProps()),
    }
  }

  return { mapSetup, mapModel, mapScrambling };
};

export const storeConfig = (conf) => ls('config', conf);

export const clearAndRefresh = () => {
  ls('config', {});
  document.location.reload();
};
