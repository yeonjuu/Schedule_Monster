import React, { useState } from 'react';
import * as API from '../../api';
import * as Style from './form';
import { useDispatch } from 'react-redux';
import { login, adminlogin } from './userSlice';
import { IUser, ILogin, IAdmin } from '../../types/userInterface';
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
    // console.log('userInfo :', userInfo);

    try {
      const data = await API.post('/register/login', userInfo);
      // console.log(data);
      const { auth, point, nickname } = data.loginUser;
      const { accessToken, accessExp, refreshExp } = data;
      if (auth === 'user') {
        const { calendarId } = data.calendar;
        if (accessToken) {
          const user: IUser = {
            email,
            nickname,
            point,
            auth,
            calendarId,
          };
          //store에 로그인 유저 정보 저장
          dispatch(login(user));
          //토큰 로컬 스토리지 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('accessExp', accessExp);
          localStorage.setItem('refreshExp', refreshExp);
          alert(`안녕하세요😁 ${nickname}님`);
          navigate('/calendar');
        }
      } else {
        if (accessToken) {
          const admin: IAdmin = {
            email,
            password: pw,
            nickname,
            auth,
          };
          dispatch(adminlogin(admin));
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('accessExp', accessExp);
          localStorage.setItem('refreshExp', refreshExp);
          alert(`안녕하세요😁 ${nickname} 관리자님`);
          navigate('/admin');
        }
      }
    } catch (error) {
      if (error.status === 401) {
        const msg = error.data.message.split('.')[0];
        setErrorContent(msg);
      } else {
        alert('로그인 실패');
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
      <Style.Message error>{errorContent}</Style.Message>
      <Style.SubminInput type="submit" value="로그인" />
    </Style.Form>
  );
};
