import React from 'react';
import { View, Text } from 'react-native';
import { ITimeTable } from '../../lib/types/models';
import { styles } from './schedule.styles';

interface IScheduleProps {
    data: ITimeTable[]
}

export const Schedule: React.FC<IScheduleProps> = ({ data }) => (
    <View style={styles.root}>
        <Text>Schedule</Text>
    </View>
);