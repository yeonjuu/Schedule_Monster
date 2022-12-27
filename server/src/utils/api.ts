import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler } from '../types';

export const asyncHandler = (asyncHandlerArgFunc: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // application/json으로 설정하지 않으면 body에 데이터가 담기지 않은 채로 요청됨
      if ((req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') && req.headers['content-type'] !== 'application/json') {
        throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      else{
        await asyncHandlerArgFunc(req, res, next);
      }
    } catch (error) {
      next(error);
    }
  };
};
