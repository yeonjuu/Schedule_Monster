import { basicFont, hoverDark, mainColor } from 'assets/styles';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const NotFound = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(
    (state: RootState) => state.persistedReducer.isLogin,
  );
  const clickHandler = () => {
    if (isLogin) {
      navigate('/calendar');
    } else {
      navigate('/');
    }
  };
  return (
    <Wrapper>
      <h1>잘못된 경로입니다😢</h1>
      <Container>
        <Move type="button" value="홈으로 이동" onClick={clickHandler} />
        <Image src="/notFound.png" alt="잘못된경로이미지" />
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 30px;
`;
const Image = styled.img`
  width: 300px;
  height: auto;
`;

const Move = styled.input`
  width: 20%;
  max-width: 130px;
  height: 30px;
  font-size: ${basicFont};
  background-color: ${mainColor};
  border: none;
  border-radius: 8px;
  :hover {
    background-color: ${hoverDark};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
