import { useDispatch, useSelector } from 'react-redux';
import {
  BtnBox,
  PickColor,
  ScheduleBox,
  SchedulePicker,
  SelectCal,
} from './ModalStyle';

import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { Input, InputBox } from 'components/input/inputs';
import { ModalBtn } from 'components/button/buttons';
import { useNavigate } from 'react-router-dom';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import { MAIN_COLOR } from 'assets/styles';
import { closeModal } from '../slice/modalSlice';

const Schedule = ({ dates }: { dates: string | any }) => {
  const year = Number(dates.slice(0, 4));
  const month = Number(dates.slice(4, 6));
  const day = Number(dates.slice(6, 8));
  const todayData = new Date(year, month - 1, day);
  const [startDate, setStartDate] = useState<Date>(todayData);
  const [endDate, setEndDate] = useState<Date>(todayData);
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState(`${MAIN_COLOR}`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (endDate < startDate) {
      alert('시작 날짜보다 종료 날짜가 작으면 안 됩니다!');
    }
  }, [endDate]);

  return (
    <div>
      <span>
        {year}년 {month}월 {day}일
      </span>
      <form action="/">
        {/* <Input placeholder="내용을 입력해주세요" style={{ width: '100%' }} /> */}
        <InputBox>
          <ScheduleBox>
            <SchedulePicker
              wrapperClassName="datePicker"
              locale={ko}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={todayData}
              showTimeSelect
              dateFormat="yyyy년 M월 d일 h:mm aa"
            />
            <p>&nbsp;-&nbsp;</p>
            <SchedulePicker
              wrapperClassName="datePicker"
              locale={ko}
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsStart
              minDate={startDate}
              startDate={startDate}
              showTimeSelect
              dateFormat="yyyy년 M월 d일 h:mm aa"
            />
          </ScheduleBox>

          <SelectCal>
            <option value="second" selected>
              캘린더를 선택해 주세요
            </option>
            <option value="sㄴㅇcond">ㄴㅇㅇㄴ</option>
          </SelectCal>
          <PickColor
            onClick={() => setOpen((curr) => !curr)}
            labelColor={color}
          >
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
              type="button"
              onClick={() => {
                dispatch(closeModal());
                navigate('/calendar');
              }}
            >
              취소
            </ModalBtn>
            <ModalBtn
              type="submit"
              onClick={() => {
                dispatch(closeModal());
                navigate('/calendar');
              }}
            >
              저장
            </ModalBtn>
          </BtnBox>
        </InputBox>
      </form>
    </div>
  );
};

export default Schedule;
