import { Schema } from 'mongoose';

export interface LoginInterface {
  uid: string;
  password: string;
}

export interface UserInterface {
  uid: string;
  email: string;
  password: string;
  refreshToken?: string;
  auth?: string;
}

export const UserSchema = new Schema<UserInterface>(
  {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: false,
    },

    auth: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'user',
  },
);
