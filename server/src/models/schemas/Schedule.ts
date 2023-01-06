import { Schema } from 'mongoose';

// 인터페이스
export interface ScheduleInterface {
  calendarId?: string;
  scheduleId?: string;
  startYYYYMM: Number;
  startYYYYMMDD: Number;
  endYYYYMM: Number;
  endYYYYMMDD: Number;
  startTime?: Number;
  endTime?: Number;
  title?: string;
  labelColor?: string;
  isTodo?: boolean;
  isCompleted?: boolean;
}

export interface SchedulePostInterface {
  scheduleId?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  title: string;
  labelColor?: string;
  isTodo?: boolean;
  isCompleted?: boolean;
}

// 스키마
export const ScheduleSchema = new Schema<ScheduleInterface>(
  {
    calendarId: {
      type: String,
      required: true,
    },
    scheduleId: {
      type: String,
      required: true,
    },
    startYYYYMM: {
      type: Number,
      required: true,
    },
    startYYYYMMDD: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,
      required: false,
    },
    endYYYYMM: {
      type: Number,
      required: false,
    },
    endYYYYMMDD: {
      type: Number,
      required: false,
    },
    endTime: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    labelColor: {
      type: String,
      required: false,
    },
    isTodo: {
      type: Schema.Types.Boolean,
      default: false,
    },
    isCompleted: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'schedule',
  },
);
