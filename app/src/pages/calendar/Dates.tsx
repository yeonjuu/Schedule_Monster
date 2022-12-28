import { format } from 'date-fns';
import {
  DateContainer,
  Day,
  HolidayLabel,
  ScheduleLabel,
  TodoLabel,
} from './CalendarStyles';
import React, { Dispatch, useState } from 'react';
import { DateData, Days, todoData } from '../../types/calendarTypes';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openModal,
  openTodo,
  toggleSchedule,
} from './slice/modalSlice';
import { RootState } from 'store/store';
import { AnyAction } from 'redux';

//한 날짜에 겹치는 공휴일 - 기념일이 있을 수 있기에 배열에 담아 반환
const checkHoliday = (holiday: Array<DateData>) => {
  const arr = [];
  for (let i = 0; i < holiday.length; i++) {
    arr.push(
      <HolidayLabel
        key={`${holiday[i].date}-${i}`}
        description={holiday[i].description}
      >
        <p>{holiday[i].name}</p>
      </HolidayLabel>,
    );
  }
  return arr;
};

const checkTodo = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  todo: Array<todoData>,
) => {
  const arr = [];
  for (let i = 0; i < todo.length; i++) {
    arr.push(
      <TodoLabel
        isCompleted={todo[i].isCompleted}
        key={`${todo[i].startYYYYMMDD}-${i}`}
        labelColor={todo[i].labelColor}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          dispatch(openTodo());
          navigate(`/calendar/todos/todo/${todo[i].scheduleId}`);
        }}
      >
        <p>{todo[i].title}</p>
      </TodoLabel>,
    );
  }
  return arr;
};

const checkSchedule = (
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction,
  todo: Array<todoData>,
) => {
  const arr = [];
  // const [disabled, setDisabled]=useState(false);
  for (let i = 0; i < todo.length; i++) {
    arr.push(
      <ScheduleLabel
        isCompleted={todo[i].isCompleted}
        key={`${todo[i].startYYYYMMDD}-${i}`}
        labelColor={todo[i].labelColor}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          dispatch(openTodo());

          navigate(`/calendar/todos/schedule/${todo[i].scheduleId}`);
        }}
      >
        <p>{todo[i].title}</p>
      </ScheduleLabel>,
    );
  }
  return arr;
};

const Dates = ({
  prevMonth,
  nextMonth,
  today,
  week,
  date,
  holidayData,
}: Days) => {
  const todoData = useSelector((state: RootState) => state.todoSlice.todoList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const holidayToday = format(date, 'yyyy-MM-dd');
  const todosToday = format(date, 'yyyyMMdd');
  const holidayArr = holidayData.filter((item) => item.date === holidayToday);
  const todosArr = todoData.filter(
    (item) => item.isTodo && item.startYYYYMMDD.toString() === todosToday,
  ); //캘린더별 일정 목록에서 할일만 분리한 배열
  const scheduleArr = todoData.filter(
    (item) =>
      !item.isTodo &&
      item.startYYYYMMDD.toString() <= todosToday &&
      item.endYYYYMMDD.toString() >= todosToday,
  ); //캘린더별 일정 목록에서 일정만 분리한 배열

  const day = format(date, 'd');
  return (
    <DateContainer
      onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        dispatch(openModal());

        navigate(`/calendar/todos/${todosToday}`);
      }}
    >
      <Day
        prevMonth={prevMonth} //달력에서 표시되는 이전 달의 날짜들인지 확인
        nextMonth={nextMonth} //달력에서 표시되는 이후 달의 날짜들인지 확인
        week={week} //토, 일요일 여부 확인
        today={today} //달력에서의 날짜가 오늘 날짜와 동일한지 확인
      >
        {day}
      </Day>
      {holidayArr && checkHoliday(holidayArr)}
      {scheduleArr && checkSchedule(dispatch, navigate, scheduleArr)}
      {todosArr && checkTodo(dispatch, navigate, todosArr)}
    </DateContainer>
  );
};

export default Dates;
