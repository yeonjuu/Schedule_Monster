import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Header } from '../../components/header/Header';
import { UserInfo } from './UserInfo';
import { UserStatic } from './UserStatic';
import { User } from './style';
import { Navigate } from 'react-router-dom';

export const MyPage = () => {
  const user = useSelector((state: RootState) => state.persistedReducer);
  const { nickname, email, isLogin } = user;

  return (
    <>
      {isLogin ? (
        <div style={{ height: '100vh' }}>
          <Header />
          <User>
            <UserInfo nickname={nickname} email={email} />
            <UserStatic email={user.email} />
          </User>
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};
