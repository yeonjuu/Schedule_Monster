import { Router } from 'express';
import { calendarController } from '../controller';
import { asyncHandler } from '../utils';

export const calendarRouter = Router();

//  routing => /calendar
// 유저정보 확인
calendarRouter.get('/manager/:email', asyncHandler(calendarController.getCalendars));
calendarRouter.get('/:email', asyncHandler(calendarController.getCalendar));
calendarRouter.post('/', asyncHandler(calendarController.postCalendar));
calendarRouter.put('/', asyncHandler(calendarController.putCalendar));
calendarRouter.delete('/:calendarId', asyncHandler(calendarController.deleteCalendar));
calendarRouter.put('/share/:calendarId', asyncHandler(calendarController.calendarShareOrNot));
