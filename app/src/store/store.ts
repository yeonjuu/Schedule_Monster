import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userListSlice from 'pages/admin/userListSlice';
import itemListSlice from 'pages/admin/itemListSlice';
import categoryListSlice from 'pages/admin/categoryListSlice';

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
    userListReducer: userListSlice.reducer,
    itemListReducer: itemListSlice.reducer,
    categoryListReducer: categoryListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
