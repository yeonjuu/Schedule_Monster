import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mainMonster } from 'types/calendarTypes';

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
    setMainCharacter: (state, action:PayloadAction<mainMonster> ) => {
      state.main = action.payload;
    },
  },
});

export default mainCharacterSlice.reducer;
export const { setMainCharacter } = mainCharacterSlice.actions;
