import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainImage, MainName, SecondImage, ThirdImage, MainAffection, MainId } from './storeInterface';

const initialState = {
  name: '스몬',
  affection: 0,
  coin: 1000,
  mainImage : '/pokeball.png',
  secondImage : '/pokeball.png',
  thirdImage : '/pokeball.png',
  mainId : '',
};

//상점에서 보여지는 대표 캐릭터 상태
const statusSlice = createSlice({
  name: 'pokename',
  initialState,
  reducers: {
    buyItem: (state: any, action: PayloadAction<number>) => {
      state.coin -= action.payload;
    },
    applyItem: (state: any, action: PayloadAction<number>) => {
      state.affection += action.payload;
    },
    mainProfile: (state: any, action: PayloadAction<MainImage>) => {
      state.mainImage = action.payload;
    },
    secondProfile: (state: any, action: PayloadAction<SecondImage>) => {
      state.secondImage = action.payload;
    },
    thirdProfile: (state: any, action: PayloadAction<ThirdImage>) => {
      state.thirdImage = action.payload;
    },
    mainName: (state: any, action: PayloadAction<MainName>) => {
      state.name = action.payload;
    },
    mainAffection: (state: any, action: PayloadAction<MainAffection>) => {
      state.affection = action.payload;
    },
    characterId: (state: any, action: PayloadAction<MainId>) => {
      state.mainId= action.payload;
    }
  },
});

export const { buyItem, applyItem, mainProfile, mainName, secondProfile, thirdProfile, mainAffection, characterId } =
  statusSlice.actions;
export default statusSlice.reducer;
