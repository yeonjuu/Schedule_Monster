import { format } from 'date-fns';
import { DateContainer, Day, HolidayLabel } from './CalendarStyles';
import React from 'react';
import { DateData, Days } from '../../types/calendarTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from './slice/modalSlice';

//공휴일 - 기념일 라벨링
const Holiday = ({ description, name }: DateData) => {
  return (
    <HolidayLabel description={description}>
      <span>{name}</span>
    </HolidayLabel>
  );
};
//한 날짜에 겹치는 공휴일 - 기념일이 있을 수 있기에 배열에 담아 반환
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todayDate = format(date, 'yyyy-MM-dd');
  const holiday = dateData.filter((item) => item.date === todayDate);
  const day = format(date, 'd');
  return (
    <DateContainer
      onDoubleClick={() => {
        dispatch(openModal());
        navigate(`/calendar/todos/${format(date, 'yyyy-MM-dd')}`);
      }}
    >
      <Day
        prevMonth={prevMonth} //달력에서 표시되는 이전 달의 날짜들인지 확인
        nextMonth={nextMonth} //달력에서 표시되는 이후 달의 날짜들인지 확인
        week={week} //토, 일요일 여부 확인
        today={today} //달력에서 오늘 날짜와 동일한지 확인
      >
        {day}
      </Day>
      {holiday && checkHoliday(holiday)}
    </DateContainer>
  );
};

export default Dates;
