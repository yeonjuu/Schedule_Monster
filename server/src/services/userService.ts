import { userModel, userModelType } from '../models/';

class UserService {
  private User: userModelType;

  constructor(userModel: userModelType) {
    this.User = userModel;
  }

  async getUser(uid: string) {
    return await this.User.findOne({ uid });
  }
}

const userService = new UserService(userModel);

export { userService };
