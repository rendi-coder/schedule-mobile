import { setGroups, setSelectedGroupId } from './actions';
import { Reducer } from 'redux';
import { SET_GROUPS, SET_SELECTED_GROUP_ID } from './conts';
import { GeneralDataAction, GeneralDataState } from './types';

const initialState = {
  groups: [],
  selectedGroupId: undefined,
};

export const generalDataReducer: Reducer<GeneralDataState, GeneralDataAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_GROUPS: {
      const { payload: groups } = action as ReturnType<typeof setGroups>;
      return { ...state, groups };
    }
    case SET_SELECTED_GROUP_ID: {
      const { payload: groupId } = action as ReturnType<typeof setSelectedGroupId>;
      return { ...state, selectedGroupId: groupId };
    }
    default:
      return state;
  }
};
