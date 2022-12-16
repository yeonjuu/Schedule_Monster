import { Schema, SchemaType } from 'mongoose';

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
  characterlist: Array<object>;
}

export interface CharaterListInterface {
  email: string;
  id: number;
  level: number;
  exp: number;
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
    characterlist: [
      {
        id: Number,
        level: Number,
        exp: Number,
      },
    ],
  },
  {
    timestamps: true,
    collection: 'user',
  },
);
