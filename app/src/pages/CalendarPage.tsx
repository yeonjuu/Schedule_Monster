import React, { useState } from 'react';
import {
  format,
  add,
  sub,
  addDays,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import {
  Calendar,
  WeekContainer,
  Dates,
  HeaderCalendar,
  Container,
  CalendarController,
  MonsterBox,
  Layout,
} from '../components/calendar/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft, faCaretRight, faRotateRight} from '@fortawesome/free-solid-svg-icons'

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());

  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  const day = startOfWeek(startMonth); //day는 달력 기준에서 달이 시작하는 첫 주의 첫 날
  const endDay = endOfWeek(endMonth); //달력의 마지막 날

  const prevMonth = () => {
    setDate(sub(date, { months: 1 }));
  };

  const nextMonth = () => {
    setDate(add(date, { months: 1 }));
  };

  const now = () => {
    setDate(new Date());
  };

  const lenderDay = (day: Date, endDay: Date) => {
    let arr = [];
    const brr = [];
    while (day <= endDay) {
      arr.push(
        <Dates
          prevMonth={isSameMonth(startMonth, day)}
          nextMonth={isSameMonth(endMonth, day)}
          today={isSameDay(new Date(), day)}
          week={format(day, 'EE')}
        >
          {format(day, 'd')}
        </Dates>,
      );
      if (format(day, 'EE') == 'Sat') {
        brr.push(<WeekContainer>{arr}</WeekContainer>);
        arr = [];
      }
      day = addDays(day, 1);
    }
    return brr;
  };

  return (
    <Layout>
      <Container>
        <MonsterBox>스킨</MonsterBox>
        <CalendarController>
          <button onClick={prevMonth}><FontAwesomeIcon icon={faCaretLeft}  /></button>
          {format(date, 'yyyy')}년 {format(date, 'MM')} 월
          <button onClick={nextMonth}> <FontAwesomeIcon icon={faCaretRight} /></button>
          <button onClick={now}><FontAwesomeIcon icon={faRotateRight} /></button>
        </CalendarController>
        <HeaderCalendar>
          {['월', '화', '수', '목', '금', '토', '일'].map((names, index) => {
            return <p key={`${names}-${index}`}>{names}</p>;
          })}
        </HeaderCalendar>
        <Calendar>{lenderDay(day, endDay)}</Calendar>
      </Container>
    </Layout>
  );
};

export default CalendarPage;
