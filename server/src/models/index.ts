import { Model, model } from 'mongoose';
import { UserSchema, UserInterface } from './schemas/User';

interface ModelIdInterface {
  user: string;
}

export const modelIdentifier: ModelIdInterface = {
  user: 'user',
};

const userModel = model<UserInterface>(modelIdentifier.user, UserSchema);

type userModelType = Model<UserInterface>;

export { userModel, userModelType };
