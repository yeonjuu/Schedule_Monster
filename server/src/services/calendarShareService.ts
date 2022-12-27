import { calendarShareModel, calendarShareModelType } from '../models';
import { CalendarShareInterface } from '../models/schemas/CalendarShare';
class CalendarShareService {
  private calendarshare: calendarShareModelType;

  constructor(calendarShareModel: calendarShareModelType) {
    this.calendarshare = calendarShareModel;
  }
  async getCalendarShare(calendarId: string) {
    // 등록한 달력의 주인이 추가했던 친구들의 목록을 확인
    const result = await this.calendarshare.find({ calendarId });
    return result;
  }
  async postCalendarShare(postInfo: CalendarShareInterface) {
    const { email, calendarId, friendEmail } = postInfo;
    const result = await this.calendarshare.create({ email, calendarId, friendEmail });
    return result;
  }
  async deleteCalendarShare(calendarId: string, friendEmail: string) {
    const result = await this.calendarshare.remove({ calendarId, friendEmail });
    return result;
  }
}
const calendarShareService = new CalendarShareService(calendarShareModel);
export { calendarShareService };
