import { post } from 'api';
import { mainColor } from 'assets/styles';
import { ModalBtn } from 'components/button/buttons';
import { ErrorWord, Input, InputBox, SelectCal } from 'components/input/inputs';
import React, { useEffect, useState } from 'react';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import { FieldErrors, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { checkTodo } from 'types/calendarTypes';
import { closeModal } from '../slice/modalSlice';
import { updateCalendar } from '../slice/todoSlice';
import { BtnBox, PickColor } from './ModalStyle';
import * as API from 'api';

const Todo = ({ dates }: { dates: string | any }) => {
  //여기서 dates로 받아오는 것은 params 값. params는 해당 날짜에 해당(ex: 2022-12-25)
  //slice를 각각 해준 이유는 모달 창에서 선택된 날짜가 가시적으로 보이게 하기 위해
  // const year: number = Number(dates.slice(0, 4));
  // const month: number = Number(dates.slice(5, 7));
  // const day: number = Number(dates.slice(8, 10));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(`${mainColor}`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector(
    (state: RootState) => state.persistedReducer.calendarList,
  );
  const calendarId = useSelector(
    (state: RootState) => state.persistedReducer.calendarId,
  );
  const year: number = Number(dates.slice(0, 4));
  const month: number = Number(dates.slice(4, 6));


  const onValid = async (input: checkTodo) => {
    const data = {
      calendarId: calendarId,
      startDate: dates,
      endDate: dates,
      title: input.title,
      labelColor: color,
      isTodo: true,
    };

    try {
     
      await post(`/schedule/day`, data);
      alert('할 일을 등록하였습니다');
      dispatch(closeModal());
      const monthData={
        calendarId: `${calendarId}`,
        startYearMonth: `${year}${month}`,
      }
const getThisCalendar = await API.post(`/schedule/month`,monthData);
dispatch(updateCalendar(getThisCalendar));
      navigate('/calendar');
    } catch (err) {
      alert(err);
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    alert('실패');
 
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <span>{/* {year}년 {month}월 {day}일 */}</span>
      <InputBox>
        <Input
          type="text"
          placeholder="내용을 입력해주세요"
          {...register('title', {
            required: '내용을 입력해 주세요',
            minLength: {
              value: 2,
              message: '2글자 이상으로 입력해 주세요',
            },
            maxLength: {
              value: 20,
              message: '20글자 이하로 입력해 주세요',
            },
          })}
          errors={errors.title}
        />
        <PickColor
          type="button"
          onClick={() => setOpen((curr) => !curr)}
          labelColor={color}
        >
          라벨
        </PickColor>
        {errors.calendar && (
          <ErrorWord>{`${errors.calendar?.message}`}</ErrorWord>
        )}
        {open && (
          <TwitterPicker
            color={color}
            onChangeComplete={(color) => {
              setColor(color.hex);
            }}
            triangle={'top-right'}
            width={'380px'}
          />
        )}
        {errors.title && <ErrorWord>{`${errors.title?.message}`}</ErrorWord>}


        
      </InputBox>
      <BtnBox>
        <ModalBtn
          type="button"
          onClick={() => {
            dispatch(closeModal());
            navigate('/calendar');
          }}
        >
          취소
        </ModalBtn>
        <ModalBtn type="submit">저장</ModalBtn>
      </BtnBox>
    </form>
  );
};

export default Todo;
