import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
import paletteSlice from './../pages/calendar/modal/paletteSlice';
const store = configureStore({
  reducer: {
    userReducer,
    items,
    monsterCategories,
    itemCategories,
    monsters,
    paletteSlice
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
