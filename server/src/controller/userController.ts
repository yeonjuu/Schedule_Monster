import { userService } from '../services';
import { AsyncRequestHandler } from '../types';

interface userControllerInterface {
  getUsers: AsyncRequestHandler;
  postUser: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
  async getUsers(req, res) {
    const uid = req.body.uid;
    const users = await userService.getUsers();
    res.json(users);
  },
  async postUser(req, res) {
    const user = await userService.createUser(req.body);
    res.json(user);
  },
};
