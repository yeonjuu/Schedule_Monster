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
import { toggleTodo } from '../slice/modalSlice';
import TodosContent from './TodosContent';
import ScheduleContent from './ScheduleContent';

const TodoModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scheduleId, isTodo } = useParams();


  return (
    <>
      <Background
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          setTimeout(() => {
            dispatch(toggleTodo());
          }, 20);
        }}
      ></Background>
      <ModalContainer ref={modalRef}>
        <ContentBox>
          {isTodo === 'true' ? (
            <TodosContent scheduleId={scheduleId} />
          ) : (
            <ScheduleContent scheduleId={scheduleId} />
          )}
        </ContentBox>
      </ModalContainer>
    </>
  );
};

export { TodoModal };
