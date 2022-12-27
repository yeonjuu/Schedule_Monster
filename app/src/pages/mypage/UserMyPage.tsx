import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IUser } from '../../types/userInterface';
import { Header } from '../../components/header/Header';
import { UserInfo } from './UserInfo';
import { UserStatic } from './UserStatic';

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
