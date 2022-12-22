import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    door: false,
    doorPalette: false,
  },
  reducers: {
    openModal: (state) => {
      state.door = true;
    },
    closeModal: (state) => {
      state.door = false;
    },
    togglePalette: (state) => {
      state.doorPalette = !(state.doorPalette);
    },

  },
});

export default modalSlice.reducer;
//modalSlice.reducers가 아니다. reducers=reducer+action일 뿐
export const { openModal, closeModal, togglePalette } =
  modalSlice.actions;
