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
} from './index';
export const app = express();
app.use('/users', userRouter);
app.use('/characters', characterRouter);
app.use('/characterlist', characterListRouter);
app.use('/items', itemRouter);
app.use('/category', categoryRouter);
app.use('/schedule', scheduleRouter);
app.use('/useritem', userItemRouter);
app.use('/calendar', calendarRouter);
app.use('/share', calendarShareRouter);
app.use('/', indexRouter);
