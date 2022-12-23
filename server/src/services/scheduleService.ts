import { NOTFOUND } from 'dns';
import { start } from 'repl';
import { scheduleModel, scheduleModelType } from '../models';
import { ScheduleInterface } from '../models/schemas/Schedule';
import { splitedArr } from '../utils/splitedArr';
import { generateRandomString } from '../utils/generateRandomString';
class ScheduleService {
  private schedule: scheduleModelType;

  constructor(scheduleModel: scheduleModelType) {
    this.schedule = scheduleModel;
  }

  async getScheduleByMonth(calendarId: string, startDate: string) {
    const splitedDate = splitedArr(startDate);
    const thisYear = splitedDate[0];
    const thisMonth = splitedDate[1];
    const thisDate = splitedDate[2];
    const newDate = new Date(thisYear, thisMonth - 1, thisDate);
    const newNextDate = new Date(thisYear, thisMonth, 0);
    const result = await this.schedule
      .find({ calendarId, startDate: { $gte: newDate, $lte: newNextDate } })
      .sort({ startDate: 'asc' });
    console.log(result);
    return result;
  }

  async getScheduleByDay(calendarId: string, startDate: string) {
    const splitedDate = splitedArr(startDate);
    const thisYear = splitedDate[0];
    const thisMonth = splitedDate[1];
    const thisDate = splitedDate[2];
    const newDate = new Date(thisYear, thisMonth - 1, thisDate);
    const newNextDate = new Date(thisYear, thisMonth - 1, thisDate + 1);
    const result = await this.schedule
      .find({ calendarId, startDate: { $gte: newDate, $lt: newNextDate } })
      .sort({ startDate: 'asc' });
    return result;
  }

  async postScheduleByDay(calendarId: string, info: ScheduleInterface) {
    const { startDate, endDate, title, labelColor, isTodo }: ScheduleInterface = info;
    const scheduleId = generateRandomString(10);
    const postData = {
      calendarId,
      scheduleId,
      startDate,
      ...((endDate && { endDate }) || { endDate: startDate }),
      title,
      labelColor,
      isTodo,
    };
    const result = await this.schedule.create(postData);
    return result;
  }
  async updateScheduleByDay(calendarId: string, info: ScheduleInterface) {
    const { scheduleId, startDate, endDate, title, labelColor, isTodo = false }: ScheduleInterface = info;

    const updateData = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(title && { title }),
      ...(labelColor && { labelColor }),
      ...(isTodo && { isTodo }), // 기본 셋팅값은 false, Todo로 바뀌게 된다면, 그때는 변경을 반영해야함.
      ...(isTodo && { endDate: startDate }), // isTodo가 True일때 위에 적었던 endDate는 덮어쓰기가 작용됨
    };
    const result = await this.schedule.findOneAndUpdate({ calendarId, scheduleId }, updateData, {
      returnOriginal: false,
    });
    return result;
  }

  async deleteScheduleByDay(calendarId: string, scheduleId: string) {
    const result = await this.schedule.remove({ calendarId, scheduleId });
    return result;
  }

  async getScheduleByCalendarId(calendarId: string) {
    const result = await this.schedule.find({ calendarId, isTodo: false });
    return result;
  }

  async getTodoByCalendarId(calendarId: string) {
    const result = await this.schedule.find({ calendarId, isTodo: true });
    return result;
  }

  async getAllByCalendarId(calendarId: string) {
    const result = await this.schedule.find({ calendarId });
    return result;
  }
}
const scheduleService = new ScheduleService(scheduleModel);
export { scheduleService };
