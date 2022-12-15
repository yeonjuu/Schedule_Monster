import { userService } from '../services';
import { AsyncRequestHandler } from '../types';
interface userControllerInterface {
  getUsers: AsyncRequestHandler;
  getUser: AsyncRequestHandler;
  postUser: AsyncRequestHandler;
  updateUser: AsyncRequestHandler;
  deleteUser: AsyncRequestHandler;
  loginUser: AsyncRequestHandler;
  logoutUser: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
  // 전체 사용자 정보 조회
  async getUsers(req, res) {
    const users = await userService.getUsers();
    res.json(users);
  },
  // 사용자 정보 조회
  async getUser(req, res) {
    const email = req.body.email;
    const user = await userService.getUser(email);
    res.json(user);
  },
  // 계정 생성
  async postUser(req, res) {
    const user = await userService.createUser(req.body);
    res.json(user);
  },
  // 계정 정보 수정
  async updateUser(req, res) {
    const updateInfo = req.body;
    const updateResult = await userService.updateUser(updateInfo);
    res.json(updateResult);
  },
  // 계정 삭제
  async deleteUser(req, res) {
    const email = req.body.email;
    const deleteInfo = await userService.deleteUser(email);
    res.json(deleteInfo);
  },
  //로그인
  async loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const loginResult = await userService.loginUser({ email, password });
    res.json(loginResult);
  },
  //로그아웃
  async logoutUser(req, res) {
    const email = req.body.email;
    const logoutResult = await userService.logoutUser(email);
    res.json(logoutResult);
  },
};
