import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistor = {
  key: 'root',
  storage: AsyncStorage,
};
