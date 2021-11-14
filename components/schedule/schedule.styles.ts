import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sectionHeaderStyle: {
    fontSize: 20,
    paddingVertical: 5,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
    color: '#000',
    fontWeight: '600',
  },
  sectionListItemStyle: {
    color: '#000',
    paddingVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTimeStyles: {
    width: 60,
    paddingLeft: 10,
    paddingVertical: 5,
    marginRight: 15,
    borderRightWidth: 1,
    borderRightColor: '#40a9ff',
  },
  disciplineInfo: {
    flex: 1,
    paddingRight: 20,
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#c8c8c8',
  },
  disciplineName: {
    fontSize: 15,
    fontWeight: '400',
  },
  teacherName: {
    color: '#8c8c8c',
    textAlign: 'right',
  },
  withPadding: {
    padding: 15,
  },
  emptyIconContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
