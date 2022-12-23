import { Response } from 'express';

export const errorResponse = (res: Response, type: string, message: string) => {
  let statusCode: number;
  if (type == 'Forbidden') statusCode = 403;
  else if (type == 'NotFound') statusCode = 404;
  else if (type == 'BadRequest') statusCode = 400;
  else if (type == 'Internal Server Error') statusCode = 500;
  else statusCode = 444;

  return res.status(statusCode).json({ type, message });
};
