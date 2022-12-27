import React, { useState, useEffect, useRef } from 'react';
import * as Style from '../modal/modal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import * as API from 'api';

type MProps = {
  member: string[];
  onChange: (a: string) => void;
  setIsOpen: (a: any) => void;
};

type shareRes = {
  _id: string;
  email: string;
  calendarId: string;
  friendEmail: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

//그러면..공유캘린더로 봐야겠어요..!
export const Share = () => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarId = useSelector(
    (state: RootState) => state.persistedReducer.calendarId,
  );
  const email = useSelector((state: RootState) => state.persistedReducer.email);
  const [member, setMember] = useState([email]);
  //캘린더아이디로 공유된 사용자 담아오기
  //처음에 한번만 변경하면 됨!
  console.log(calendarId);
  const getMembers = async () => {
    const data: shareRes[] = await API.get(`/share/${calendarId}`);
    if (data.length !== 0) {
      let memberlist = [...member];
      //데이터의 친구목록만
      data.map((i) => memberlist.push(i.friendEmail));
      setMember(memberlist);
    }
  };

  useEffect(() => {
    getMembers();
  }, [calendarId]);

  const clickHandler = () => {
    console.log('is open', isOpen);
    setIsOpen(!isOpen);
  };

  //공유캘린더에 사용자추가api추가
  const changeHandler = async (femail: string) => {
    try {
      const res = await API.post('/share', {
        email,
        calendarId,
        friendEmail: femail,
      });
      if (res) {
        console.log('사용자 추가', femail);
        let newArr = [...member];
        newArr.push(femail);
        setMember(newArr);
      }
    } catch (error) {
      alert('공유실패..😢');
    }
  };

  return (
    <Style.Wrapper>
      <Style.Button type="button" onClick={clickHandler} value="공유" />
      {isOpen && (
        <Modal member={member} onChange={changeHandler} setIsOpen={setIsOpen} />
      )}
    </Style.Wrapper>
  );
};

const Modal: React.FC<MProps> = ({ member, onChange, setIsOpen }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    if (email.search('@') < 0) {
      setError(true);
      return;
    }
    setError(false);
    setEmail('');
    onChange(email);
  };

  const clickOutsideHandler = (e: any) => {
    if (!modal.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      window.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, []);

  return (
    <Style.Container ref={modal}>
      <Style.Title>캘린더공유</Style.Title>
      <Style.InputContainer>
        <Style.Input
          type="text"
          placeholder="공유할 멤버의 이메일을 입력해주세요"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Style.Button type="button" value="추가" onClick={clickHandler} />
      </Style.InputContainer>
      <Style.Error>{error && '이메일 형식을 입력해주세요'}</Style.Error>
      <Style.Members>
        멤버들
        {member.map((user, idx) => (
          <Style.Member key={`user${idx}`}>{user}</Style.Member>
        ))}
      </Style.Members>
    </Style.Container>
  );
};
