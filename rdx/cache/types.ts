import { ITimeTable } from './../../lib/types/models/ITimeTable';
import { SET_GROUP_SCHEDULE } from './conts';

interface IGroupSchedule {
  [groupId: string]: ITimeTable[];
}

export interface CacheState {
  groups: IGroupSchedule;
}

export interface ISetGroupSchedule {
  type: typeof SET_GROUP_SCHEDULE;
  payload: {
    groupId: string;
    schedule: ITimeTable[];
  };
}

export type CacheAction = ISetGroupSchedule;
