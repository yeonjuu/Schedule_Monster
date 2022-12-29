import { ModalBtn } from 'components/button/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { BtnBox, PickColor } from './ModalStyle';
import { useNavigate } from 'react-router-dom';
import { closeTodo } from '../slice/modalSlice';
import { FieldErrors, useForm } from 'react-hook-form';
import {
  CheckBox,
  CheckContainer,
  CheckInput,
  ErrorWord,
  Input,
  InputBox,
  ScheduleBox,
  SchedulePicker,
} from 'components/input/inputs';
import { TwitterPicker } from 'react-color';
import { useEffect, useState, useRef } from 'react';
import { checkTodo, scheduleData, todoData } from 'types/calendarTypes';
import { updateCalendar } from '../slice/todoSlice';
import * as API from 'api';
import { ko } from 'date-fns/esm/locale';
import { add, format } from 'date-fns';
import { addPoint, minusPoint } from 'pages/login/userSlice';

const ScheduleContent = ({
  scheduleId,
}: {
  scheduleId: string | undefined;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const calendarId = useSelector(
    (state: RootState) => state.persistedReducer.calendarId,
  );

  //전역 State에서 특정 날짜 값을 가져온다
  const tmp: scheduleData | undefined = useSelector(
    (state: RootState) => state.todoSlice.todoList,
  ).find((item) => item.scheduleId === scheduleId);

  const content = { ...tmp };
  const startYear = Number(content.startYYYYMM?.toString().slice(0, 4));
  const startMonth = Number(content.startYYYYMM?.toString().slice(-2));
  const startDay = Number(content.startYYYYMMDD?.toString().slice(-2));
  const startHour =
    Number(content.startTime?.toString().length) == 4
      ? Number(content.startTime?.toString().slice(0, 2))
      : Number(content.startTime?.toString().length) == 3
      ? Number(content.startTime?.toString().slice(0, 1))
      : 0;

  const startMin = Number(content.startTime?.toString().slice(-2));
  const endYear = Number(content.endYYYYMM?.toString().slice(0, 4));
  const endMonth = Number(content.endYYYYMM?.toString().slice(-2));
  const endDay = Number(content.endYYYYMMDD?.toString().slice(-2));
  const endHour =
    Number(content.endTime?.toString().length) == 4
      ? Number(content.endTime?.toString().slice(0, 2))
      : Number(content.endTime?.toString().length) == 3
      ? Number(content.endTime?.toString().slice(0, 1))
      : 0;

  const endMin = Number(content.endTime?.toString().slice(-2));

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>(content?.labelColor);
  const [Content, setContent] = useState(content);
  const [compltedCheck, setCompleted] = useState<boolean | undefined>(
    content.isCompleted,
  );
  const userPoint=useSelector(
    (state: RootState) => state.persistedReducer.point,
  );
  const {
    watch,
    setError,
    clearErrors,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const inputTitle = watch('title');

  useEffect(() => {
    if (
      !startYear ||
      !startMonth ||
      !startDay ||
      !endYear ||
      !endMonth ||
      !endDay
    ) {
      dispatch(closeTodo());
      navigate('/calendar');
    } else {
      setStartDate(
        new Date(startYear, startMonth - 1, startDay, startHour, startMin),
      );
      setEndDate(new Date(endYear, endMonth - 1, endDay, endHour, endMin));
    }
  }, []);

  const checkTitle = () => {
    if (inputTitle === Content?.title) {
      return false;
    } else if (inputTitle === undefined) {
      return false;
    } else {
      return true;
    }
  };
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCompleted(true);
      const data = {
        scheduleId: content.scheduleId,
      };

      await API.put(`/schedule/iscompleted`, data);

      const monthData = {
        calendarId: `${calendarId}`,
        startYearMonth: `${Content.startYYYYMM}`,
      };
      const getThisCalendar = await API.post(`/schedule/month`, monthData);
      dispatch(updateCalendar(getThisCalendar));
      alert('할 일을 완료하였습니다! 💰50포인트가 지급됩니다.');
      dispatch(addPoint(50));
     
    
    } else {
      setCompleted(false);
      const data = {
        scheduleId: content.scheduleId,
      };

      await API.put(`/schedule/iscompleted`, data);

      const monthData = {
        calendarId: `${calendarId}`,
        startYearMonth: `${Content.startYYYYMM}`,
      };
      const getThisCalendar = await API.post(`/schedule/month`, monthData);

      dispatch(updateCalendar(getThisCalendar));
      alert('일정을 취소하였습니다. 지급된 포인트가 회수됩니다.');
      dispatch(minusPoint(50));
     
    }
  };

  const onDelete = async () => {
    await API.delete(`/schedule/day/${calendarId}/${scheduleId}`);
    alert('할 일이 삭제되었습니다!');
    const monthData = {
      calendarId: `${calendarId}`,
      startYearMonth: `${Content.startYYYYMM}`,
    };
    const getThisCalendar = await API.post(`/schedule/month`, monthData);
    dispatch(updateCalendar(getThisCalendar));

    dispatch(closeTodo());
  };

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
        ...Content,
        startDate: format(startDate, 'yyyyMMdd'),
        startTime: format(startDate, 'HHmm'),
        endDate: format(endDate, 'yyyyMMdd'),
        endTime: format(endDate, 'HHmm'),
        title: input.title,
        labelColor: color,
        isTodo: false,
        isCompleted: compltedCheck,
      };

      try {
        await API.put(`/schedule/day`, data);
        alert('일정을 수정하였습니다');
        const monthData = {
          calendarId: `${calendarId}`,
          startYearMonth: `${Content.startYYYYMM}`,
        };
        const getThisCalendar = await API.post(`/schedule/month`, monthData);
        dispatch(updateCalendar(getThisCalendar));
        dispatch(closeTodo());
        navigate('/calendar');
      } catch (err) {
        alert(err);
      }
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    alert('실패');
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <InputBox>
        <CheckContainer>
          <CheckBox
            type="checkbox"
            defaultChecked={Content?.isCompleted}
            onChange={(e) => onChange(e)}
            disabled={checkTitle()}
          />

          <CheckInput
            disabled={compltedCheck}
            type="text"
            defaultValue={Content?.title}
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
            disabled={compltedCheck}
            type="button"
            onClick={() => setOpen((curr) => !curr)}
            labelColor={color}
          >
            라벨
          </PickColor>
          {errors.calendar && (
            <ErrorWord>{`${errors.calendar?.message}`}</ErrorWord>
          )}
        </CheckContainer>

        {errors.title && <ErrorWord>{`${errors.title?.message}`}</ErrorWord>}
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

        <ScheduleBox>
          <SchedulePicker
            disabled={compltedCheck}
            wrapperClassName="datePicker"
            locale={ko}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            showTimeSelect
            dateFormat="yyyy년 M월 d일 h:mm aa"
          />
          <p>&nbsp;-&nbsp;</p>
          <SchedulePicker
            disabled={compltedCheck}
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

        <BtnBox>
          <ModalBtn
            type="button"
            onClick={() => {
              dispatch(closeTodo());
              navigate('/calendar');
            }}
          >
            취소
          </ModalBtn>
          <ModalBtn type="submit" disabled={compltedCheck}>
            수정
          </ModalBtn>
          <ModalBtn type="button" onClick={onDelete}>
            삭제
          </ModalBtn>
        </BtnBox>
      </InputBox>
    </form>
  );
};

export default ScheduleContent;
