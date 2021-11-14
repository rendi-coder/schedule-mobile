import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';

import { View } from '../components/Themed';
import { IGroup } from '../lib/types/models';
import { useSelector } from 'react-redux';
import { RootState } from '../rdx';
import { useActions } from '../hooks/useActions';
import { setSelectedGroupId } from '../rdx/general-data/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  const { groups, selectedGroupId } = useSelector((state: RootState) => state.generalData);
  const [searchState, setSearchState] = useState<string>('');
  const [filteredList, setFilteredList] = useState<IGroup[]>(groups);

  const setSelectedGroupIdAction = useActions(setSelectedGroupId);

  const autocompleteHandler = (text: string) => {
    const filteredList = groups.filter(
      (item) => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    setSearchState(text);
    setFilteredList(filteredList);
  };

  const setGroup = useCallback((groupdId: number) => {
    setSelectedGroupIdAction(groupdId);
  }, []);

  const Item = ({ group }: { group: IGroup }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{group.name}</Text>
      <TouchableOpacity style={styles.checkBox} onPress={() => setGroup(group.id)} activeOpacity={0.6}>
        {group.id === selectedGroupId && <View style={styles.checkMark} />}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.text}>Select a group to display the schedule</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Search by groups'}
          style={styles.text}
          onChangeText={(text) => {
            autocompleteHandler(text);
          }}
          defaultValue={searchState}
        />
      </View>
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ top: 1, bottom: 1100 }}
      >
        {filteredList.length
          ? filteredList.map((group, i) => <Item key={group.name + i} group={group} />)
          : <Text style={[styles.text, { color: 'red' }]}>Group Not found</Text>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderRadius: 8
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#e2e2e2',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkMark: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#47bd8d'
  },
  inputContainer: {
    marginTop: 8,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e2e2e2',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#0d404f',
  },
})