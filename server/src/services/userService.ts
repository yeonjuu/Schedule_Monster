import { userModel, userModelType } from '../models/';
import { LoginInterface, RegisterInterface, UpdateInterface, CharaterListInterface } from '../models/schemas/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../utils/config';
import { generateRandomString } from '../utils/generateRandomString';
import nodemailer from 'nodemailer';
import { calendarService } from './calendarService';
class UserService {
  private User: userModelType;
  constructor(userModel: userModelType) {
    this.User = userModel;
  }

  async getUser(email: string) {
    const user = await this.User.findOne({ email });
    if (!user)
      throw new Error('type:Forbidden,content:입력하신 이메일의 가입 내역이 없습니다. 다시 한 번 확인 바랍니다');
    return user;
  }
  // 관리자용 전체 사용자 조회
  async getUsers(email: string) {
    const user = await this.User.findOne({ email });
    if (!user)
      throw new Error('type:Forbidden,content:입력하신 이메일의 가입 내역이 없습니다. 다시 한 번 확인 바랍니다');
    const { auth } = user;
    if (auth !== 'manager') throw new Error('type:Forbidden,content:해당 요청에 대한 접근 권한이 존재하지 않습니다.');
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
    //캐릭터리스트 초기
    // await characterListService.createCharacterList(email);
    const calendar = await calendarService.postCalendar(email, '캘린더0');
    if (!calendar)
      throw new Error('type:Internal Server Error,content:서버 내부 오류가 발생했습니다 잠시후 다시 진행해주세요');
    const { calendarId } = calendar;

    const result = await this.User.create(RegisterInfo);
    return { ...result.toObject(), calendarId };
  }

  async updateUser(updateInfo: UpdateInterface) {
    const { email, password, nickname, point } = updateInfo;
    const user = await this.User.findOne({ email });
    if (!user) throw new Error('type:Forbidden,content:비정상적인 요청으로 확인되어 해당 요청을 차단합니다.');

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
    if (!isPasswordCorrect)
      throw new Error('type:Forbidden,content:비정상적인 요청으로 확인되어 해당 요청을 차단합니다.');

    const updateData = {
      ...(nickname && { nickname }),
      ...(point && { point }),
    };
    const updatedUser = await this.User.findOneAndUpdate(
      { email: user.email },
      { ...updateData },
      { returnOriginal: false },
    );
    return updatedUser;
  }

  async deleteUser(email: string) {
    return await this.User.remove({ email });
  }

  //계정 로그인
  async loginUser(loginInfo: LoginInterface) {
    const { email, password } = loginInfo;
    const user = await this.User.findOne({ email });
    // 계정 가입 내역 확인
    if (!user)
      throw new Error('type:Forbidden,content:입력하신 이메일의 가입 내역이 없습니다. 다시 한 번 확인 바랍니다');

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect)
      throw new Error('type:Forbidden,content:비밀번호가 일치하지 않습니다. 다시 한 번 확인 바랍니다.');

    // 토큰 생성
    const secretKey = JWT_SECRET_KEY;
    const accessPayload = {
      email: user.email,
      auth: user.auth,
    };

    const refreshPayload = {};
    const accessToken = jwt.sign(accessPayload, secretKey, { expiresIn: '1d' });
    const refreshToken = jwt.sign(refreshPayload, secretKey, {
      expiresIn: '30d',
    });
    const { exp: accessExpMS } = jwt.decode(accessToken) as {
      exp: number;
    };
    const { exp: refreshExpMS } = jwt.decode(refreshToken) as {
      exp: number;
    };

