import { Schema } from 'mongoose';

// 인터페이스
export interface CalendarShareInterface {
  email: string;
  calendarId: string;
  friendEmail: string;
}

// 스키마
export const CalendarShareSchema = new Schema<CalendarShareInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    calendarId: {
      type: String,
      required: true,
    },
    friendEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'calendarshare',
  },
);
