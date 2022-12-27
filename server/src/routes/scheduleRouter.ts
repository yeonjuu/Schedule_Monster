import { Router } from 'express';
import { scheduleController } from '../controller';
import { asyncHandler } from '../utils';

export const scheduleRouter = Router();

//  routing => /schedule
// 한달 스케줄  데이터 조회
scheduleRouter.post('/month', asyncHandler(scheduleController.getScheduleByMonth));

// 일일 스케줄 데이터 조회
scheduleRouter.post('/month/day', asyncHandler(scheduleController.getScheduleByDay));

// 스케줄 추가
scheduleRouter.post('/day', asyncHandler(scheduleController.postScheduleByDay));

// 스케줄 수정
scheduleRouter.put('/day', asyncHandler(scheduleController.updateScheduleByDay));

// 스케줄 제거
scheduleRouter.delete('/day/:calendarId/:scheduleId', asyncHandler(scheduleController.deleteScheduleByDay));

// todo 일정만 불러오기
scheduleRouter.get('/todo/:calendarId', asyncHandler(scheduleController.getTodoByCalendarId));

// 캘린더 id 별 전체 정보 가져오기
scheduleRouter.get('/all/:calendarId', asyncHandler(scheduleController.getAllByCalendarId));

// todo를 제외한 스케줄 일정 가져오기
scheduleRouter.get('/:calendarId', asyncHandler(scheduleController.getScheduleByCalendarId));

// 캘린더 ID의 모든 일정 제거
scheduleRouter.delete('/all/:calendarId', asyncHandler(scheduleController.deleteAllByCalendarId));
