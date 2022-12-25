import { Schema } from 'mongoose';

// 인터페이스
export interface CalendarInterface {
  email: string;
  calendarName: string;
  calendarId: string;
  share?: boolean;
  url?: string;
}

// 스키마
export const CalendarSchema = new Schema<CalendarInterface>(
  {
    email: {
      type: String,
      required: true,
    },
    calendarName: {
      type: String,
      required: true,
    },
    calendarId: {
      type: String,
      required: true,
    },
    share: {
      type: Schema.Types.Boolean,
      default: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
    collection: 'calendar',
  },
);
