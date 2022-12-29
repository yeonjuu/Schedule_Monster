import { createSlice } from '@reduxjs/toolkit';

const mainCharacterSlice = createSlice({
  name: 'mainCharacter',
  initialState: {
    main: {
      back_default: '',

      front_default: '',

      front_shiny: '',
    },
  },

  reducers: {
    setMainCharacter: (state, action) => {
      state.main = action.payload;
    },
  },
});

export default mainCharacterSlice.reducer;
export const { setMainCharacter } = mainCharacterSlice.actions;
