import { calendarService } from '../services';
import { AsyncRequestHandler } from '../types';
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
    const calendars = await calendarService.getCalendars();
    res.json(calendars);
  },
  // 사용자별 캘린더 조회
  async getCalendar(req, res) {
    const { email } = req.params;
    const calendar = await calendarService.getCalendar(email);
    res.json(calendar);
  },
  // 일정 생성
  async postCalendar(req, res) {
    const { calendarId, calendarName } = req.body;
    const user = await calendarService.postCalendar(calendarId, calendarName);
    res.json(user);
  },
  // 일정 수정
  async putCalendar(req, res) {
    const { calendarId, calendarName } = req.body;
    const updateResult = await calendarService.putCalendar(calendarId, calendarName);
    res.json(updateResult);
  },
  // 일정 삭제
  async deleteCalendar(req, res) {
    const { calendarId } = req.params;
    const deleteInfo = await calendarService.deleteCalendar(calendarId);
    res.json(deleteInfo);
  },

  async calendarShareOrNot(req, res) {
    const { calendarId } = req.params;
    const schedule = await calendarService.calendarShareOrNot(calendarId);
    return res.json(schedule);
  },
};
