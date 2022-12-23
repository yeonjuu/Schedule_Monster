import { Router } from 'express';
import { scheduleController } from '../controller';
import { asyncHandler } from '../utils';

export const scheduleRouter = Router();

//  routing => /schedule
scheduleRouter.get('/month', asyncHandler(scheduleController.getScheduleByMonth));
scheduleRouter.get('/day/:calendarId/:startDate', asyncHandler(scheduleController.getScheduleByDay));
scheduleRouter.post('/day', asyncHandler(scheduleController.postScheduleByDay));
scheduleRouter.put('/day', asyncHandler(scheduleController.updateScheduleByDay));
scheduleRouter.delete('/day/:calendarId/:scheduleId', asyncHandler(scheduleController.deleteScheduleByDay));
scheduleRouter.get('/todo/:calendarId', asyncHandler(scheduleController.getTodoByCalendarId));
scheduleRouter.get('/all/:calendarId', asyncHandler(scheduleController.getAllByCalendarId));
scheduleRouter.get('/:calendarId', asyncHandler(scheduleController.getScheduleByCalendarId));
