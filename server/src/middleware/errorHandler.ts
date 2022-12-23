import { ErrorRequestHandler } from 'express';
import { errorResponse } from '../utils/errorResponse';
import { splitedError } from '../utils/splitedArr';
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err.message) {
    // app.ts파일의 404페이지 에러일 경우
    const { errType, errMessage } = splitedError(err);
    errorResponse(res, errType, errMessage);
  } else {
    const { errType, errMessage } = splitedError(err.message);
    errorResponse(res, errType, errMessage);
  }
};
