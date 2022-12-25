import { post } from 'api';
import { MAIN_COLOR } from 'assets/styles';
import { ModalBtn } from 'components/button/buttons';
import { ErrorWord, Input, InputBox, SelectCal } from 'components/input/inputs';
import React, { useState } from 'react';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import { FieldErrors, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkTodo } from 'types/calendarTypes';
import { closeModal } from '../slice/modalSlice';
import { BtnBox, PickColor } from './ModalStyle';

const Todo = ({ dates }: { dates: string | any }) => {
  //여기서 dates로 받아오는 것은 params 값. params는 해당 날짜에 해당(ex: 2022-12-25)
  //slice를 각각 해준 이유는 모달 창에서 선택된 날짜가 가시적으로 보이게 하기 위해
  const year: number = Number(dates.slice(0, 4));
  const month: number = Number(dates.slice(5, 7));
  const day: number = Number(dates.slice(8, 10));

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(`${MAIN_COLOR}`);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onValid = async (input: checkTodo) => {
    const data = {
      calendarId: input.calendar,
      startDate: dates,
      title: input.title,
      labelColor: color,
      isTodo: true,
    };

    try {
      console.log(data);
      await post(`/schedule/day`, data);
      alert('할 일을 등록하였습니다');
      dispatch(closeModal());
      navigate('/calendar');
    } catch (err) {
      alert(err);
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log('실패');
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <span>
        {year}년 {month}월 {day}일
      </span>
      <InputBox>
        <Input
        type='text'
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
        {errors.title && <ErrorWord>{`${errors.title?.message}`}</ErrorWord>}
        <SelectCal
          {...register('calendar', {
            required: '캘린더를 선택해 주세요',
            validate: {
              checkValue: (value) =>
                value != 'no' || '소유 중인 캘린더 중에서 선택해 주세요',
            },
          })}
          errors={errors.calendar}
        >
          <option defaultValue="no" value="no">
            캘린더를 선택해 주세요
          </option>
          <option value="test1">테스트 1</option>
          <option value="test2">테스트 2</option>
        </SelectCal>

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
              setOpen((curr) => !curr);
            }}
            triangle={'top-right'}
            width={'380px'}
          />
        )}
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
