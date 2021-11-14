import { IGroup } from './../../lib/types/models/IGroup';
import { setGroups, setSelectedGroupId } from './actions';

export interface GeneralDataState {
  groups: IGroup[];
  selectedGroupId?: number;
}

export type GeneralDataAction =
  | ReturnType<typeof setGroups>
  | ReturnType<typeof setSelectedGroupId>;
