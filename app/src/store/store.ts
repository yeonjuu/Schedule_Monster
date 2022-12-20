import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
const store = configureStore({
  reducer: {
    userReducer,
    items,
    monsterCategories,
    itemCategories,
    monsters,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
