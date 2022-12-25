import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
const asyncitemListFetch = createAsyncThunk('GET_ITEMLIST', async () => {
  const itemList = await API.get(
    'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/items/all',
  );
  return itemList;
});

const itemListSlice = createSlice({
  name: 'userListSlice',
  initialState: {
    status: '',
    itemList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncitemListFetch.pending, (state) => {
      state.status = '로딩 중';
      state.itemList = [];
    });
    builder.addCase(asyncitemListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.itemList = action.payload;
    });
  },
});
export default itemListSlice;
export { asyncitemListFetch };