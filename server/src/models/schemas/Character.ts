import { Schema, model, Model } from 'mongoose';

// 인터페이스
export interface CharacterInterface {
  // uid: string;
    characterId: string;
    nameKo: string;
    nameEn: string;
    levelupPoint: number;
    image: object;
}
export interface UpdateCharacterInterface {
    characterId: string;
    nameKo?: string;
    nameEn?: string;
    levelupPoint?: object;
    image?: object;
}

// 스키마
export const characterSchema = new Schema<CharacterInterface>(
  {
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
      required: true,
    },
    image: {
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
