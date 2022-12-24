import { Model, model } from 'mongoose';
import { UserSchema, UserInterface } from './schemas/User';
import { CharacterListSchema, CharacterListInterface } from './schemas/CharacterList';
import { ScheduleInterface, ScheduleSchema } from './schemas/Schedule';
import { CalendarInterface, CalendarSchema } from './schemas/Calendar';
import { CalendarShareInterface, CalendarShareSchema } from './schemas/CalendarShare';
interface ModelIdInterface {
  user: string;
  characterList: string;
  schedule: string;
  calendar: string;
  calendarshare: string;
}

export const modelIdentifier: ModelIdInterface = {
  user: 'user',
  characterList: 'charaterlist',
  schedule: 'schedule',
  calendar: 'calendar',
  calendarshare: 'calendarshare',
};

const userModel = model<UserInterface>(modelIdentifier.user, UserSchema);
type userModelType = Model<UserInterface>;

const characterListModel = model<CharacterListInterface>(modelIdentifier.characterList, CharacterListSchema);
type characterListModelType = Model<CharacterListInterface>;

const scheduleModel = model<ScheduleInterface>(modelIdentifier.schedule, ScheduleSchema);
type scheduleModelType = Model<ScheduleInterface>;

const calendarModel = model<CalendarInterface>(modelIdentifier.calendar, CalendarSchema);
type calendarModelType = Model<CalendarInterface>;

const calendarShareModel = model<CalendarShareInterface>(modelIdentifier.calendarshare, CalendarShareSchema);
type calendarShareModelType = Model<CalendarShareInterface>;
export {
  userModel,
  userModelType,
  characterListModel,
  characterListModelType,
  scheduleModel,
  scheduleModelType,
  calendarModel,
  calendarModelType,
  calendarShareModel,
  calendarShareModelType,
};
