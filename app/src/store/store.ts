import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../pages/login/userSlice';

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
