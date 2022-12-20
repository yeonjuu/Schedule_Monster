import { Schema, model, Model } from 'mongoose';

// 인터페이스
export interface CharacterInterface {
  // uid: string;
  characterName: string;
  levelupPoint: object;
  images: object;
}
export interface UpdateCharacterInterface {
    _id: string;
    characterName?: string;
    levelupPoint?: object;
    images?: object;
}

// 스키마
export const characterSchema = new Schema<CharacterInterface>(
  {
    // uid: {
    //   type: String,
    //   required: true,
    // },
    characterName: {
      type: String,
      required: true,
    },
    levelupPoint: {
      type: Object,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'character',
  },
);

// 모델
export interface characterModelType extends Model<CharacterInterface> {}
export const characterModel = model<CharacterInterface, characterModelType>('Character', characterSchema);
