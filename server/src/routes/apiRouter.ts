import express from 'express';
import {
  indexRouter,
  userRouter,
  characterRouter,
  characterListRouter,
  itemRouter,
  categoryRouter,
  scheduleRouter,
  userItemRouter,
  calendarRouter,
  calendarShareRouter,
  registerRouter,
} from './index';
import { loginRequired } from '../middleware/loginRequired';
export const app = express();
app.use('/users', loginRequired, userRouter);
app.use('/characters', loginRequired, characterRouter);
app.use('/characterlist', loginRequired, characterListRouter);
app.use('/items', loginRequired, itemRouter);
app.use('/category', loginRequired, categoryRouter);
app.use('/schedule', loginRequired, scheduleRouter);
app.use('/useritem', loginRequired, userItemRouter);
app.use('/calendar', loginRequired, calendarRouter);
app.use('/share', loginRequired, calendarShareRouter);
app.use('/register', registerRouter);
app.use('/', indexRouter);
