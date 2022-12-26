import { useEffect, useRef, useState } from 'react';
import { ModalContainer, Tab, ContentBox, TabBox } from './ModalStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleTodo } from '../slice/modalSlice';
import TodosContent from './TodosContent';
import ScheduleContent from './ScheduleContent';

const TodoModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scheduleId, isTodo } = useParams();

  useEffect(() => {
    console.log(isTodo);
    const clickOutside = (e: React.BaseSyntheticEvent | MouseEvent) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        //current.contains(e.targt)은 이벤트를 실행한 e.target이 포함되어 있다면 true/아니면 false
        //여기서는 modalRef 바깥에서 event가 발생하면 ~ 으로 조건 걸었다
        dispatch(toggleTodo());
        navigate('/calendar');
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <ModalContainer ref={modalRef}>
      <ContentBox>
        {isTodo==='true' ? <TodosContent scheduleId={scheduleId} /> : <ScheduleContent scheduleId={scheduleId} />}
   
      </ContentBox>
    </ModalContainer>
  );
};

export { TodoModal };
