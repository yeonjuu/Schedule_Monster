import { userModel, userModelType } from '../models/';
import {
  UserInterface,
  LoginInterface,
  RegisterInterface,
} from '../models/schemas/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, SMTPID, SMTPPW } from '../utils/config';

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
  async createUser(userInfo: RegisterInterface) {
    const { email, password, nickname } = userInfo;
    const auth = 'user';
    const point = 0;
    const hashedPassword = await bcrypt.hash(password, 10);
    const active = true;
    const RegisterInfo = {
      email,
      password: hashedPassword,
      nickname,
      auth,
      active,
      point,
    };
    return await this.User.create(RegisterInfo);
  }

  async updateUser() {}

  async deleteUser(email: string) {
    return await this.User.remove({ email });
  }

  //계정 로그인
  async loginUser(loginInfo: LoginInterface) {
    const { email, password } = loginInfo;
    const user = await this.User.findOne({ email });
    // 계정 가입 내역 확인
    if (!user) {
      throw new Error(
        '입력하신 이메일의 가입 내역이 없습니다. 다시 한 번 확인 바랍니다',
      );
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인 바랍니다.',
      );
    }

    // 토큰 생성
    const secretKey = JWT_SECRET_KEY;
    const accessPayload = {
      email: user.email,
      auth: user.auth,
    };

    const refreshPayload = {};
    const accessToken = jwt.sign(accessPayload, secretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign(refreshPayload, secretKey, {
      expiresIn: '14d',
    });

    //DB에 refresh token 저장
    const loginUser = await this.User.findOneAndUpdate(
      { email: user.email },
      {
        refreshToken: refreshToken,
      },

      { returnOriginal: false },
    );
    return { loginUser, accessToken, refreshToken };
  }

  // 계정 로그아웃
  async logoutUser(email: string) {
    const filter = { email };
    const option = { returnOriginal: false };
    return await this.User.findOneAndUpdate(
      filter,
      { $unset: { refreshToken: '' } },
      option,
    );
  }
}

const userService = new UserService(userModel);

export { userService };
