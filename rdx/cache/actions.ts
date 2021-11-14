import { ITimeTable } from './../../lib/types/models/ITimeTable';
import { SET_GROUP_SCHEDULE } from './conts';

export const setGroupSchedule = (groupId: string, schedule: ITimeTable[]) => ({
  type: SET_GROUP_SCHEDULE as typeof SET_GROUP_SCHEDULE,
  payload: { groupId, schedule },
});
