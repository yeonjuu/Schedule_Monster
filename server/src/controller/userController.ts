import { userService } from '../services';
import { AsyncRequestHandler } from '../types';

interface userControllerInterface {
  getUser: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
  async getUser(req, res) {
    const uid = req.body.uid;
    const users = await userService.getUser(uid);
    res.json({ users });
  },
};
