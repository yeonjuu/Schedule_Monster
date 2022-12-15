import { Schema } from 'mongoose';

export interface LoginInterface {
  email: string;
  password: string;
}
export interface RegisterInterface {
  email: string;
  password: string;
  nickname: string;
}

export interface UpdateInterface {
  email: string;
  password: string;
  ori_nickname?: string;
  nickname?: string;
  ori_point?: number;
  point?: number;
}
export interface UserInterface {
  email: string;
  password: string;
  nickname: string;
  refreshToken?: string;
  auth: string;
  active: Boolean;
  point: number;
}

export const UserSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    auth: {
      type: String,
      required: true,
    },
    active: {
      type: Schema.Types.Boolean,
      required: true,
    },
    point: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'user',
  },
);
