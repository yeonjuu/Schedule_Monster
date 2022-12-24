import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../../api';
const asyncMonsterListFetch = createAsyncThunk('GET_MonsterList', async () => {
  const monsterList = await API.get('/characters/all');
  return monsterList;
});

const monsterListSlice = createSlice({
  name: 'monsterListSlice',
  initialState: {
    status: '',
    monsterList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncMonsterListFetch.fulfilled, (state, action) => {
      state.status = '불러오기 완료';
      state.monsterList = action.payload;
    });
  },
});
export default monsterListSlice;
export { asyncMonsterListFetch };
