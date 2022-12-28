import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../../api';

const asyncUserListFetch = createAsyncThunk(
  'GET_USERLIST',
  async (email: string) => {
    const userList = await API.get(`/users/${email}`);

    return userList;
  },
);

const userListSlice = createSlice({
  name: 'userListSlice',
  initialState: {
    status: '',
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncUserListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.userList = action.payload;
    });
  },
});
export default userListSlice;
export { asyncUserListFetch };
