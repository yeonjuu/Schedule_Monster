import { createSlice } from '@reduxjs/toolkit';

const mainCharacterSlice = createSlice({
  name: 'mainCharacter',
  initialState: {
    main:{
     
            back_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/149.gif',
            
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/149.gif',
           
            front_shiny:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/149.gif',
     
          },
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
