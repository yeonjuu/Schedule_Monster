import { useDispatch, useSelector } from 'react-redux';
import { BtnBox, PickColor } from './ModalStyle';

import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import {
  ErrorWord,
  Input,
  InputBox,
  ScheduleBox,
  SchedulePicker,
  SelectCal,
} from 'components/input/inputs';
import { ModalBtn } from 'components/button/buttons';
import { useNavigate } from 'react-router-dom';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import { mainColor } from 'assets/styles';
import { closeModal } from '../slice/modalSlice';
import { FieldErrors, useForm } from 'react-hook-form';
import { checkTodo } from 'types/calendarTypes';
import { post } from 'api';
import { add, format } from 'date-fns';
import { RootState } from 'store/store';

const Schedule = ({ dates }: { dates: string | any }) => {
  const year: number = Number(dates.slice(0, 4));
  const month: number = Number(dates.slice(5, 7));
  const day: number = Number(dates.slice(8, 10));
  const todayData = new Date(dates);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState(`${mainColor}`);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const list = useSelector((state: RootState) => state.persistedReducer.calendarList);
  
  useEffect(()=>{
    if(!year||!month||!day){
      dispatch(closeModal());
      navigate('/calendar');
    }else{
      setStartDate(new Date(year, month-1, day));
      setEndDate(add(new Date(year, month-1, day), {minutes: 30}));
    }
  },[]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setError('date', { message: '날짜 형식에 맞춰 작성해 주세요' });
    } else if (startDate >= endDate) {
      setError('date', {
        message: '종료 일자는 시작 일자보다 커야 합니다',
      });
    } else {
      clearErrors('date');
    }
  }, [endDate, startDate, setError, clearErrors]);

  const onValid = async (input: checkTodo) => {
    if (!startDate || !endDate) {
      setError('date', { message: '날짜 형식에 맞춰 작성해 주세요' });
    } else if (startDate >= endDate) {
      setError('date', {
        message: '종료 일자는 시작 일자보다 커야 합니다',
      });
    } else {
      
      const data = {
        calendarId: input.calendar,
        startDate: Number(format(startDate, 'YYMMdd')),
        startTime: Number(format(startDate, 'hhmm')),
        endDate: endDate,
        title: input.title,
        labelColor: color,
        isTodo: false,
      };
      console.log(data);
      console.log(format(startDate,'yyyyMMddhhmm'))
      console.log(format(endDate,'yyyyMMddhhmm'))
      try {
        console.log(data);
        await post(`/schedule/day`, data);
        alert('일정을 등록하였습니다');
        dispatch(closeModal());
        navigate('/calendar');
      } catch (err) {
        alert(err);
      }
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log('실패');
    console.log(errors);
    console.log(Number(format(startDate, 'hhmm')));
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <span>
        {/* {year}년 {month}월 {day}일 */}
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
        {errors.date && <ErrorWord>{`${errors.date?.message}`}</ErrorWord>}
        <SelectCal
          {...register('calendar', {
            required: '캘린더를 선택해 주세요',
            validate: {
              checkValue: (value) =>
                value !== 'no' || '소유 중인 캘린더 중에서 선택해 주세요',
            },
          })}
          errors={errors.calendar}
        >
          <option defaultValue="no" value="no">
            캘린더를 선택해 주세요
          </option>
          {list.map(item=>{return <option key={`${item.calendarId}`} value={item.calendarId}>{item.calendarName}</option>})}
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
      </InputBox>
    </form>
  );
};

export default Schedule;
