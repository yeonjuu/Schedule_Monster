import { Request, Response, NextFunction } from 'express';
import { AsyncRequestHandler } from '../types';

export const asyncHandler = (asyncHandlerArgFunc: AsyncRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.method !== 'GET' && req.headers['content-type'] === 'application/json') {
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
