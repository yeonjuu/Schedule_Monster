import { createSlice } from '@reduxjs/toolkit';

const itemCategoryList = createSlice({
  name: 'itemCategories',
  initialState: [
    {
      categoryId: '먹이',
      categoryName: '먹이',
    },
    {
      categoryId: '알',
      categoryName: '알',
    },
  ],
  reducers: {},
});

const itemList = createSlice({
  name: 'items',
  initialState: [
    {
      itemId: 'a58',
      itemName: '사과',
      price: 100,
      exp: 10,
      category: '먹이',
      info: '팻의 애정도를 10 증가시킵니다',
    },
    {
      itemId: 'b4578',
      itemName: '바나나',
      price: 200,
      exp: 20,
      category: '먹이',
      info: '팻의 애정도를 20 증가시킵니다',
    },
    {
      itemId: 'c48786',
      itemName: '수박',
      price: 300,
      exp: 30,
      category: '먹이',
      info: '팻의 애정도를 30 증가시킵니다',
    },
    {
      itemId: 'bs7846',
      itemName: '기본알',
      price: 300,
      exp: 30,
      category: '알',
      info: '랜덤 포켓몬을 얻습니다',
    },
  ],
  reducers: {
    changeItem(state, action) {
      const data = action.payload;
      const idx = state.findIndex((a) => {
        return a.itemId === data.itemId;
      });
      if (!idx) {
        return;
      }
      state[idx].itemName = data.itemName;
      state[idx].price = data.price;
      state[idx].exp = data.exp;
      state[idx].category = data.category;
      state[idx].info = data.info;
    },
  },
});
const monsterCategoryList = createSlice({
  name: 'monsterCategory',
  initialState: [{}],
  reducers: {},
});
const monsterList = createSlice({
  name: 'monster',
  initialState: [
    {
      characterId: '1',
      characterName: '피카츄',
      point: {
        lv1: 0,
        lv2: 100,
        lv3: 200,
      },
      image: {
        image1:
          'http://play.pokemonshowdown.com/sprites/xyani/pikachu-cosplay.gif',
        image2: '',
      },
    },
    {
      characterId: '2',
      characterName: '라이츄',
      point: {
        lv1: 0,
        lv2: 100,
        lv3: 200,
      },
      image: {
        image1: 'https://www.serebii.net/pokedex-swsh/icon/026.png',
        image2: '',
      },
    },
    {
      characterId: '3',
      characterName: '파이리',
      point: {
        lv1: 0,
        lv2: 100,
        lv3: 200,
      },
      image: {
        image1:
          'https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados/charmander.gif',
        image2: '',
      },
    },
    {
      characterId: '4',
      characterName: '꼬부기',
      point: {
        lv1: 0,
        lv2: 100,
        lv3: 200,
      },
      image: {
        image1:
          'https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados/squirtle.gif',
        image2: '',
      },
    },
  ],
  reducers: {},
});
export const { changeItem } = itemList.actions;

export const items = itemList.reducer;
export const itemCategories = itemCategoryList.reducer;
export const monsterCategories = monsterCategoryList.reducer;
export const monsters = monsterList.reducer;
