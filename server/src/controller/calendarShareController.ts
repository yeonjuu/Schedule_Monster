import { calendarShareService } from '../services';
import { AsyncRequestHandler } from '../types';

interface calendarShareControllerInterface {
  getCalendarShare: AsyncRequestHandler;
  postCalendarShare: AsyncRequestHandler;
  deleteCalendarShare: AsyncRequestHandler;
}

export const calendarShareController: calendarShareControllerInterface = {
  // 공유 달력 친구목록 반환
  async getCalendarShare(req, res) {
    const { calendarId } = req.params;
    console.log(calendarId);
    const calendars = await calendarShareService.getCalendarShare(calendarId);
    res.json(calendars);
  },
  // 공유달력 친구 추가
  async postCalendarShare(req, res) {
    const postInfo = req.body;
    const calendar = await calendarShareService.postCalendarShare(postInfo);
    res.json(calendar);
  },
  // 공유 달력 친구 제거
  async deleteCalendarShare(req, res) {
    const { calendarId, friendEmail } = req.params;
    const user = await calendarShareService.deleteCalendarShare(calendarId, friendEmail);
    res.json(user);
  },
};
