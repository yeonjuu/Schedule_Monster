import { Response } from 'express';

export const errorResponse = (res: Response, type: string, message: string) => {
  let statusCode: number;
  // Forbidden 클라우드에서 자체적인 403에러처리를 진행함
  // 의도한 오류가 호출이 안되어 401(unAuthorized code)로 변경
  if (type == 'Forbidden') statusCode = 401;
  else if (type == 'NotFound') statusCode = 404;
  else if (type == 'BadRequest') statusCode = 400;
  else if (type == 'Internal Server Error') statusCode = 500;
  else statusCode = 444;

  return res.status(statusCode).json({ type, message });
};
