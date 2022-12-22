import { configureStore } from '@reduxjs/toolkit';
import statusReducer from 'pages/characters/statusReducer';
import userReducer from '../pages/login/userSlice';
import { items, monsterCategories, monsters, itemCategories } from './mockData';
const store = configureStore({
  reducer: {
    userReducer,
    items,
    monsterCategories,
    itemCategories,
    monsters,
    statusReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
