import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    items,
    monsterCategories,
    itemCategories,
    monsters,
  },
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
