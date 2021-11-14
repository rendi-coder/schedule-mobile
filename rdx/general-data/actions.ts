import { IGroup } from './../../lib/types/models/IGroup';
import { SET_GROUPS, SET_SELECTED_GROUP_ID } from './conts';

export const setGroups = (groups: IGroup[]) => ({
  type: SET_GROUPS as typeof SET_GROUPS,
  payload: groups,
});

export const setSelectedGroupId = (groupId?: number) => ({
  type: SET_SELECTED_GROUP_ID as typeof SET_SELECTED_GROUP_ID,
  payload: groupId,
});
