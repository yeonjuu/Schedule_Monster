import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
import userListSlice from 'pages/admin/userListSlice';
import itemListSlice from 'pages/admin/itemListSlice';
import categoryListSlice from 'pages/admin/categoryListSlice';
import paletteSlice from '../pages/calendar/slice/paletteSlice';
import modalSlice from '../pages/calendar/slice/modalSlice';
const store = configureStore({
  reducer: {
    userReducer,
    items,
    monsterCategories,
    itemCategories,
    monsters,
    userListReducer: userListSlice.reducer,
    itemListReducer: itemListSlice.reducer,
    categoryListReducer: categoryListSlice.reducer,
    paletteSlice,
    modalSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
