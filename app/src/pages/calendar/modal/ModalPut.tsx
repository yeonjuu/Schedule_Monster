import { useEffect, useRef, useState } from 'react';
import {
  ModalContainer,
  Tab,
  ContentBox,
  TabBox,
  Background,
} from './ModalStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeTodo } from '../slice/modalSlice';
import TodosContent from './ModalPutTodo';
import ScheduleContent from './ModlaPutSchedule';

const TodosModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type QuizParams = {
    isTodo: string;
    scheduleId: string
  };
  

  const { scheduleId, isTodo }  = useParams<QuizParams>();

  return (
    <>
      <Background
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
       setTimeout(()=>{
        dispatch(closeTodo());
       },200)
        
        }}
      ></Background>
      <ModalContainer ref={modalRef}>
        <ContentBox>
          {isTodo === 'todo' ? (
            <TodosContent scheduleId={scheduleId} />
          ) : (
            <ScheduleContent scheduleId={scheduleId} />
          )}
        </ContentBox>
      </ModalContainer>
    </>
  );
};

export { TodosModal };
