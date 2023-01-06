import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    door: false,
    doorPalette: false,
    doorTodo: false,
    doorSchedule: false,
    doorHow: false,
  },
  reducers: {
    openModal: (state) => {
      state.door = true;
    },
    closeModal: (state) => {
      state.door = false;
    },
    togglePalette: (state) => {
      state.doorPalette = !state.doorPalette;
    },
    openTodo: (state) => {
      state.doorTodo = true;
    },
    closeTodo: (state) => {
      state.doorTodo = false;
    },
    toggleSchedule: (state) => {
      state.doorSchedule = !state.doorSchedule;
    },
    toggleHow: (state) => {
      state.doorHow = !state.doorHow;
    },
  },
});

export default modalSlice.reducer;
//modalSlice.reducers가 아니다. reducers=reducer+action일 뿐
export const {
  openModal,
  closeModal,
  togglePalette,
  openTodo,
  toggleSchedule,
  closeTodo,
  toggleHow,
} = modalSlice.actions;
