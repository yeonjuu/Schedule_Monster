import { errorHandler } from './middleware/errorHandler';
import createError from 'http-errors';
import { port, mongoDBUri } from './utils/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
const logger = morgan;

import {
  indexRouter,
  userRouter,
  characterRouter,
  characterListRouter,
  itemRouter,
  categoryRouter,
  scheduleRouter,
} from './routes/index';

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(mongoDBUri);
mongoose.connection.on('connected', () => {
  console.log(`Successfully connected to MongoDB: ${mongoDBUri}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', userRouter);
app.use('/characters', characterRouter);
app.use('/characterlist', characterListRouter);
app.use('/items', itemRouter);
app.use('/category', categoryRouter);
app.use('/schedule', scheduleRouter);
app.use('/', indexRouter);

app.use('*', function (req, res, next) {
  next('type:NotFound,message:요청하신 페이지는 존재하지 않습니다');
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
