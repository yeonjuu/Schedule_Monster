import React, { useEffect, useRef, useState } from 'react';
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
} from './CalendarStyles';
import Dates from './Dates';
import {  DateData, Holiday, onClickObj } from '../../types/calendarTypes';
import { get } from '../../api';
import useDebounce from '../../hooks/useDebounce';
import DateController from './DateController';
import { Modal } from 'pages/calendar/modal/Modal';
import  useModal  from 'hooks/useModal';
import { NavBar } from 'components/navbar/NavBar';


const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateData, setDateData] = useState<DateData[]>([]);
 
  const startMonth = startOfMonth(date);
  const endMonth = endOfMonth(date);
  const day = startOfWeek(startMonth);
  const endDay = endOfWeek(endMonth);
  const prevYear = format(sub(date, { years: 1 }), 'yyyy');
  const nextYear = format(add(date, { years: 1 }), 'yyyy');
  const thisYear = format(date, 'yyyy');
  const prevMonth = format(sub(date, { months: 1 }), 'MM');
  const nextMonth = format(add(date, { months: 1 }), 'MM');
  const thisMonth = format(date, 'MM');
  const debounce = useDebounce(format(date, 'MM'));

 const {toggle, setModal}=useModal();
 
  const session = () => {
    if (thisMonth === '12') {
      return {
        //지금이 12월이면 11월 25일~내년 1월 06일까지가 범위
        start: `${thisYear}-${prevMonth}-25`,
        next: `${nextYear}-${nextMonth}-06`,
      };
    } else if (thisMonth === '01') {
      return {
        //지금이 1월이면 작년 12월 25일~ 2월 06일까지가 범위
        start: `${prevYear}-${prevMonth}-25`,
        next: `${thisYear}-${nextMonth}-06`,
      };
    } else {
      return {
        //그 외에는 이전 월 25일~ 다음 월 06일까지가 범위
        start: `${thisYear}-${prevMonth}-25`,
        next: `${thisYear}-${nextMonth}-06`,
      };
    }
  };

  useEffect(() => {
    const getHoliday = async () => {
      const calendarId =
        'ko.south_korea%23holiday%40group.v.calendar.google.com';
      const res = await get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${
          process.env.REACT_APP_API_KEY
        }&orderBy=startTime&singleEvents=true&timeMin=${
          session().start
        }T00:00:00Z&timeMax=${session().next}T00:00:00Z`,
      );

      const data = res.items.map((item: Holiday) => {
        return {
          name: item.summary,
          description: item.description.slice(0, 3),
          date: item.start.date,
        };
      });
      setDateData(data);
    };
    getHoliday();
  }, [debounce]);

const onClick:onClickObj={
  prev: () => {
    setDate((curr) => sub(curr, { months: 1 }));
  },
  next: () => {
    setDate((curr) => add(curr, { months: 1 }));
  },
  now: () => {
    setDate(new Date());
  }
}

  const renderDay = (day: Date, endDay: Date) => {
    
    let arr = []; //일~토 에 해당하는 날짜 컴포넌트를 담는 배열
    const brr = []; //일주일 들을 모아 한달을 담는 배열
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
          setModal={setModal}
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
        <NavBar/>
        <MonsterBox>스킨</MonsterBox>
        <DateController date={date} onClick={onClick}/>
        <HeaderCalendar>
          {['일', '월', '화', '수', '목', '금', '토'].map((names, index) => {
            return <p key={`${names}-${index}`}>{names}</p>;
          })}
        </HeaderCalendar>
        <Calendar>{renderDay(day, endDay)}</Calendar>
        <button onClick={setModal}>누르기</button>
        {toggle&&<Modal setModal={setModal}/>}
      </Container>
    </Layout>
  );
};

export default CalendarPage;
