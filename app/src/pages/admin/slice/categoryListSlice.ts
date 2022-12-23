import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../../api';
const asyncCategoryListFetch = createAsyncThunk('GET_CATEGORY', async () => {
  const categoryList = await API.get('category/all');
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
    builder.addCase(asyncCategoryListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.categoryList = action.payload;
    });
  },
});
export default categoryListSlice;
export { asyncCategoryListFetch };
