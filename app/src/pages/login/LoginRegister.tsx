import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import * as Style from './form';
import { Login } from './Login';
import { Register } from './Register';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const LoginRegister = () => {
  const [currTab, setCurrTab] = useState('login');
  const navigate = useNavigate();
  const { isLogin, auth } = useSelector(
    (state: RootState) => state.persistedReducer,
  );

  const logoClickHandler = () => {
    navigate('/');
  };
  console.log(isLogin, auth, isLogin && auth === 'user');

  return (
    <>
      {isLogin && auth === 'user' ? (
        <Navigate to="/calendar" replace={true} />
      ) : (
        <div>
          <Style.LogoWrapper onClick={logoClickHandler}>
            <img src="/logo.png" alt="스케줄몬스터로고" />
          </Style.LogoWrapper>

          <Style.Container>
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
        </div>
      )}
    </>
  );
};
