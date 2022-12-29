import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IAdmin } from '../../types/userInterface';

const initialState = {
  nickname: '',
  email: '',
  point: 0,
  isLogin: false,
  auth: '',
  calendarList: [{
    calendarId: "",
    calendarName: "",
   
    email: "",
    share: true,
   
    url: null,
    __v: 0,
    _id: "",
  }
  ],
  calendarId: '',
  mainChar: {
    front_default: '',
    front_shiny: '',
    back_default: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.point = action.payload.point;
      state.auth = action.payload.auth;
      state.calendarId = action.payload.calendarId;
      state.isLogin = true;
    },
    logout: (state) => {
      state.nickname = '';
      state.email = '';
      state.point = 0;
      state.auth = '';
      state.calendarId='';
      state.calendarList=[];
      state.isLogin = false;
      state.mainChar={
    
        front_default: '',
        front_shiny: '',
        back_default: '',
      };
    },
    addPoint: (state, action: PayloadAction<number>) => {
      state.point += action.payload;
    },
    minusPoint: (state, action: PayloadAction<number>) => {
      state.point -= action.payload;
    },
    changeNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    changeCalendarId: (state, action: PayloadAction<string>) => {
      state.calendarId = action.payload;
    },
    postCalendarList: (state, action) => {
      state.calendarList = action.payload;
    },
    adminlogin: (state, action: PayloadAction<IAdmin>) => {
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.point = 9999999;
      state.auth = action.payload.auth;
      state.isLogin = true;
    },
    setMainCharacter: (state,action)=>{
      state.mainChar=action.payload;
    } 
  },
});

export const {
  login,
  logout,
  addPoint,
  minusPoint,
  changeNickname,
  changeCalendarId,
  postCalendarList,
  adminlogin,
  setMainCharacter,
} = userSlice.actions;
export default userSlice.reducer;
