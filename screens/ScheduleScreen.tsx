import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import PickerComponent from '../components/picker/picker';
import { Schedule } from '../components/schedule';
import { IGroup, ITimeTable } from '../lib/types/models';

import Api from '../services/api';
import { RootTabScreenProps } from '../types';

const ScheduleScreen = ({ navigation }: RootTabScreenProps<'Schedule'>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [data, setData] = useState<ITimeTable[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const requestWrapper = useCallback(async (cb: () => Promise<void>) => {
    try {
      setLoading(true);
      await cb();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTimeTableByGroupId = useCallback((groupId: number) =>
    requestWrapper(async () => {
      const response = await Api.timeTable.getTimeTableByGroup(groupId);
      setData(response);
    }), [requestWrapper]);

  useEffect(() => {
    requestWrapper(async () => {
      const response = await Api.group.getGroups();
      console.log(response)
      setGroups(response);
    })
  }, [requestWrapper]);

  return (
    <>
      <PickerComponent
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        values={groups.map(g => g.name)}
      />
      {/* {loading ? <Text>Loading...</Text> : <Schedule data={data} />} */}
    </>
  );
}

export default ScheduleScreen;