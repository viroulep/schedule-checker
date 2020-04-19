import events from '../data/events';

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
    eventId && events.byId[eventId].name,
    roundNumber && `Round ${roundNumber}`,
    groupNumber && `Group ${groupNumber}`,
    attemptNumber && `Attempt ${attemptNumber}`,
  ].filter((x) => x).join(', ');
};
