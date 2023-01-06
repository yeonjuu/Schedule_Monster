import { Router } from 'express';
import { calendarShareController } from '../controller';
import { asyncHandler } from '../utils';

export const calendarShareRouter = Router();

//  routing => /share
calendarShareRouter.get('/:calendarId', asyncHandler(calendarShareController.getCalendarShare));
calendarShareRouter.post('/', asyncHandler(calendarShareController.postCalendarShare));
calendarShareRouter.delete('/:calendarId/:friendEmail', asyncHandler(calendarShareController.deleteCalendarShare));
