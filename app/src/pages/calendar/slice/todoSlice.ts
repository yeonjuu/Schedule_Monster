import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'Todos',
  initialState: {
    todoList:[
        {
            _id: "63a6afe80c5105ab4f53d68d",
            calendarId: "test1",
            scheduleId: "DjQl046OEU",
            startDate: "20221224T01:00:00.000Z",
            endDate: "20221231T01:00:00.000Z",
            title: "aaaa",
            labelColor: "#7bdcb5",
            isTodo: false,
            createdAt: "2022-12-24T07:53:12.420Z",
            updatedAt: "2022-12-24T07:53:12.420Z",
            __v: 0
        },
        {
            _id: "63a6b0890c5105ab4f53d697",
            calendarId: "test1",
            scheduleId: "jA16hiuIhI",
            startDate: "20221227T00:30:00.000Z",
            endDate: "20221231T01:00:00.000Z",
            title: "ㄴㅇㄵㄷㅇㄿㄱㅀㅇㅀㅇㅀㅇㅀㅇㄹ",
            labelColor: "#abb8c3",
            isTodo: false,
            createdAt: "2022-12-24T07:55:53.523Z",
            updatedAt: "2022-12-24T07:55:53.523Z",
            __v: 0
        },
        {
            _id: "63a542a78e69288ae646c861",
            calendarId: "test1",
            scheduleId: "4qeUkkIiDR",
            startDate: "20221203T00:00:00.000Z",
            endDate: "20221203T00:00:00.000Z",
            title: "ss",
            labelColor: "#A2BCFE",
            isTodo: true,
            createdAt: "2022-12-23T05:54:47.849Z",
            updatedAt: "2022-12-23T05:54:47.849Z",
            __v: 0
        },
        {
            _id: "63a5554f8e69288ae646c893",
            calendarId: "test1",
            scheduleId: "V3KueOlNlD",
            startDate: "20221203T00:30:00.000Z",
            endDate: "20221210T03:30:00.000Z",
            title: "sss",
            labelColor: "#A2BCFE",
            isTodo: false,
            createdAt: "2022-12-23T07:14:23.532Z",
            updatedAt: "2022-12-23T07:14:23.532Z",
            __v: 0
        },
        {
            _id: "63a542fb8e69288ae646c865",
            calendarId: "test1",
            scheduleId: "hYH4IcHLiT",
            startDate: "20221223T00:00:00.000Z",
            endDate: "20221223T00:00:00.000Z",
            title: "테스트입니다",
            labelColor: "#A2BCFE",
            isTodo: true,
            createdAt: "2022-12-23T05:56:11.133Z",
            updatedAt: "2022-12-23T05:56:11.133Z",
            __v: 0
        },
        {
            _id: "63a6b0210c5105ab4f53d690",
            calendarId: "test1",
            scheduleId: "3SNvIbwhhH",
            startDate: "20221229T00:00:00.000Z",
            endDate: "20221230T23:30:00.000Z",
            title: "오늘은무엇을할까요어느덧12월도다가네요",
            labelColor: "#A2BCFE",
            isTodo: false,
            createdAt: "2022-12-24T07:54:09.199Z",
            updatedAt: "2022-12-24T07:54:09.199Z",
            __v: 0
        }
    ]
  },
  reducers: {
    changeCalendar: (state, action) => {
      state.todoList = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { changeCalendar } = todoSlice.actions;
