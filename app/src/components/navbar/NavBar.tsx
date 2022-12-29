import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../pages/login/userSlice';
import * as Nav from './nav';
import { useNavigate } from 'react-router-dom';

type IProps = {
  nickname: string;
  point?: number;
  onClick: () => void;
};

export const NavBar = () => {
  const user = useSelector((state: RootState) => state.persistedReducer);
  const point = useSelector((state: RootState) => state.persistedReducer.point);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nickname, auth, isLogin } = user;

  const clickLogoutHandler = () => {
    const isLogout = window.confirm('로그아웃하시겠습니까?');
    if (isLogout) {
      dispatch(logout());
      window.localStorage.clear();
      navigate('/login');
    }
    return;
  };

  return (
    <Nav.Wrapper>
      {isLogin ? (
        auth === 'admin' ? (
          <StateAdminLogin nickname={nickname} onClick={clickLogoutHandler} />
        ) : (
          <StateUserLogin
            nickname={nickname}
            point={point}
            onClick={clickLogoutHandler}
          />
        )
      ) : (
        <StateLogout />
      )}
    </Nav.Wrapper>
  );
};

const StateUserLogin = ({ nickname, point, onClick }: IProps) => {
  const navigate = useNavigate();

  return (
    <Nav.TabWrapper>
      <Nav.Tab
        onClick={() => {
          navigate('/mypage');
        }}
      >
        마이페이지
      </Nav.Tab>
      <Nav.Tab
        onClick={() => {
          navigate('/store');
        }}
      >
        상점
      </Nav.Tab>
      <Nav.Tab nolink>💰{point}</Nav.Tab>
      <Nav.Tab onClick={onClick}>로그아웃</Nav.Tab>
    </Nav.TabWrapper>
  );
};

const StateLogout = () => {
  const navigate = useNavigate();

  return (
    <Nav.TabWrapper>
      <Nav.Tab
        onClick={() => {
          navigate('/login');
        }}
      >
        로그인
      </Nav.Tab>
    </Nav.TabWrapper>
  );
};

const StateAdminLogin = ({ nickname, onClick }: IProps) => {
  return (
    <Nav.TabWrapper>
      <Nav.Tab nolink>{nickname} 관리자님</Nav.Tab>
      <Nav.Tab onClick={onClick}>로그아웃</Nav.Tab>
    </Nav.TabWrapper>
  );
};
