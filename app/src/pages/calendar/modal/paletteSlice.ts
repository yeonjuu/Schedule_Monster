import { createSlice } from '@reduxjs/toolkit';
import { MAIN_COLOR } from 'assets/styles';


const paletteSlice = createSlice({
  name: 'Palette',
  initialState: {
    color: `${MAIN_COLOR}`,
  },
  reducers: {
    pickColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export default paletteSlice.reducer;
export const { pickColor } = paletteSlice.actions;
