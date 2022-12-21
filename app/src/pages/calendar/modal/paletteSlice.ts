import { createSlice } from '@reduxjs/toolkit';

const paletteSlice = createSlice({
  name: 'Palette',
  initialState: {
    color: '#ff0000',
  },
  reducers: {
    pickColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export default paletteSlice.reducer;
export const { pickColor } = paletteSlice.actions;
