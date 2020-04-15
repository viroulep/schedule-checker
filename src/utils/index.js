const SECS_IN_MINUTE = 60;
const SECS_IN_HOUR = 60 * SECS_IN_MINUTE;

const integerDivision = (x, y) => ({
  result: Math.floor(x/y),
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
