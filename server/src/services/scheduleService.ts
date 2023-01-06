import { scheduleModel, scheduleModelType } from '../models';
import { ScheduleInterface, SchedulePostInterface } from '../models/schemas/Schedule';
import { splitedArr } from '../utils/splitedArr';
import { generateRandomString } from '../utils/generateRandomString';
class ScheduleService {
  private schedule: scheduleModelType;

  constructor(scheduleModel: scheduleModelType) {
    this.schedule = scheduleModel;
  }

  async getScheduleByMonth(calendarId: string, startDateInfo: string) {
    const { year: startYear, month: startMonth } = splitedArr(startDateInfo);
    const endYear = startYear;
    let strStartMonth;

    if (Math.floor(startMonth / 10) === 0) strStartMonth = '0' + startMonth;
    else strStartMonth = '' + startMonth;

    let strEndMonth = strStartMonth;
    const startYM = Number(startYear + strStartMonth);
    const endYM = Number(endYear + strEndMonth);

    // 이전 월에서부터 해당 월까지 하는 경우
    const search1 = await this.schedule.find({
      calendarId,
      startYYYYMM: { $lt: startYM },
      endYYYYMM: endYM,
    });
    // 해당 월에서 시작해서 해당월에 끝나는 경우
    const search2 = await this.schedule.find({
      calendarId,
      startYYYYMM: startYM,
      endYYYYMM: endYM,
    });
    // 해당 월에서부터 이후 달까지 하는 경우
    const search3 = await this.schedule.find({
      calendarId,
      startYYYYMM: startYM,
      endYYYYMM: { $gt: endYM },
    });
    // 해당 월 전에서부터 시작해서 해당 월 이후에나 끝나는 경우
    const search4 = await this.schedule.find({
      calendarId,
      startYYYYMM: { $lt: startYM },
      endYYYYMM: { $gt: endYM },
    });

    const result = [...search1, ...search2, ...search3, ...search4];
    return result;
  }

  async getScheduleByDay(calendarId: string, startDateInfo: string) {
    const { year: startYear, month: startMonth, date: startDate } = splitedArr(startDateInfo);

    let strStartMonth, strStartDate;

    if (Math.floor(startMonth / 10) === 0) strStartMonth = '0' + startMonth;
    else strStartMonth = '' + startMonth;

    if (Math.floor(startDate / 10) === 0) strStartDate = '0' + startDate;
    else strStartDate = '' + startDate;

    const strYYYYMMDD = Number(startYear + strStartMonth + strStartDate);

    // 이전 일에서부터 해당 일까지 하는 경우
    const search1 = await this.schedule.find({
      calendarId,
      startYYYYMMDD: { $lt: strYYYYMMDD },
      endYYYYMMDD: strYYYYMMDD,
    });
    // 해당 일에서 시작해서 해당 일에 끝나는 경우
    const search2 = await this.schedule.find({
      calendarId,
      startYYYYMMDD: strYYYYMMDD,
      endYYYYMMDD: strYYYYMMDD,
    });
    // 해당 일에서부터 이후 일까지 하는 경우
    const search3 = await this.schedule.find({
      calendarId,
      startYYYYMMDD: strYYYYMMDD,
      endYYYYMMDD: { $gt: strYYYYMMDD },
    });
    // 해당 일 전에서부터 시작해서 해당 일 이후에나 끝나는 경우
    const search4 = await this.schedule.find({
      calendarId,
      startYYYYMMDD: { $lt: strYYYYMMDD },
      endYYYYMMDD: { $gt: strYYYYMMDD },
    });
    // console.log('search 결과 :', search1, search2, search3, search4);
    const result = [...search1, ...search2, ...search3, ...search4];
    return result;
  }

