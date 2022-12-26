import { ModalBtn } from 'components/button/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import { BtnBox, PickColor } from './ModalStyle';
import { useNavigate } from 'react-router-dom';
import { toggleTodo } from '../slice/modalSlice';
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
import { useEffect, useState } from 'react';
import { checkTodo, todoData } from 'types/calendarTypes';
import { changeCalendar, deleteCalendar } from '../slice/todoSlice';
import * as API from 'api';
import { ko } from 'date-fns/esm/locale';
import { format } from 'date-fns';

const ScheduleContent = ({
  scheduleId,
}: {
  scheduleId: string | undefined;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tmp: todoData | undefined = useSelector(
    (state: RootState) => state.todoSlice.todoList,
  ).find((item) => item.scheduleId === scheduleId);

  const content = { ...tmp };

  const tmpYear = Number(content.startDate?.slice(0, 4));
  const tmpMonth = Number(content.startDate?.slice(4, 6));
  const tmpDay = Number(content.startDate?.slice(6, 8));

  const [startDate, setStartDate] = useState<Date>(
    new Date(),
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(),
  );
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>(content?.labelColor);

  const {
    setError,
    clearErrors,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      content.isCompleted = true;
      console.log(content);
      alert('할 일을 완료하였습니다! 포인트가 지급됩니다.');
      dispatch(changeCalendar({ scheduleId: scheduleId, content: content }));
    } else {
      content.isCompleted = false;
      dispatch(changeCalendar({ scheduleId: scheduleId, content: content }));
    }
  };

  const onDelete = async () => {
    await API.delete(`/schedule/day/test1/${scheduleId}`);
    dispatch(deleteCalendar(scheduleId));
    alert('일정이 삭제되었습니다!');
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
        ...content,
        startDate: format(startDate, 'yyyyMMdd-hh:mm'),
        endDate: format(endDate, 'yyyyMMdd-hh:mm'),
        title: input.title,
        labelColor: color,
        isTodo: false,
      };
      console.log(data);

      try {
        console.log(data);
        dispatch(changeCalendar({ scheduleId: scheduleId, content: data }));
        // await API.put(`/schedule/day`, data);
        alert('일정을 등록하였습니다');
        dispatch(toggleTodo());
        navigate('/calendar');
      } catch (err) {
        alert(err);
      }
    }
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log('실패');
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <InputBox>
        <CheckContainer>
          <CheckBox
            type="checkbox"
            defaultChecked={content?.isCompleted}
            onChange={(e) => onChange(e)}
          />

          <CheckInput
            disabled={content.isCompleted}
            type="text"
            defaultValue={content?.title}
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
        </CheckContainer>

        {errors.title && <ErrorWord>{`${errors.title?.message}`}</ErrorWord>}
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

        <ScheduleBox>
          <SchedulePicker
            disabled={content.isCompleted}
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
            disabled={content.isCompleted}
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
              dispatch(toggleTodo());
              navigate('/calendar');
            }}
          >
            취소
          </ModalBtn>
          <ModalBtn type="submit" disabled={content.isCompleted}>
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