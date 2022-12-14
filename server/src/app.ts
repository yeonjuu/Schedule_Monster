import { NextFunction } from 'express';
import { errorHandler } from './middleware/errorHandler';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const logger = morgan;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');

const app = express();

/* eslint-disable no-console */

const port = process.env.PORT || '3000';

/**
 * Normalize a port into a number, string, or false.
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use('*', function (req: Request, res: Response, next: NextFunction) {
//   next(createError(404));
// });

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
