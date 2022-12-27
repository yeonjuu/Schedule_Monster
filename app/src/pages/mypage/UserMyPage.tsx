import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import * as Style from './style';
import { changeNickname } from 'pages/login/userSlice';
import * as API from '../../api';
import { IUser } from '../../types/userInterface';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header/Header';

export const MyPage = () => {
  const user: IUser = useSelector((state: RootState) => state.persistedReducer);
  const { nickname, email } = user;
  return (
    <div>
      <Header />
      <UserInfo nickname={nickname} email={email} />
      <UserStatic email={user.email} />
    </div>
  );
};

type UserInfoProps = {
  nickname: string;
  email: string;
};
type UserStaticProps = {
  email: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ nickname, email }) => {
  const [isChange, setIsChange] = useState(false);
  const [mypageNickname, setMypageNickname] = useState(nickname);
  const [checkMsg, setCheckMsg] = useState('');
  const dispatch = useDispatch();

  const clickHandler = () => {
    setIsChange(!isChange);
  };

  const clickNicknameHandler = () => {
    //중복확인
    const checked = true;
    if (checked) {
      setCheckMsg('사용가능한 닉네임입니다.');
      //정보수정 api
    } else {
      setCheckMsg('중복된 닉네임입니다. 다른 닉네임으로 변경해주세요🧐');
      return;
    }
    //정보수정api
    alert('닉네임이 변경되었습니다🤗');
    dispatch(changeNickname(mypageNickname));
    setIsChange(!isChange);
    setCheckMsg('');
  };

  return (
    <Style.InfoWrapper>
      <Style.Head>기본정보</Style.Head>
      <Style.UpdateButton
        type="button"
        value="정보수정"
        onClick={clickHandler}
      />
      <Style.Infos>
        <Style.Info>
          닉네임
          <Style.InfoInput
            type="text"
            value={mypageNickname}
            disabled={!isChange}
            onChange={(e) => {
              setMypageNickname(e.target.value);
            }}
          />
          {isChange && (
            <Style.Button
              type="button"
              value="변경"
              onClick={clickNicknameHandler}
            />
          )}
          <Style.Message>{checkMsg}</Style.Message>
        </Style.Info>
        <Style.Info>
          이메일
          <Style.InfoInput type="text" value={email} disabled />
        </Style.Info>
      </Style.Infos>
    </Style.InfoWrapper>
  );
};

const UserStatic: React.FC<UserStaticProps> = (email) => {
  const [myCharacter, setMyCharacter] = useState(0);
  const [total, setToal] = useState(0);
  const navigate = useNavigate();

  const getCharactorData = async (email: UserStaticProps) => {
    //추후 param으로 전송 `/characterlist/:${user.email}`
    // const res = await API.get('/characterlist');
    //개별 데이터랑, 전체 데이터
    const _total = await API.get('/characters/all');
    const res = [];
    setMyCharacter(res.length);
    setToal(_total.length);
  };

  useEffect(() => {
    getCharactorData(email);
  }, [email]);

  return (
    <Style.StaticWrapper>
      <Style.StaticHead>통계</Style.StaticHead>
      <Style.TodoBlock>
        <Style.BlockTitle>할일 완료 통계 자료</Style.BlockTitle>
      </Style.TodoBlock>
      <Style.MonsterBlock>
        <Style.BlockTitle>현재 수집한 몬스터 수</Style.BlockTitle>
        <Style.Navigate
          onClick={() => {
            navigate('/store/characters');
          }}
        >
          보러가기😈
        </Style.Navigate>
        <Style.Wrapper>
          <Style.MyChar>{myCharacter}</Style.MyChar>
          <Style.TotalChar>/ {total}</Style.TotalChar>
        </Style.Wrapper>
      </Style.MonsterBlock>
      <Style.RankBlock>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <img
            src="/serviceNotYet.png"
            alt="서비스 준비중"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </Style.RankBlock>
    </Style.StaticWrapper>
  );
};
