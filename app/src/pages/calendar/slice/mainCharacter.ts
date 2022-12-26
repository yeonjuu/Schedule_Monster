import { createSlice } from '@reduxjs/toolkit';

const mainCharacterSlice = createSlice({
  name: 'mainCharacter',
  initialState: {
    main:{
    _id: '63a96d5f57eef72c4dceb396',
    email: 'chaeyujin@email.com',
    myExp: 1010,
    onePick: false,
    characterId: '1',
    nameKo: '이상해씨',
    nameEn: 'Bulbasaur',
    levelupPoint: 100,
    image: {
      back_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      back_female: null,
      back_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
      back_shiny_female: null,
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      front_female: null,
      front_shiny:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
      front_shiny_female: null,
      other: {
        official_artwork: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        },
      },
      versions: {
        blackwhite: {
          animated: {
            back_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif',
            back_female: null,
            back_shiny:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/1.gif',
            back_shiny_female: null,
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',
            front_female: null,
            front_shiny:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/1.gif',
            front_shiny_female: null,
          },
        },
      },

      createdAt: '2022-12-26T09:49:40.886Z',
      updatedAt: '2022-12-26T09:55:04.800Z',
      __v: 0,
    }}
  },
  reducers: {
    setMainCharacter: (state, action) => {
      state.main=action.payload;
    },
} 
});

export default mainCharacterSlice.reducer;
export const {
    setMainCharacter
} = mainCharacterSlice.actions;
