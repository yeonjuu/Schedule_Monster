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
} from 'components/input/inputs';
import { TwitterPicker } from 'react-color';
import { useState } from 'react';
import { checkTodo, todoData } from 'types/calendarTypes';
import { changeCalendar, deleteCalendar } from '../slice/todoSlice';
import * as API from 'api';

const TodosContent = ({ scheduleId }: { scheduleId: string | undefined }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tmp: todoData|undefined = useSelector(
    (state: RootState) => state.todoSlice.todoList,
  ).find((item) => item.scheduleId === scheduleId);
  const content={...tmp};
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string|undefined>(content?.labelColor);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  
  const onValid = async (input: checkTodo) => {
      const data = {
        ...content,
        title: input.title,
        labelColor: color,
        isTodo: true,
      };

      try {
        console.log(data);
        await API.put(`/schedule/day`, data);
        dispatch(changeCalendar({scheduleId: scheduleId, content:data}))
        alert('할 일을 수정하였습니다');
        dispatch(toggleTodo());
        navigate('/calendar');
        dispatch(toggleTodo());
      } catch (err) {
        alert(err);
      }
    };

    const onInvalid = (errors: FieldErrors) => {
      console.log('실패');
      console.log(errors);
    };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      //api 통신 달아줄 것  
    if (e.target.checked) {
        content.isCompleted = true;
        console.log(content);
        alert('할 일을 완료하였습니다! 포인트가 지급됩니다.')
      dispatch(changeCalendar({scheduleId: scheduleId, content:content}))
       }
        else{
          content.isCompleted = false;
          dispatch(changeCalendar({scheduleId: scheduleId, content:content}))
        }
      }
      
      const onDelete=async()=>{
        // 캘린더 id 들어갈 것
        await API.delete(`/schedule/day/test1/${scheduleId}`);
        dispatch(deleteCalendar(scheduleId));
        alert('할 일이 삭제되었습니다!');
        dispatch(toggleTodo());
      }


  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <InputBox>
        <CheckContainer>
          <CheckBox
            type="checkbox"
            defaultChecked={content?.isCompleted}
            onChange={(e)=>onChange(e)}
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
          disabled={content.isCompleted}
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
      </InputBox>
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
        <ModalBtn type="submit" disabled={content.isCompleted}>수정</ModalBtn>
        <ModalBtn type="button" onClick={onDelete}>삭제</ModalBtn>
      </BtnBox>
    </form>
  );
};

export default TodosContent;
