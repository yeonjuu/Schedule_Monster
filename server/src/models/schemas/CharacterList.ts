import { Schema } from 'mongoose';

// 인터페이스
export interface CharacterListInterface {
  email: string;
  characterList: object;
}

// 스키마
export const CharacterListSchema = new Schema<CharacterListInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    characterList: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'characterlist',
  },
);
