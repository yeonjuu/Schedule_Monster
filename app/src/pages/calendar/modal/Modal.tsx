import { useEffect, useRef, useState } from 'react';
import Schedule from './ModalSchedule';
import Todo from './ModalTodo';
import { ModalContainer, Tab, ContentBox, TabBox, Background } from './ModalStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../slice/modalSlice';

const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const onClick = (tab: number) => {
    setValue(tab);
  };

  const { dates } = useParams();
  const tabs = [
    {
      name: '할 일',
      content: <Todo dates={dates} />,
    },
    {
      name: '일정',
      content: <Schedule dates={dates} />,
    },
  ];


  return (<>
    <Background onClick={(e:React.MouseEvent)=> {e.preventDefault();
          setTimeout(() => {
            dispatch(closeModal());
          }, 15);
      }}>
       </Background>
    <ModalContainer ref={modalRef}>
      <TabBox>
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={`${tab.name}-${i}`}
              onClick={() => {
                onClick(i);
              }}
              active={i === value}
            >
              <p>{tab.name}</p>
            </Tab>
          );
        })}
      </TabBox>
      <ContentBox>{tabs[value].content}</ContentBox>
    </ModalContainer>
    </>
  );
};

export { Modal };
