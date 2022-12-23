import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Style from './form';
import { Login } from './Login';
import { Register } from './Register';

export const LoginRegister = () => {
  const [currTab, setCurrTab] = useState('login');
  const navigate = useNavigate();

  const logoClickHandler = () => {
    navigate('/');
  };

  return (
    <Style.Container>
      <Style.LogoWrapper onClick={logoClickHandler}>
        <img src="/logo.png" alt="스케줄몬스터로고" />
      </Style.LogoWrapper>
      <Style.Title>로그인 또는 회원가입</Style.Title>
      <Style.Tabs>
        <Style.Tab
          active={currTab === 'login'}
          onClick={() => setCurrTab('login')}
        >
          로그인
        </Style.Tab>
        <Style.Tab
          active={currTab === 'register'}
          onClick={() => setCurrTab('register')}
        >
          회원가입
        </Style.Tab>
      </Style.Tabs>
      {currTab === 'login' ? <Login /> : <Register />}
    </Style.Container>
  );
};
