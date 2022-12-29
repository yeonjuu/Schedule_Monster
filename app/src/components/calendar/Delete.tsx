import React from 'react';
import * as Style from '../modal/modal';
import * as API from '../../api';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { changeCalendarId, postCalendarList } from 'pages/login/userSlice';

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

export const Delete = ({
  setList,
}: {
  setList: React.Dispatch<React.SetStateAction<res[]>>;
}) => {
  const calenderId = useSelector(
    (state: RootState) => state.persistedReducer.calendarId,
  );
  const email = useSelector((state: RootState) => state.persistedReducer.email);

  const dispatch = useDispatch();
  const deleteClickHandler = async () => {
    const isRight = window.confirm('캘린더를 삭제하시겠습니까?');
    if (isRight) {
      try {
        await API.delete(`/calendar/${calenderId}`);
        const list = await API.get(`/calendar/${email}`);
        setList(list);
        dispatch(postCalendarList(list));
        //리스트 제일처음에 있는 캘린더 아이디로 변경, list 가공시 변경 필요

        dispatch(changeCalendarId(list[0].calendarId));
        // console.log(list);
        alert('삭제완료');
      } catch (error) {
        alert('삭제실패...');
      }
    }
  };
  return (
    <Style.Wrapper>
      <Style.Button type="button" value="-" onClick={deleteClickHandler} del />
    </Style.Wrapper>
  );
};
