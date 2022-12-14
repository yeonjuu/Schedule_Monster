import { ErrorRequestHandler } from 'express';
import { errorResponse } from '../utils/errorResponse';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  errorResponse(res, 'BADREQUEST', err.message);
};
