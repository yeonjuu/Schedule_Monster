import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
import userListSlice from 'pages/admin/userListSlice';
import itemListSlice from 'pages/admin/itemListSlice';
import categoryListSlice from 'pages/admin/categoryListSlice';
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
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
