import { userModel, userModelType } from '../models/';
import { UserInterface } from '../models/schemas/User';
class UserService {
  private User: userModelType;

  constructor(userModel: userModelType) {
    this.User = userModel;
  }

  async getUser(uid: string) {
    return await this.User.findOne({ uid });
  }
  async getUsers() {
    return await this.User.find({});
  }
  async createUser(userInfo: UserInterface) {
    const { uid, email, password } = userInfo;
    const Info = {
      uid,
      email,
      password,
    };
    return await this.User.create(Info);
  }
}

const userService = new UserService(userModel);

export { userService };
