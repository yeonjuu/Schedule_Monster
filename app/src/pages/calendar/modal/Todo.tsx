import { MAIN_COLOR } from 'assets/styles';
import { ModalBtn } from 'components/button/buttons';
import { Input, InputBox } from 'components/input/inputs';
import React, { useState } from 'react';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../slice/modalSlice';
import { BtnBox, ErrorWord, PickColor, SelectCal } from './ModalStyle';

const Todo = ({ dates }: { dates: string | any }) => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>(`${MAIN_COLOR}`);

  const year: number = Number(dates.slice(0, 4));
  const month: number = Number(dates.slice(4, 6));
  const day: number = Number(dates.slice(6, 8));
  const navigate = useNavigate();
  return (
    <InputBox>
      <span>
        {year}년 {month}월 {day}일
      </span>

      <Input
        placeholder="내용을 입력해주세요"
        style={{ width: '100%' }}
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
      <SelectCal>
        <option value="second" selected>
          캘린더를 선택해 주세요
        </option>
        <option value="sㄴㅇcond">ㄴㅇㅇㄴ</option>
      </SelectCal>
      <PickColor onClick={() => setOpen((curr) => !curr)} labelColor={color}>
        라벨
      </PickColor>
      {open && (
        <TwitterPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
          triangle={'top-right'}
          width={'380px'}
        />
      )}
      <BtnBox>
        <ModalBtn
          onClick={() => {
            dispatch(closeModal());
            navigate('/calendar');
          }}
        >
          취소
        </ModalBtn>
        <ModalBtn
          onClick={() => {
            dispatch(closeModal());
            navigate('/calendar');
          }}
        >
          저장
        </ModalBtn>
      </BtnBox>
    </InputBox>
  );
};

export default Todo;