    const accessExp = accessExpMS * 1000;
    const refreshExp = refreshExpMS * 1000;
    console.log(new Date(accessExp).toLocaleString(), new Date(refreshExp).toLocaleString());
    //DB에 refresh token 저장
    const loginUser = await this.User.findOneAndUpdate(
      { email: user.email },
      {
        refreshToken: refreshToken,
      },

      { returnOriginal: false },
    );
    return { loginUser, accessToken, accessExp, refreshExp };
  }

  // 계정 로그아웃
  async logoutUser(email: string) {
    const filter = { email };
    const option = { returnOriginal: false };
    return await this.User.findOneAndUpdate(filter, { $unset: { refreshToken: '' } }, option);
  }

  async addCharater(characterData: CharaterListInterface) {
    const { email, id, level, exp } = characterData;

    if (!(email && id && level && exp))
      throw new Error('type:BadRequest,content:요청이 정상적으로 수신되지 않아 추가할 수 없습니다.');

    const user = await this.User.findOne({ email });
    if (!user) throw new Error('type:BadRequest,content:요청이 정상적으로 수신되지 않아 추가할 수 없습니다.');

    const filter = { email };

    let charaterList: Array<object> = [];
    const charaterSet = {
      id,
      level,
      exp,
    };
    charaterList.push(charaterSet);
    await this.User.findOneAndUpdate(filter, {
      $push: { characterlist: charaterList },
    });
    const result = await this.User.findOne({ email });
    return result;
  }

  async postManager(userInfo: RegisterInterface) {
    const { email, password, nickname } = userInfo;
    const auth = 'manager';
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

  // 이메일 인증
  async authEmail(email: string) {
    const userEmailValidation = await this.User.findOne({ email: email });
    if (userEmailValidation) {
      throw new Error('type:Forbidden,content:이 이메일은 사용중입니다. 다른 이메일을 입력해 주세요');
    }
    const SMTPID = process.env.SMTPID;
    const SMTPPW = process.env.SMTPPW;
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTPID,
        pass: SMTPPW,
      },
    });

    const authNum = generateRandomString(10);
    const mailOptions = {
      from: `ScheduleMonster<${SMTPID}>`,
      to: email,
      subject: '[ScheduleMonster]이메일 인증 요청',
      text: '다음 숫자 6자리를 이메인 인증 칸란에 기입해주시기 바랍니다. : ' + authNum,
    };

    const status = await smtpTransport.sendMail(mailOptions);
    const result = { ...status, authNum };
    return result;
  }
  async resetPassword(email: string) {
    const user = await this.User.findOne({ email: email });
    const SMTPID = process.env.SMTPID;
    const SMTPPW = process.env.SMTPPW;

    if (!user) {
      throw new Error('type:Forbidden,content:입력하신 정보의 계정은 존재하지 않습니다');
    } else {
      const authNum = generateRandomString(10);
      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: SMTPID, // 네이버이메일
          pass: SMTPPW, // 네이버비밀번호
        },
      });

      const mailOptions = {
        from: `ScheduleMonster<${process.env.SMTPID}>`,
        to: email,
        subject: '[ScheduleMonster] 비밀번호 초기화 안내 ',
        text:
          '요청하신대로 비밀번호를 초기화 하였습니다. 다음의 문자를 입력하셔서 로그인 하신 후 비밀번호를 변경해주시기 바랍니다 : ' +
          authNum,
      };

      try {
        await smtpTransport.sendMail(mailOptions);
      } catch (err) {
        throw new Error('type:Forbidden,content:비밀번호 초기화 메일전송에 실패하였습니다');
      }

      try {
        const password = await bcrypt.hash(authNum, 10);
        await this.User.findOneAndUpdate(
          { email: user.email },
          {
            password,
          },
          { returnOriginal: false },
        );
      } catch (err) {
        throw new Error('type:Forbidden,content:비밀번호 초기화 및 인증메일 전송에 실패하였습니다.');
      }
      return {
        status: 'OK',
        message: '비밀번호 초기화 후 메일전송을 완료하였습니다.',
      };
    }
  }
  async checkNickname(nickname: string) {
    if (!nickname) throw new Error('type:BadRequest,content:요청에 필요한 데이터 수신이 안 됩니다.');
    const result = await this.User.findOne({ nickname });
    return !result; // 존재하면 False, 없으면 True
  }
  // 다른 서비스에서 관리자 권한을 확인하기 위한 용도
  async checkAuth(email: string) {
    const user = await this.User.findOne({ email });
    if (!user) {
      return false;
    }
    const { auth } = user;
    if (auth === 'manager') return true;
    else false;
  }

  async checkPassword(email: string, password: string) {
    const user = await this.User.findOne({ email });
    if (!user) throw new Error('type:Forbidden,content:요청하신 정보를 찾을 수 없습니다');

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

    if (!isPasswordCorrect) return false;
    else return true;
  }
  async expandAccToken(token: string, email: string) {
    console.log('expandAccToken 함수 진입');
    try {
      const secretKey = JWT_SECRET_KEY;
      if (!token || !secretKey) throw new Error('type:BadRequest,content:요청 중에 전달된 데이터를 찾을 수 없습니다');
      jwt.verify(token, secretKey);
      const { exp: tokenExp } = jwt.decode(token) as {
        exp: number;
      };
      return { token, tokenExp };
    } catch (error) {
      // error type일 경우에만 에러처리
      if (error instanceof Error) {
        if (error.message === 'jwt expired') {
          const user = await this.User.findOne({ email });
          if (!user)
            throw new Error('type:Forbidden,content:입력하신 이메일의 가입 내역이 없습니다. 다시 한 번 확인 바랍니다');
          if (!user.refreshToken) throw new Error('type:Forbidden,content:리프레시 토큰이 존재하지 않습니다');
          else {
            const { exp: refreshExpMS } = jwt.decode(user.refreshToken) as {
              exp: number;
            };

            const dateDiff = refreshExpMS * 1000 - Date.now();
            console.log('리프레시 토큰 만료날짜가 ', new Date(refreshExpMS * 1000).toLocaleString());
            console.log(refreshExpMS, dateDiff);
            if (dateDiff >= 0) {
              const secretKey = process.env.JWT_SECRET_KEY;
              const accessPayload = {
                email: user.email,
                auth: user.auth,
              };
              if (!secretKey) throw new Error('type:BadRequest,content:요청 중에 전달된 데이터를 찾을 수 없습니다');

              const accessToken = jwt.sign(accessPayload, secretKey, { expiresIn: '1d' });
              const { exp: accessExpMS } = jwt.decode(accessToken) as {
                exp: number;
              };
              const accessExp = accessExpMS * 1000;

              return { accessToken, accessExp };
            } else {
              throw new Error('type:Forbidden,content:refresh토큰이 만료되었습니다');
            }
          }
        } else if (error.message === 'invalid token') {
          throw new Error('type:Forbidden,content:유효하지 않은 토큰입니다');
        } else {
          throw new Error('type:Forbidden,content:유효하지 않은 토큰입니다');
        }
      } else {
        throw new Error('type:BadRequest,content:토큰을 확인 하는 중에 비정상적인 오류가 발생했습니다.');
      }
    }
  }
  async expandRefToken(email: string) {
    const secretKey = JWT_SECRET_KEY;
    const refreshPayload = {};
    const refreshToken = jwt.sign(refreshPayload, secretKey, {
      expiresIn: '30d',
    });

    const { exp: refreshExpMS } = jwt.decode(refreshToken) as {
      exp: number;
    };

    const refreshExp = refreshExpMS * 1000;
    const updateUser = await this.User.findOneAndUpdate(
      { email },
      {
        refreshToken: refreshToken,
      },

      { returnOriginal: false },
    );

    return { updateUser, refreshExp };
  }
}
const userService = new UserService(userModel);

export { userService };
