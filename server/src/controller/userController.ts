import { userService } from '../services';
import { AsyncRequestHandler } from '../types';
import { errorResponse } from '../utils';
interface userControllerInterface {
  getUsers: AsyncRequestHandler;
  getUser: AsyncRequestHandler;
  postUser: AsyncRequestHandler;
  updateUser: AsyncRequestHandler;
  deleteUser: AsyncRequestHandler;
  loginUser: AsyncRequestHandler;
  logoutUser: AsyncRequestHandler;
  postManager: AsyncRequestHandler;
  authEmail: AsyncRequestHandler;
  resetPassword: AsyncRequestHandler;
  checkNickname: AsyncRequestHandler;
  checkPassword: AsyncRequestHandler;
  expandAccToken: AsyncRequestHandler;
}

export const userController: userControllerInterface = {
  // 전체 사용자 정보 조회
  async getUsers(req, res) {
    const { email } = req.params;
    const users = await userService.getUsers(email);
    res.json(users);
  },
  // 사용자 정보 조회
  async getUser(req, res) {
    const { email } = req.params;
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
    const { email } = req.params;
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
  async postManager(req, res) {
    const user = await userService.postManager(req.body);
    res.json(user);
  },

  async authEmail(req, res) {
    const { email } = req.params;
    const result = await userService.authEmail(email);
    res.json(result);
  },
  async resetPassword(req, res) {
    const { email } = req.params;
    const result = await userService.resetPassword(email);
    res.json(result);
  },
  async checkNickname(req, res) {
    const { nickname } = req.params;
    const result = await userService.checkNickname(nickname);
    res.json(result);
  },
  async checkPassword(req, res) {
    const { email, password } = req.body;
    const result = await userService.checkPassword(email, password);
    res.json(result);
  },
  async expandAccToken(req, res) {
    const Token = req.headers.authorization?.split(' ')[1];
    const { email } = req.body;
    if (!Token) {
      errorResponse(res, 'BadRequest', '토큰이 전달되지 않았습니다');
    } else {
      const accToken = await userService.expandAccToken(Token, email);
      res.json(accToken);
    }
  },
};
