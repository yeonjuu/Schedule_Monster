import { Schema } from 'mongoose';

// 인터페이스
export interface CharacterListInterface {
  email: string;
  myExp: number;
  onePick?: boolean;
  characterId: string;
  nameKo: string;
  nameEn: string;
  levelupPoint?: number;
  image: object;
}
export interface UpdateCharacterListInterface {
  _id: string;
  email?: string;
  myExp?: number;
  onePick?: boolean;
  characterId?: string;
  nameKo?: string;
  nameEn?: string;
  levelupPoint?: number;
  image?: object;
}
// 스키마
export const CharacterListSchema = new Schema<CharacterListInterface>(
{
    email: {
        type: String,
        required: true,
    },
    myExp: {
        type: Number,
        required: true,
    },
    onePick:{
        type: Boolean,
        required: false,
    },
    characterId: {
        type: String,
        required: true,
    },
    nameKo: {
        type: String,
        required: true,
    },
    nameEn: {
        type: String,
        required: true,
    },
    levelupPoint: {
        type: Number,
        required: false,
    },
    image: {
        type: Object,
        required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'characterlist',
  },
);
