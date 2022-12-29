import { calendarModel, calendarModelType } from '../models';
import { generateRandomString } from '../utils/generateRandomString';
import { userService } from './userService';
import { scheduleService } from './scheduleService';
import { calendarShareService } from './calendarShareService';
class CalendarService {
  private calendar: calendarModelType;

  constructor(calendarModel: calendarModelType) {
    this.calendar = calendarModel;
  }
  async getCalendars(email: string) {
    const status = await userService.checkAuth(email);
    console.log(status);
    if (!status) {
      throw new Error('type:Forbidden,content:서비스를 요청할 권한이 없습니다');
    }
    // email 정보를 받아 유저 정보를 확인하여 권x한이 user가 아니면 아래 코드를 수행하도록 수정 필요!!
    const result = await this.calendar.find({});
    return result;
  }
  async getCalendar(email: string) {
    const myCalendar = await this.calendar.find({ email });
    const sharedCalendar = await calendarShareService.getCalendarShareByFriend(email);
    const result = [...myCalendar, ...sharedCalendar];
    return result;
  }
  async getCalendarById(calendarId: string) {
    const myCalendar = await this.calendar.findOne({ calendarId });
    if (!myCalendar) throw new Error('type:Forbidden,content:공유받은 캘린더 불러오기 실패하였습니다');
    return myCalendar;
  }
  async postCalendar(email: string, calendarName: string) {
    const calendarId = generateRandomString(10);
    const info = {
      email,
      calendarId,
      calendarName,
      share: false,
      url: null,
    };
    const result = await this.calendar.create(info);
    return result;
  }

  async putCalendar(calendarId: string, calendarName: string) {
    const updateData = {
      calendarName,
    };
    const result = await this.calendar.findOneAndUpdate({ calendarId }, updateData, {
      returnOriginal: false,
    });
    return result;
  }

  async deleteCalendar(calendarId: string) {
    const result = await this.calendar.remove({ calendarId });
    try {
      await scheduleService.deleteAllByCalendarId(calendarId);
    } catch (error) {
      throw new Error('type:Forbidden,content:캘린더 삭제시 스케줄들이 삭제되지 않았습니다. 관리자에게 문의하세요');
    }
    return result;
  }

  // URL 공유기능 사용시
  async calendarShareOrNot(calendarId: string) {
    const calendar = await this.calendar.findOne({ calendarId });
    if (!calendar)
      throw new Error('type:Forbidden,content:요청하신 데이터가 존재하지 않습니다. 다시 한 번 확인 바랍니다.');
    const { share } = calendar.toObject();
    let url = null;
    if (!share) url = generateRandomString(12);
    const updateInfo = {
      share: !share,
      url,
    };
    const result = await this.calendar.findOneAndUpdate({ calendarId }, updateInfo, { returnOriginal: false });
    return result;
  }
}
const calendarService = new CalendarService(calendarModel);
export { calendarService };
