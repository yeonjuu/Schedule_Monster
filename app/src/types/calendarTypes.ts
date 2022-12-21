import { ArrowFunction } from 'typescript';

interface Holiday {
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

interface Creator {
  email: string;
  displayName: string;
  self: boolean;
}

interface End {
  date: Date;
}

interface DateData {
  name: string;
  description: string;
  date: string;
}

interface Days {
  nextMonth: boolean;
  prevMonth: boolean;
  today: boolean;
  week: string;
  date: Date;
  dateData: Array<DateData>;
  setModal: ()=> void
}

interface Controller {
  date: Date;
  onClick: onClickObj;
}

type onClickObj = {
  prev: () => void;
  next: () => void;
  now: () => void;
};

export { Holiday, DateData, Days, Controller,onClickObj };
