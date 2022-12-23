import { scheduleService } from '../services';
import { AsyncRequestHandler } from '../types';
interface scheduleControllerInterface {
  getScheduleByMonth: AsyncRequestHandler;
  getScheduleByDay: AsyncRequestHandler;
  postScheduleByDay: AsyncRequestHandler;
  updateScheduleByDay: AsyncRequestHandler;
  deleteScheduleByDay: AsyncRequestHandler;
  getScheduleByCalendarId: AsyncRequestHandler;
  getTodoByCalendarId: AsyncRequestHandler;
  getAllByCalendarId: AsyncRequestHandler;
}

export const scheduleController: scheduleControllerInterface = {
  // 월별 일병 조회
  async getScheduleByMonth(req, res) {
    const { calendarId, startDate } = req.body;
    const schedules = await scheduleService.getScheduleByMonth(calendarId, startDate);
    res.json(schedules);
  },
  // 일자별 일정 조회
  async getScheduleByDay(req, res) {
    const { calendarId, startDate } = req.params;
    const schedules = await scheduleService.getScheduleByDay(calendarId, startDate);
    res.json(schedules);
  },
  // 일정 생성
  async postScheduleByDay(req, res) {
    const { calendarId, ...update } = req.body;
    const user = await scheduleService.postScheduleByDay(calendarId, update);
    res.json(user);
  },
  // 일정 수정
  async updateScheduleByDay(req, res) {
    const { calendarId, ...updateInfo } = req.body;
    const updateResult = await scheduleService.updateScheduleByDay(calendarId, updateInfo);
    res.json(updateResult);
  },
  // 일정 삭제
  async deleteScheduleByDay(req, res) {
    const { calendarId, scheduleId } = req.params;
    const deleteInfo = await scheduleService.deleteScheduleByDay(calendarId, scheduleId);
    res.json(deleteInfo);
  },

  async getScheduleByCalendarId(req, res) {
    const { calendarId } = req.params;
    const schedule = await scheduleService.getScheduleByCalendarId(calendarId);
    return res.json(schedule);
  },

  async getTodoByCalendarId(req, res) {
    const { calendarId } = req.params;
    const Todo = await scheduleService.getTodoByCalendarId(calendarId);
    return res.json(Todo);
  },

  async getAllByCalendarId(req, res) {
    const { calendarId } = req.params;
    const data = await scheduleService.getAllByCalendarId(calendarId);
    return res.json(data);
  },
};
