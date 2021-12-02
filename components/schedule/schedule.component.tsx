import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, Text, SectionList, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { DAYS_OF_WEEK } from '../../constants/dayOfWeek';
import { LESSONS_INFO } from '../../constants/lessons';
import { useActions } from '../../hooks/useActions';
import { ITimeTable } from '../../lib/types/models';
import { RootState } from '../../rdx';
import { setGroupSchedule } from '../../rdx/cache/actions';
import Api from '../../services/api';
import { styles } from './schedule.styles';

interface IScheduleProps {
    groupId: number;
}

interface IEmptyLesson {
    startTime: string;
    endTime: string;
}

interface TSection {
    title: string;
    data: Array<ITimeTable | IEmptyLesson>
}

export const Schedule: React.FC<IScheduleProps> = ({ groupId }) => {
    const groups = useSelector((state: RootState) => state.cache.groups);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const setGroupScheduleAction = useActions(setGroupSchedule);
    
    const ItemSeparator = () => (
        <View style={styles.listItemSeparatorStyle} />
    );

    const onRefresh = async () => {
        try {
            setLoading(true);
            const response = await Api.timeTable.getTimeTableByGroup(groupId);
            setGroupScheduleAction(groupId, response);
        } catch (e) {
            console.log(e);
        }
        finally {
            setLoading(false);
        }
    }

    const Item = ({ item }: { item: ITimeTable | IEmptyLesson }) => {
        const { lesson, discipline, teacher = { surname: '', name: '' } } = item as ITimeTable;
        const startTime = lesson ? lesson.startTime : (item as IEmptyLesson).startTime;
        const endTime = lesson ? lesson.endTime : (item as IEmptyLesson).endTime;

        return (
            <TouchableOpacity
                activeOpacity={lesson ? 0.5 : 1}
                style={styles.sectionListItemStyle}
                onPress={() => lesson && navigation.navigate("LessonDetails", { groupId, timeTableId: (item as ITimeTable).id } as any)}
            >
                <View style={styles.itemTimeStyles}>
                    <Text>{startTime}</Text>
                    <Text>{endTime}</Text>
                </View>
                {discipline ?
                    <View style={styles.disciplineInfo}>
                        <Text style={styles.disciplineName}>{discipline.name}</Text>
                        <Text style={styles.teacherName}>{teacher.surname} {teacher.name}</Text>
                    </View>
                    : <View style={styles.emptyIconContainer}>
                        <FontAwesome size={24} name="calendar-minus-o" color="#c8c8c8" />
                    </View>}
            </TouchableOpacity>
        )
    }

    const renderNoContent = ({ section }: { section: TSection }) => {
        if (section.data.length === 0) {
            return <Text style={styles.withPadding}>Free Day</Text>
        }
        return null;
    }

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={ItemSeparator}
                sections={generateSections(groups[groupId])}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeaderStyle}>{section.title}</Text>
                )}
                renderSectionFooter={renderNoContent}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={Item}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const generateSections = (timeTable: ITimeTable[]): TSection[] => {
    const sections: TSection[] = Object.values(DAYS_OF_WEEK).map(title => ({ title, data: [] }));
    timeTable?.forEach(element => {
        const day = (element.dayOfWeek.dayOfWeek);
        const addToSection = (day: number, info: ITimeTable) => sections[day - 1].data.push(info);
        if (day >= 0 || day < sections.length + 1) {
            addToSection(day, element);
        }
    });

    return sections.map(s => s.data.length ? ({ title: s.title, data: addEmtyLessons(s.data as ITimeTable[]) }) : s);
}

const addEmtyLessons = (data: ITimeTable[]): Array<ITimeTable | IEmptyLesson> => {
    let result: Array<ITimeTable | IEmptyLesson> = LESSONS_INFO.slice(0, 4);

    data.forEach(item => {
        const lesson = item.lesson?.number - 1;
        if (lesson >= 0) {
            result[lesson] = item;
        }
    })

    return result;
}