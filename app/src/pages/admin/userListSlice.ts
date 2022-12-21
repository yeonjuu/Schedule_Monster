import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
const asyncUserListFetch = createAsyncThunk('GET_USERLIST', async () => {
  const userList = await API.get(
    'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/users',
  );
  return userList;
});

const userListSlice = createSlice({
  name: 'userListSlice',
  initialState: {
    status: '',
    userList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncUserListFetch.pending, (state) => {
      state.status = '로딩 중';
      state.userList = [];
    });
    builder.addCase(asyncUserListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.userList = action.payload;
    });
  },
});
export default userListSlice;
export { asyncUserListFetch };
