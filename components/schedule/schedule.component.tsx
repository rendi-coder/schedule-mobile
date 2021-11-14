import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { DAYS_OF_WEEK } from '../../constants/dayOfWeek';
import { LESSONS_INFO } from '../../constants/lessons';
import { ITimeTable } from '../../lib/types/models';
import { RootState } from '../../rdx';
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

    const ItemSeparator = () => (
        <View style={styles.listItemSeparatorStyle} />
    );

    const Item = ({ item }: { item: ITimeTable | IEmptyLesson }) => {
        const { lesson, discipline, teacher = { surname: '', name: '' } } = item as ITimeTable;
        const startTime = lesson ? lesson.startTime : (item as IEmptyLesson).startTime;
        const endTime = lesson ? lesson.endTime : (item as IEmptyLesson).endTime;

        return <TouchableOpacity activeOpacity={1} style={styles.sectionListItemStyle}>
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