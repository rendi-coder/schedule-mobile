import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { persistor as persisConfig } from '../config/persistor';

import { cacheReducer } from './cache/reducer';
import { generalDataReducer } from './general-data/reducer';

const rootReducer = combineReducers({
  cache: cacheReducer,
  generalData: generalDataReducer,
});

const persistedReducer = persistReducer(persisConfig, rootReducer);

const store = createStore(persistedReducer);
export const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
