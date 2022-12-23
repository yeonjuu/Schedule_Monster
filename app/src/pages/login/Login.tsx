import React, { useState } from 'react';
import * as API from '../../api';
import * as Style from './form';
import { useDispatch } from 'react-redux';
import { login } from './userSlice';
import { IUser, ILogin } from '../../types/userInterface';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [errorContent, setErrorContent] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let userInfo: ILogin = { email: '', password: '' };

  const loginSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    userInfo = { email, password: pw };
    console.log('userInfo :', userInfo);

    try {
      const data = await API.post('/users/login', userInfo);
      console.log(data);
      const { auth, point, nickname } = data.loginUser;
      const { accessToken, refreshToken } = data;
      if (accessToken) {
        const user: IUser = {
          email,
          nickname,
          point,
          auth,
        };
        //store에 로그인 유저 정보 저장
        dispatch(login(user));
        //토근 로컬 스토리지 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        alert(`안녕하세요😁 ${nickname}님`);

        //경로확인하기
        //관리자,일반사용자 구분해서 경로 변경
        if (auth === 'user') {
          navigate('/calendar');
        } else if (auth === 'admin') {
          navigate('/admin');
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        const msg = error.message;
        setErrorContent(msg);
      }
    }
  };

  return (
    <Style.Form onSubmit={loginSubmitHandler}>
      <Style.Label htmlFor="userId">이메일</Style.Label>
      <Style.Input
        type="email"
        name="userId"
        placeholder="이메일을 입력해주세요"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Style.Label htmlFor="userPw">비밀번호</Style.Label>
      <Style.Input
        type="password"
        name="userPw"
        placeholder="비밀번호를 입력해주세요"
        required
        autoComplete="off"
        onChange={(e) => setPw(e.target.value)}
      />
      {errorContent}
      <Style.SubminInput type="submit" value="로그인" />
    </Style.Form>
  );
};
