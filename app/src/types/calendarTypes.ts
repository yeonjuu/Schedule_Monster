import { ArrowFunction } from 'typescript';
import { Calendar } from './../pages/calendar/CalendarStyles';

export interface Holiday {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  creator: Creator;
  organizer: Creator;
  start: End;
  end: End;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  eventType: string;
}

export interface Creator {
  email: string;
  displayName: string;
  self: boolean;
}

export interface End {
  date: Date;
}

export interface DateData {
  name: string;
  description: string;
  date: string;
}

export interface Days {
  nextMonth: boolean;
  prevMonth: boolean;
  today: boolean;
  week: string;
  date: Date;
  holidayData: Array<DateData>;
}

export interface Controller {
  date: Date;
  onClick: onClickObj;
}

export type onClickObj = {
  prev: () => void;
  next: () => void;
  now: () => void;
};

export type checkTodo={
  title: string,
  calendar: string,

}

export interface checkDate{
  prevMonth : boolean
  nextMonth : boolean
  today : boolean
  week :string
  date : Date
  holidayData : DateData[]
}

export interface todoData{
  _id: string;
    calendarId: string;
    scheduleId: string;
    startDate: string;
    endDate: string;
    title: string;
    labelColor: string;
    isTodo: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isCompleted: boolean;
}

