import { Model, model } from 'mongoose';
import { UserSchema, UserInterface } from './schemas/User';
import {
  CharacterListSchema,
  CharacterListInterface,
} from './schemas/CharacterList';
// 프리티어 적용되어서 코드 불필요 개행되는 문제가 있음 -> 조치 필요
interface ModelIdInterface {
  user: string;
  characterList: string;
}

export const modelIdentifier: ModelIdInterface = {
  user: 'user',
  characterList: 'charaterlist',
};

const userModel = model<UserInterface>(modelIdentifier.user, UserSchema);
type userModelType = Model<UserInterface>;

const characterListModel = model<CharacterListInterface>(
  modelIdentifier.characterList,
  CharacterListSchema,
);
type characterListModelType = Model<CharacterListInterface>;

export { userModel, userModelType, characterListModel, characterListModelType };
