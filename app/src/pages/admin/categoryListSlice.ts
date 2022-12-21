import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
const asyncCategoryListFetch = createAsyncThunk('GET_CATEGORY', async () => {
  const categoryList = await API.get(
    'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/category/all',
  );
  return categoryList;
});

const categoryListSlice = createSlice({
  name: 'categoryListSlice',
  initialState: {
    status: '',
    categoryList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncCategoryListFetch.pending, (state) => {
      state.status = '로딩 중';
      state.categoryList = [];
    });
    builder.addCase(asyncCategoryListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.categoryList = action.payload;
    });
  },
});
export default categoryListSlice;
export { asyncCategoryListFetch };
