import { GroupApiService } from './GroupApiService';
import { TimeTableApiService } from './TimeTableServiceApi';

export default {
  timeTable: new TimeTableApiService(),
  group: new GroupApiService(),
};
