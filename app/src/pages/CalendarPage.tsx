import React, { useEffect, useState } from 'react';
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
  HeaderCalendar,
  Container,
  CalendarController,
  MonsterBox,
  Layout,
} from '../components/calendar/styles';
import Dates from '../components/calendar/Dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { DateData, Holiday } from '../types/calendarTypes';

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateData, setDateData] = useState<DateData[]>([]);
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  const day = startOfWeek(startMonth); //day는 달력 기준에서 달이 시작하는 첫 주의 첫 날
  const endDay = endOfWeek(endMonth); //달력의 마지막 날

  useEffect(() => {
    const getHoliday = async () => {
      const startDate = `${format(sub(date, { years: 1 }), 'yyyy')}-12-25`;
      const endDate = `${format(add(date, { years: 1 }), 'yyyy')}-01-06`;
      const calendarId =
        'ko.south_korea%23holiday%40group.v.calendar.google.com';
      const res = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${process.env.REACT_APP_API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${startDate}T00:00:00Z&timeMax=${endDate}T00:00:00Z`,
      );
      const data = res.data.items.map((item: Holiday) => {
        return {
          name: item.summary,
          description: item.description.slice(0, 3),
          date: item.start.date,
        };
      });
      setDateData(data);
    };

    getHoliday();
  }, [format(date, 'yyyy')]);

  const prev = () => {
    setDate((curr) => sub(curr, { months: 1 }));
  };

  const next = () => {
    setDate((curr) => add(curr, { months: 1 }));
  };

  const now = () => {
    setDate(new Date());
  };

  const renderDay = (day: Date, endDay: Date) => {
    let arr = [];
    const brr = [];
    while (day <= endDay) {
      arr.push(
        <Dates
          key={`${day}`}
          prevMonth={isSameMonth(startMonth, day)}
          nextMonth={isSameMonth(endMonth, day)}
          today={isSameDay(new Date(), day)}
          week={format(day, 'EE')}
          date={day}
          dateData={dateData}
        />,
      );
      if (format(day, 'EE') == 'Sat') {
        brr.push(<WeekContainer key={`${day}-${endDay}`}>{arr}</WeekContainer>);
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
          <button onClick={prev}>
            <FontAwesomeIcon icon={faCaretLeft} />
          </button>
          {format(date, 'yyyy')}년 {format(date, 'MM')} 월
          <button onClick={next}>
            {' '}
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
          <button onClick={now}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </CalendarController>
        <HeaderCalendar>
          {['일', '월', '화', '수', '목', '금', '토'].map((names, index) => {
            return <p key={`${names}-${index}`}>{names}</p>;
          })}
        </HeaderCalendar>
        <Calendar>{renderDay(day, endDay)}</Calendar>
      </Container>
    </Layout>
  );
};

export default CalendarPage;
