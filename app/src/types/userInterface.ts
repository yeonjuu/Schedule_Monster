export interface IUser {
  nickname: string;
  email: string;
  point: number;
  auth: string;
  calendarId: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAdmin {
  nickname: string;
  email: string;
  password: string;
  auth: string;
}
