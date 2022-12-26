import { calendarModel, calendarModelType } from '../models';
import { CalendarInterface } from '../models/schemas/Calendar';
import { splitedArr } from '../utils/splitedArr';
import { generateRandomString } from '../utils/generateRandomString';
import { userService } from './userService';
class CalendarService {
  private calendar: calendarModelType;

  constructor(calendarModel: calendarModelType) {
    this.calendar = calendarModel;
  }
  async getCalendars(email: string) {
    console.log('Calendars접근함');
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
    const result = await this.calendar.find({ email });
    return result;
  }

  async postCalendar(email: string) {
    const calendarId = generateRandomString(10);
    const calendarNum = (await this.calendar.find({ email })).length;
    const calendarName = '캘린더' + calendarNum;
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
    return result;
  }

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
