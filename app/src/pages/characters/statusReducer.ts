import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from './storeInterface';

const initialState = {
  name: '',
  affection: 100,
  coin: 1000,
  mainImage : 'https://art.pixilart.com/5e6de2826be33b3.png',
};

//상점에서 보여지는 대표 캐릭터 상태
const statusSlice = createSlice({
  name: 'pokename',
  initialState,
  reducers: {
    buyItem: (state:any, action: PayloadAction<number>) => {
      state.coin -= action.payload;
    },
    useItem: (state:any, action: PayloadAction<number>) => {
      state.affection += action.payload;
    },
    chooseMain: (state: any, action: PayloadAction<Image>) => {
      state.mainImage = action.payload.mainImage;
    },
  },
});

export const { buyItem, useItem, chooseMain } =
  statusSlice.actions;
export default statusSlice.reducer;
