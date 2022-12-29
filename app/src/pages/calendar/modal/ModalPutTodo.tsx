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
} from 'components/input/inputs';
import { TwitterPicker } from 'react-color';
import { useState, useEffect } from 'react';
import { checkTodo, todoData } from 'types/calendarTypes';
import { updateCalendar } from '../slice/todoSlice';
import * as API from 'api';
import { addPoint, minusPoint } from 'pages/login/userSlice';

const TodosContent = ({ scheduleId }: { scheduleId: string | undefined }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tmp: todoData | undefined = useSelector(
    (state: RootState) => state.todoSlice.todoList,
  ).find((item) => item.scheduleId === scheduleId);
  const content = { ...tmp };
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>(content?.labelColor);
  const list = useSelector(
    (state: RootState) => state.persistedReducer.calendarList,
  );
  const calendarId = useSelector(
    (state: RootState) => state.persistedReducer.calendarId,
  );
  const userPoint=useSelector(
    (state: RootState) => state.persistedReducer.point,
  );
  const [compltedCheck, setCompleted] = useState<boolean | undefined>(
    content.isCompleted,
  );

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const inputTitle = watch('title');

  const checkTitle = () => {
    if (inputTitle === content?.title) {
      return false;
    } else if (inputTitle === undefined) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    const postComplited = async () => {
      const monthData = {
        calendarId: `${calendarId}`,
        startYearMonth: `${content.startYYYYMM}`,
      };
      const getThisCalendar = await API.post(`/schedule/month`, monthData);
      dispatch(updateCalendar(getThisCalendar));
    };
    postComplited();
  }, [content.isCompleted]);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //api 통신 달아줄 것
    if (e.target.checked) {
      setCompleted(true);
      const data = {
        scheduleId: content.scheduleId,
      };

      await API.put(`/schedule/iscompleted`, data);
      const monthData = {
        calendarId: `${calendarId}`,
        startYearMonth: `${content.startYYYYMM}`,
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
        startYearMonth: `${content.startYYYYMM}`,
      };
      const getThisCalendar = await API.post(`/schedule/month`, monthData);
      dispatch(updateCalendar(getThisCalendar));
      alert('일정을 취소하였습니다. 지급된 포인트가 회수됩니다.');
      dispatch(minusPoint(50));
      
    }
  };

  const onDelete = async () => {
    // 캘린더 id 들어갈 것
    await API.delete(`/schedule/day/${calendarId}/${scheduleId}`);
    alert('할 일이 삭제되었습니다!');
    const monthData = {
      calendarId: `${calendarId}`,
      startYearMonth: `${content.startYYYYMM}`,
    };
    const getThisCalendar = await API.post(`/schedule/month`, monthData);
    dispatch(updateCalendar(getThisCalendar));

    dispatch(closeTodo());
  };

  const onValid = async (input: checkTodo) => {
    const data = {
      ...content,
      startDate: content.startYYYYMMDD?.toString(),
      endDate: content.startYYYYMMDD?.toString(),
      title: input.title,
      labelColor: color,
      isTodo: true,
    };

    try {
      await API.put(`/schedule/day`, data);
      alert('일정을 수정하였습니다');
      const monthData = {
        calendarId: `${calendarId}`,
        startYearMonth: `${content.startYYYYMM}`,
      };
      const getThisCalendar = await API.post(`/schedule/month`, monthData);
      dispatch(updateCalendar(getThisCalendar));
      dispatch(closeTodo());
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
      <InputBox>
        <CheckContainer>
          <CheckBox
            type="checkbox"
            defaultChecked={content?.isCompleted}
            onChange={(e) => onChange(e)}
            disabled={checkTitle()}
          />

          <CheckInput
            disabled={compltedCheck}
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
      </InputBox>
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
        <ModalBtn type="submit" disabled={content?.isCompleted}>
          수정
        </ModalBtn>
        <ModalBtn type="button" onClick={onDelete}>
          삭제
        </ModalBtn>
      </BtnBox>
    </form>
  );
};

export default TodosContent;
