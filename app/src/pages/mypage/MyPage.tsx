import React from 'react';
import { Logo } from 'components/logo/Logo';
import { NavBar } from 'components/navbar/NavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';

export const MyPage = () => {
  return (
    <div>
      <Logo />
      <NavBar />
      <UserInfo />
      <UserStatic />
    </div>
  );
};

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.persistedReducer);
  const { nickname, email } = user;

  return (
    <InfoWrapper>
      <Head>기본정보</Head>
      <Infos>
        <div>
          닉네임
          <input type="text" value={nickname} disabled />
        </div>
        <div>이메일 {email}</div>
      </Infos>
    </InfoWrapper>
  );
};

const UserStatic = () => {
  return (
    <StaticWrapper>
      <StaticHead>통계</StaticHead>
      <TodoBlock>
        <div>할일 완료 통계 자료</div>
      </TodoBlock>
      <MonsterBlock>
        <div>현재 수집한 몬스터수</div>
      </MonsterBlock>
      <RankBlock>
        <div>랭킹순위보기</div>
      </RankBlock>
    </StaticWrapper>
  );
};

const InfoWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-rows: 50px 200px;
  width: 60%;
`;
const Head = styled.h3`
  font-size: 1.7em;
  padding: 10px 0 0 10px;
`;

const StaticHead = styled.h3`
  grid-area: h;
  font-size: 1.7em;
  padding: 10px 0 0 10px;
`;

const Infos = styled.div`
  border: 1px solid #f2f2f2;
`;

const StaticWrapper = styled.div`
  display: grid;
  width: 60%;
  margin: 0 auto;
  grid-template-areas:
    'h h'
    'a a'
    'b c';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 200px 200px;
`;

const TodoBlock = styled.div`
  grid-area: a;
  border: 1px solid #f2f2f2;
`;
const MonsterBlock = styled.div`
  grid-area: b;
  border: 1px solid #f2f2f2;
`;
const RankBlock = styled.div`
  grid-area: c;
  border: 1px solid #f2f2f2;
`;
