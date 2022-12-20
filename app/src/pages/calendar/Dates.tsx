import { format } from 'date-fns';
import { DateContainer, Day, HolidayLabel } from './CalendarStyles';
import React from 'react';
import { DateData, Days } from '../../types/calendarTypes';

const Holiday = ({ description, name }: DateData) => {
  return (
    <HolidayLabel description={description}>
      <span>{name}</span>
    </HolidayLabel>
  );
};

const checkHoliday = (holiday: Array<DateData>) => {
  const arr = [];
  for (let i = 0; i < holiday.length; i++) {
    arr.push(
      <Holiday
        key={`${holiday[i].date}-${i}`}
        description={holiday[i].description}
        name={holiday[i].name}
        date={''}
      />,
    );
  }
  return arr;
};

const Dates = ({ prevMonth, nextMonth, today, week, date, dateData }: Days) => {
  const todayDate = format(date, 'yyyy-MM-dd');
  const holiday = dateData.filter((item) => item.date === todayDate);

  return (
    <DateContainer>
      <Day
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        week={week}
        today={today}
      >
        {format(date, 'd')}
      </Day>
      {holiday && checkHoliday(holiday)}
    </DateContainer>
  );
};

export default Dates;
