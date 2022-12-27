import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils';
import { userService } from '../services/userService';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../../.env' });

export async function loginRequired(req: Request, res: Response, next: NextFunction) {
  // 토큰 타입 acc, ref로 토큰 분류
  const Token = req.headers.authorization?.split(' ')[1];

  if (!Token || Token === 'null') {
    return errorResponse(res, 'Forbidden', '로그인한 유저만 사용할 수 있는 서비스입니다.');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!Token || !secretKey) {
      return errorResponse(res, 'Forbidden', '토큰을 읽는데 실패하였습니다. 관리자에게 요청하세요');
    }
    const jwtDecoded = jwt.verify(Token, secretKey);
    const email = (<{ email: string }>jwtDecoded).email;
    const auth = (<{ auth: string }>jwtDecoded).auth;
    req.body.email = email;
    req.body.auth = auth;
    const user = await userService.getUser(email);
    if (!user) return errorResponse(res, 'Forbidden', '이메일과 일치하는 정보가 존재하지 않습니다');
    const { refreshToken } = user;
    if (!refreshToken) return errorResponse(res, 'Forbidden', '리프레시 토큰이 존재하지 않습니다');
    const { exp: tokenExpMS } = jwt.decode(refreshToken) as {
      exp: number;
    };
    const tokenExp = tokenExpMS * 1000;
    const now = Date.now();
    const diff = tokenExp - now;
    const marginTime = 3 * 24 * 60 * 60 * 1000; // 3days 만료기간 3일 전에는 파악해서 갱신을 진행
    if (diff < marginTime) {
      // 리프레시 토큰이 만료된 경우
      const result = await userService.expandRefToken(email);
      res.status(414).json(result); // 상태코드를 통해서 리프레시 토큰이 갱신되었음을 확인
      return;
    }
    next();
  } catch (error) {
    // error type일 경우에만 에러처리
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        return errorResponse(res, 'BadRequest', '토큰이 만료되었습니다');
      } else if (error.message === 'invalid token') {
        return errorResponse(res, 'BadRequest', '유효하지 않은 토큰입니다');
      } else {
        return errorResponse(res, 'BadRequest', '유효하지 않은 토큰입니다');
      }
    } else {
      return errorResponse(res, 'BadRequest', '토큰을 확인 하는 중에 비정상적인 오류가 발생했습니다.');
    }
  }
}
