import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const Logo = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(
    (state: RootState) => state.persistedReducer.isLogin,
  );

  const logoClickHandler = () => {
    if (isLogin) {
      navigate('/calendar');
    } else {
      navigate('/');
    }
  };
  return (
    <ImageWrapper onClick={logoClickHandler}>
      <Image src="/logo.png" alt="스케쥴몬스터로고" />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  width: 400px;
`;

const Image = styled.img`
  width: 100%;
  heihgt: auto;
`;
