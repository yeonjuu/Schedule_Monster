import { Model, model } from 'mongoose';
import { UserSchema, UserInterface } from './schemas/User';
import { CharacterListSchema, CharacterListInterface } from './schemas/CharacterList';
import { ScheduleInterface, ScheduleSchema } from './schemas/Schedule';

interface ModelIdInterface {
  user: string;
  characterList: string;
  schedule: string;
}

export const modelIdentifier: ModelIdInterface = {
  user: 'user',
  characterList: 'charaterlist',
  schedule: 'schedule',
};

const userModel = model<UserInterface>(modelIdentifier.user, UserSchema);
type userModelType = Model<UserInterface>;

const characterListModel = model<CharacterListInterface>(modelIdentifier.characterList, CharacterListSchema);
type characterListModelType = Model<CharacterListInterface>;

const scheduleModel = model<ScheduleInterface>(modelIdentifier.schedule, ScheduleSchema);
type scheduleModelType = Model<ScheduleInterface>;
export { userModel, userModelType, characterListModel, characterListModelType, scheduleModel, scheduleModelType };