  async postScheduleByDay(calendarId: string, info: SchedulePostInterface) {
    const { startDate, endDate, startTime, endTime, title, labelColor, isTodo, isCompleted }: SchedulePostInterface =
      info;
    const scheduleId = generateRandomString(10);
    const { year: startYear, month: startMonth, date: startDates } = splitedArr(startDate);
    const { year: endYear, month: endMonth, date: endDates } = splitedArr(endDate);

    let strStartMonth, strStartDate;
    let strEndMonth, strEndDate;

    if (Math.floor(startMonth / 10) === 0) strStartMonth = '0' + startMonth;
    else strStartMonth = '' + startMonth;

    if (Math.floor(startDates / 10) === 0) strStartDate = '0' + startDates;
    else strStartDate = '' + startDates;

    if (Math.floor(endMonth / 10) === 0) strEndMonth = '0' + endMonth;
    else strEndMonth = '' + endMonth;

    if (Math.floor(endDates / 10) === 0) strEndDate = '0' + endDates;
    else strEndDate = '' + endDates;

    const numStartYYYYMM = Number(startYear + strStartMonth);
    const numStartYYYYMMDD = Number(startYear + strStartMonth + strStartDate);
    const numEndYYYYMM = Number(endYear + strEndMonth);
    const numEndYYYYMMDD = Number(endYear + strEndMonth + strEndDate);
    const postData = {
      calendarId,
      scheduleId,
      startYYYYMM: numStartYYYYMM,
      startYYYYMMDD: numStartYYYYMMDD,
      startTime,
      endYYYYMM: numEndYYYYMM,
      endYYYYMMDD: numEndYYYYMMDD,
      endTime,
      title,
      labelColor,
      isTodo,
      isCompleted,
    };
    const result = await this.schedule.create(postData);
    return result;
  }

  async updateScheduleByDay(calendarId: string, info: SchedulePostInterface) {
    const {
      scheduleId,
      startDate,
      endDate,
      title,
      labelColor,
      startTime,
      endTime,
      isTodo = false,
      isCompleted,
    }: SchedulePostInterface = info;
    let numStartYYYYMM, numStartYYYYMMDD, numEndYYYYMM, numEndYYYYMMDD;
    let updateData;

    const { year: startYear, month: startMonth, date: startDates } = splitedArr(startDate);
    const { year: endYear, month: endMonth, date: endDates } = splitedArr(endDate);

    let strStartMonth, strStartDate;
    let strEndMonth, strEndDate;

    if (Math.floor(startMonth / 10) === 0) strStartMonth = '0' + startMonth;
    else strStartMonth = '' + startMonth;

    if (Math.floor(startDates / 10) === 0) strStartDate = '0' + startDates;
    else strStartDate = '' + startDates;

    if (Math.floor(endMonth / 10) === 0) strEndMonth = '0' + endMonth;
    else strEndMonth = '' + endMonth;

    if (Math.floor(endDates / 10) === 0) strEndDate = '0' + endDates;
    else strEndDate = '' + endDates;

    numStartYYYYMM = Number(startYear + strStartMonth);
    numStartYYYYMMDD = Number(startYear + strStartMonth + strStartDate);
    numEndYYYYMM = Number(endYear + strEndMonth);
    numEndYYYYMMDD = Number(endYear + strEndMonth + strEndDate);

    updateData = {
      startYYYYMM: numStartYYYYMM,
      startYYYYMMDD: numStartYYYYMMDD,
      endYYYYMM: numEndYYYYMM,
      endYYYYMMDD: numEndYYYYMMDD,
      ...(startTime && { startTime }),
      ...(endTime && { endTime }),
      ...(title && { title }),
      ...(labelColor && { labelColor }),
      ...(isTodo && { isTodo }), // 기본 셋팅값은 false, Todo로 바뀌게 된다면, 그때는 변경을 반영해야함.
      ...(isTodo && { endYYYYMM: numStartYYYYMM, endYYYYMMDD: numStartYYYYMMDD }), // isTodo가 True일때 위에 적었던 endDate는 덮어쓰기가 작용됨
      ...(isCompleted && { isCompleted }),
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

  async deleteAllByCalendarId(calendarId: string) {
    const result = await this.schedule.remove({ calendarId });
    return result;
  }
  async updateIsCompletedOrNot(scheduleId: string) {
    const schedule = await this.schedule.findOne({ scheduleId });
    if (!schedule)
      throw new Error('type:Forbidden,content:요청하신 데이터가 존재하지 않습니다. 다시 한 번 확인 바랍니다.');
    const { isCompleted } = schedule.toObject();

    const updateInfo = {
      isCompleted: !isCompleted,
    };
    const result = await this.schedule.findOneAndUpdate({ scheduleId }, updateInfo, { returnOriginal: false });
    return result;
  }
}
const scheduleService = new ScheduleService(scheduleModel);
export { scheduleService };
