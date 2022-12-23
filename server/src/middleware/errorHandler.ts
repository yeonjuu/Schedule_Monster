import { ErrorRequestHandler } from 'express';
import { errorResponse } from '../utils/errorResponse';
import { splitedError } from '../utils/splitedArr';
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!err.message) {
    // app.ts파일의 404페이지 에러일 경우
    console.log('app.ts에서 오류나는 상황');
    const { errType, errMessage } = splitedError(err);
    errorResponse(res, errType, errMessage);
  } else {
    console.log('일반오류');
    if (err.message.slice(0, 4) === 'type') {
      const { errType, errMessage } = splitedError(err.message);
      errorResponse(res, errType, errMessage);
    } else {
      errorResponse(res, 'BadRequest', err.message);
    }
  }
};
