import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Main = () => {
  const navigate = useNavigate();
  //사용자유저토큰이 있으면 캘린더 화면으로 라우팅해주면 좋곘다
  const startClickHandler = () => {
    navigate('/login');
  };

  return (
    <MainContainer>
      <Logo src="/logo.png" alt="스케줄몬스터로고" />
      <StartButton onClick={startClickHandler}>시작하기</StartButton>
      <Banner>배너1, 편리한 일정관리</Banner>
      <Banner>배너2, 일정과 할 일로 수집할 수 있는 포켓몬</Banner>
      <div>서비스 소개 정보: 푸터</div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  width: 500px;
  height: auto;
`;
const Banner = styled.div`
  width: 100%;
  height: 610px;
  background-color: rgb(202, 202, 202);

  + div {
    margin-top: 50px;
  }
`;

const StartButton = styled.button`
  position: absolute;
  top: 28%;
  left: 20%;
  width: 140px;
  height: 40px;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
  line-height: 40px;
  border: none;
  color: #000000;
  text-decoration: none;
  background-color: #a2bcfe;

  :hover {
    background-color: #85a6fc;
  }
`;
