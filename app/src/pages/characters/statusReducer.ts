import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainImage, MainName } from './storeInterface';

const initialState = {
  name: '스몬',
  affection: 0,
  coin: 1000,
  mainImage : 'https://art.pixilart.com/5e6de2826be33b3.png',
};

//상점에서 보여지는 대표 캐릭터 상태
const statusSlice = createSlice({
  name: 'pokename',
  initialState,
  reducers: {
    buyItem: (state: any, action: PayloadAction<number>) => {
      state.coin -= action.payload;
    },
    useItem: (state: any, action: PayloadAction<number>) => {
      state.affection += action.payload;
    },
    mainImage: (state: any, action: PayloadAction<MainImage>) => {
      state.mainImage = action.payload;
    },
    mainName: (state: any, action: PayloadAction<MainName>) => {
      state.name = action.payload;
    }
  },
});

export const { buyItem, useItem, mainImage, mainName } =
  statusSlice.actions;
export default statusSlice.reducer;
