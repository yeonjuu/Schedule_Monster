import { calendarService } from '../services';
import { AsyncRequestHandler } from '../types';
import { errorResponse } from '../utils';
interface calendarControllerInterface {
  getCalendars: AsyncRequestHandler;
  getCalendar: AsyncRequestHandler;
  postCalendar: AsyncRequestHandler;
  putCalendar: AsyncRequestHandler;
  deleteCalendar: AsyncRequestHandler;
  calendarShareOrNot: AsyncRequestHandler;
}

export const calendarController: calendarControllerInterface = {
  // 전체 캘린더 조회(관리자용)
  async getCalendars(req, res) {
    const { email } = req.params;
    const calendars = await calendarService.getCalendars(email);
    res.json(calendars);
  },
  // 사용자별 캘린더 조회
  async getCalendar(req, res) {
    const { email } = req.params;
    if (!email) errorResponse(res, 'BadRequest', '요청 데이터를 참조할 수 없습니다');
    const calendar = await calendarService.getCalendar(email);
    res.json(calendar);
  },
  // 캘린더 생성
  async postCalendar(req, res) {
    const { email, calendarName } = req.body;
    if (!email || !calendarName) errorResponse(res, 'BadRequest', '요청 데이터를 참조할 수 없습니다');
    const calendar = await calendarService.postCalendar(email, calendarName);
    res.json(calendar);
  },
  // 캘린더 이름 수정
  async putCalendar(req, res) {
    const { calendarId, calendarName } = req.body;
    if (!calendarId || !calendarName) errorResponse(res, 'BadRequest', '요청 데이터를 참조할 수 없습니다');
    const updateResult = await calendarService.putCalendar(calendarId, calendarName);
    res.json(updateResult);
  },
  // 캘린더 삭제
  async deleteCalendar(req, res) {
    const { calendarId } = req.params;
    if (!calendarId) errorResponse(res, 'BadRequest', '요청 데이터를 참조할 수 없습니다');
    const deleteInfo = await calendarService.deleteCalendar(calendarId);
    res.json(deleteInfo);
  },
  // 캘린더 공유기능 활성화
  async calendarShareOrNot(req, res) {
    const { calendarId } = req.params;
    if (!calendarId) errorResponse(res, 'BadRequest', '요청 데이터를 참조할 수 없습니다');
    const schedule = await calendarService.calendarShareOrNot(calendarId);
    return res.json(schedule);
  },
};
