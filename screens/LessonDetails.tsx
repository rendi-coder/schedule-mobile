import { useRoute } from '@react-navigation/core';
import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { IArticle, ITimeTable } from '../lib/types/models';
import { RootState } from '../rdx';

const LessonDetailsScreen = () => {
    const route = useRoute();
    const { timeTableId = '', groupId = '' } = route.params as { timeTableId: number, groupId: number };
    const groupInfo = useSelector((state: RootState) => state.cache.groups)?.[groupId];
    const data: ITimeTable | undefined = groupInfo?.find(l => l.id === timeTableId);

    const ItemSeparator = () => (
        <View style={styles.listItemSeparatorStyle} />
    );

    const Item = ({ item }: { item: { text: string } }) => (
        <Text style={styles.itemStyles}>{item.text}</Text>
    )

    const generateSections = (articles: IArticle[]) => {
        const transformStrToDate = (date: string) => {
            const [d, m, y] = date.split('.');
            return new Date(+m, +d, +y);
        }
        const sortedArticles = articles.sort((a, b) => {
            return (transformStrToDate(b.date) as any) - (transformStrToDate(a.date) as any);
        });
        return sortedArticles.map(a => ({ title: a.title, data: [{ text: a.description, date: a.date }] }))
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {data?.articles ? <SectionList
                ItemSeparatorComponent={ItemSeparator}
                sections={generateSections(data.articles)}
                renderSectionHeader={({ section }) => (
                    <View style={styles.sectionHeaderStyle}>
                        <Text style={styles.sectionHeaderTextStyle}>{section.title}</Text>
                        <Text style={styles.sectionHeaderTextStyle}>{section.data[0].date}</Text>
                    </View>
                )}
                renderItem={Item}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#c8c8c8',
    },
    sectionHeaderStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
    },
    sectionHeaderTextStyle: {
        fontSize: 20,
        color: '#000',
        fontWeight: '600',
    },
    itemStyles: {
        padding: 10,
        marginBottom: 5
    },
})

export default LessonDetailsScreen;