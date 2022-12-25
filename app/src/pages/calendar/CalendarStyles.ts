import styled, { css } from 'styled-components';

export const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

export const WeekContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 100%;
`;

//Dates=> DateContainer
export const Dates = styled.div<{
  prevMonth: boolean;
  nextMonth: boolean;
  week: string;
  today: boolean;
}>`
  border-radius: 4px;
  padding: 0 6px;
  width: 100%;
  height: 100%;
  background-color: white;
  border: solid 0.5px lightgray;
  ${(props) =>
    !props.prevMonth &&
    css`
      color: rgba(0, 0, 0, 0.5);
    `}
  ${(props) =>
    !props.nextMonth &&
    css`
      opacity: 0.3;
    `}
      ${(props) =>
    props.today &&
    css`
      font-weight: bold;
      font-size: large;
      text-decoration: underline;
    `}
    ${(props) =>
    props.week === 'Sun'
      ? css`
          color: red;
        `
      : props.week === 'Sat'
      ? css`
          color: blue;
        `
      : null}
`;

export const DateContainer = styled.div`
  border-radius: 4px;

  width: 100%;
  height: 100%;
  background-color: white;
  border: solid 0.5px lightgray;
`;

export const Day = styled.p<{
  prevMonth: boolean;
  nextMonth: boolean;
  week: string;
  today: boolean;
}>`
  display: block;
  width: 100%;
  padding: 0 6px;
  ${(props) =>
    !props.prevMonth &&
    css`
      color: rgba(0, 0, 0, 0.5);
    `}
  ${(props) =>
    !props.nextMonth &&
    css`
      opacity: 0.3;
    `}
      ${(props) =>
    props.today &&
    css`
      font-weight: bold;
      font-size: large;
      text-decoration: underline;
    `}
    ${(props) =>
    props.week === 'Sun'
      ? css`
          color: red;
        `
      : props.week === 'Sat'
      ? css`
          color: blue;
        `
      : null}
`;

export const HeaderCalendar = styled.div`
  display: grid;
  height: 20px;
  width: 100%;
  grid-template-columns: repeat(7, minmax(40px, auto));
  & > p {
    display: flex;
    margin-left: 3px;
    font-size: 16px;
  }
`;

export const Container = styled.div`
  width: 84vw;
  max-width: 1024px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CalendarController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  width: 100%;
  font-size: 18px;
  margin: 15px 0;
  & > button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #414656;
    font-size: 20px;
    padding: 0 15px;
  }
`;

export const MonsterBox = styled.div`
  display: flex;
  background-color: #ffeeca;
  height: 150px;
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
`;

export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const HolidayLabel = styled.div<{ description: string }>`
  height: 15%;
  width: 100%;
  border-radius: 9px;
  margin-top: 2px;

  color: white;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  font-weight: 550;
  line-height: 19px;
  ${(props) =>
    props.description === '공휴일'
      ? css`
          background-color: red;
        `
      : css`
          background-color: gray;
        `}
`;

export const ScheduleLabel = styled.div<{ labelColor: string }>`
  height: 15%;
  width: 100%;

  margin-top: 2px;
  background-color: ${(props) => props.labelColor};
  color: white;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  font-weight: 550;
  line-height: 19px;
`;

export const TodoLabel=styled(ScheduleLabel)`
border-radius: 6px;
`

export const PickCalBox = styled.div`
  white-space: nowrap;
  overflow: auto;
  width: 500px;
  height: 30px;
`;
