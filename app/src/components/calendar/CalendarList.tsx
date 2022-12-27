import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { basicFont, hoverDark } from 'assets/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import * as API from '../../api';
import { changeCalendarId } from '../../pages/login/userSlice';

//캘린더 리스트를 받아올려면,
//사용자별 캘린더 조회 api 응답값..
type res = {
  calendarId: string;
  calendarName: string;
  createdAt: Date;
  email: string;
  share: boolean;
  updatedAt: Date;
  url: null;
  __v: number;
  _id: string;
};

export const CalendarList = () => {
  const [list, setList] = useState<res[]>([]);
  //캘린더아이디
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.persistedReducer.email);

  const fetchData = async () => {
    const data = await API.get(`/calendar/${email}`);
    setList(data);
    setSelected(data[0].calendarId);
    dispatch(changeCalendarId(selected));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    const changed = list.find((calendar) => calendar.calendarId === id);
    if (changed) {
      console.log('changed', changed.calendarName);
      setSelected(changed.calendarName);
      dispatch(changeCalendarId(changed.calendarId));
    }
  };

  return (
    //옵션이 변경될 때마다 캘린더 id 변경, 그거 store에 넣어서 보관하는게 좋을라나,
    <CalendarWrapper>
      {selected}
      <Select onChange={changeHandler} defaultValue={selected}>
        {list.map((each, idx) => {
          return (
            <option key={idx} value={each.calendarId}>
              {each.calendarName}
            </option>
          );
        })}
      </Select>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  width: 200px;
  display: inline-block;
`;

const Select = styled.select`
  width: 80%;
  height: 30px;
  text-indent: 10px;
  font-size: ${basicFont};
  border: 2px solid #aaa;
  border-radius: 8px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);

  :hover {
    border-color: ${hoverDark};
  }
`;
