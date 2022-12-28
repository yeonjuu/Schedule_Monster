import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'Todos',
  initialState: {
    todoList: [
      {
        calendarId :'',
        createdAt: '',
        endYYYYMM :202212,
        endYYYYMMDD:20221225,
        isCompleted: false,
        isTodo :false,
        labelColor: '',
        scheduleId: '',
        startYYYYMM: 202212,
        startYYYYMMDD : 20221226,
        title : '',
        updatedAt : '',
        startTime: 1100,
        endTime: 1200,
        __v : 1,
        _id: 'string'
      },
    ],
  },
  reducers: {
    // changeCalendar: (state, action) => {
    //   const todosArr = state.todoList.filter(
    //     (item) => item.scheduleId !== action.payload.scheduleId,
    //   );
    //   todosArr.push(action.payload.content);

    //   state.todoList = todosArr;
    // },
    // deleteCalendar: (state, action) => {
    //   const todosArr = state.todoList.filter(
    //     (item) => item.scheduleId !== action.payload,
    //   );
    //   state.todoList = todosArr;
    // },
    updateCalendar: (state,action)=>{
      state.todoList=action.payload;
    }
  },
});

export default todoSlice.reducer;
export const { updateCalendar } = todoSlice.actions;
