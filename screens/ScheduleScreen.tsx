import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Loader } from '../components/loader';
import { Schedule } from '../components/schedule';
import { useActions } from '../hooks/useActions';
import { RootState } from '../rdx';
import { setGroupSchedule } from '../rdx/cache/actions';
import { setGroups } from '../rdx/general-data/actions';

import Api from '../services/api';

const ScheduleScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const selectedGroupId = useSelector((state: RootState) => state.generalData.selectedGroupId);

  const setGroupsAction = useActions(setGroups);
  const setGroupScheduleAction = useActions(setGroupSchedule);

  const initializeState = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Api.group.getGroups();
      setGroupsAction(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const setSchedule = useCallback(async () => {
    if (!selectedGroupId) return;
    try {
      setLoading(true);
      const response = await Api.timeTable.getTimeTableByGroup(selectedGroupId);
      setGroupScheduleAction(selectedGroupId, response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [selectedGroupId]);

  useEffect(() => {
    initializeState();
  }, [initializeState]);

  useEffect(() => {
    setSchedule();
  }, [setSchedule]);

  return (
    <>
      {selectedGroupId
        ? <Schedule groupId={selectedGroupId} />
        : <Text>Please select a group to display the schedule</Text>
      }
      <Loader size="large" color={'#0000ff'} loading={loading} />
    </>
  );
}

export default ScheduleScreen;