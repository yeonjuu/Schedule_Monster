import { Schema } from 'mongoose';

// 인터페이스
export interface ScheduleInterface {
  calendarId?: string;
  scheduleId?: string;
  startDate?: Date;
  endDate?: Date;
  title?: string;
  labelColor?: string;
  isTodo?: boolean;
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'schedule',
  },
);
