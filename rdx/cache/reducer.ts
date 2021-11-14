import { Reducer } from 'redux';
import { SET_GROUP_SCHEDULE } from './conts';
import { CacheAction, CacheState, ISetGroupSchedule } from './types';

const initialState = {
  groups: {},
};

export const cacheReducer: Reducer<CacheState, CacheAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP_SCHEDULE: {
      const {
        payload: { groupId, schedule },
      } = action as ISetGroupSchedule;
      return { ...state, groups: { ...state.groups, [groupId]: schedule } };
    }
    default:
      return state;
  }
};
