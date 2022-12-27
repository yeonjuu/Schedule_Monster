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
