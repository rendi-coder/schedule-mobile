import { IGroup } from '../../lib/types/models';
import Api from './Api';

export class GroupApiService extends Api {
  async getGroups(): Promise<IGroup[]> {
    const { data } = await this.apiClient.get<IGroup[]>(`/group/`);
    return data;
  }
}
