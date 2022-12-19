import { errorHandler } from './middleware/errorHandler';
import createError from 'http-errors';
import { port, mongoDBUri } from './utils/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

const logger = morgan;
import {
  indexRouter,
  userRouter,
  characterRouter,
  characterListRouter,
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

app.use('/users', userRouter);
app.use('/characters', characterRouter);
app.use('/characterlist', characterListRouter);
app.use('/', indexRouter);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // // error handler
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
