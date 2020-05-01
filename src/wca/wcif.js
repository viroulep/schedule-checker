import { asMap } from '@viroulep/group-simulator';
import Events from '../data/events';

export const parseActivityCode = (activityCode) => {
  const [, e, r, g, a, o] = activityCode.match(
    /^(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?(?:-(\w+))?$/,
  );
  return {
    eventId: e === 'other' ? null : e,
    roundNumber: r ? parseInt(r, 10) : null,
    groupNumber: g ? parseInt(g, 10) : null,
    attemptNumber: a ? parseInt(a, 10) : null,
    otherActivity: o,
  };
};

export const activityCodeToName = (activityCode) => {
  const {
    eventId, roundNumber, groupNumber, attemptNumber,
  } = parseActivityCode(activityCode);
  return [
    eventId && Events.byId[eventId].name,
    roundNumber && `Round ${roundNumber}`,
    groupNumber && `Group ${groupNumber}`,
    attemptNumber && `Attempt ${attemptNumber}`,
  ].filter((x) => x).join(', ');
};

export const getRoundData = (events, activityCode) => {
  // The activity code may contain a group or attempt, so we want to extract only
  // the relevant part.
  const { eventId, roundNumber } = parseActivityCode(activityCode);
  const roundId = `${eventId}-r${roundNumber}`;
  const event = events.find((e) => e.id === eventId);
  return event ? event.rounds.find((r) => r.id === roundId) : null;
};

export const localConfigFromActivity = (simulator, compWcif, activityCode) => {
  // We'll just use the default config with no override!
  const { cutoff, timeLimit } = getRoundData(compWcif.events, activityCode);
  const configOverride = {};
  if (timeLimit) {
    // NOTE: cumulative time limit across events are not supported
    // (and not planed to be).
    const { centiseconds } = timeLimit;
    configOverride.time_limit = Math.floor(centiseconds / 100);
  }
  if (cutoff) {
    // Because we only simulate timed event, we can safely assume the attemptResult
    // is a value representing centiseconds!
    const { attemptResult } = cutoff;
    configOverride.cutoff = Math.floor(attemptResult / 100);
  }
  return asMap(simulator.MapStringInt, configOverride)
};
