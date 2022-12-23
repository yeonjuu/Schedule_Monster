import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import * as Style from './form';
import { IRegister, IUser } from '../../types/userInterface';
import { login } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function validatePassword(pw: string): boolean {
  //4글자이상에 영어소문자숫자포함
  if (pw.match(/(?=.*\d)(?=.*[a-z]).{4,}/) !== null) {
    return true;
  } else {
    return false;
  }
}

export const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  const [isCheckPw, setIsCheckPw] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let registerInfo: IRegister = { nickname: '', email: '', password: '' };

  const registerSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(pw)) {
      setIsCheckPw(false);
      return;
    }
    registerInfo = {
      nickname,
      email,
      password: pw,
    };
    //사용자 등록
    const data = await API.post('/users', registerInfo);
    alert(`${data.nickname}님 환영합니다🙂`);

    //바로로그인
    const resData = await API.post('/users/login', { email, password: pw });
    console.log(resData);
    const { auth, point, nickname: resNickname } = resData.loginUser;
    const { accessToken, refreshToken } = resData;
    if (accessToken) {
      const user: IUser = {
        email,
        nickname: resNickname,
        point,
        auth,
      };
      //store에 로그인 유저 정보 저장
      dispatch(login(user));
      //토근 로컬 스토리지 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      //경로확인하기
      //관리자,일반사용자 구분해서 경로 변경
      if (auth === 'user') {
        navigate('/calendar');
      } else if (auth === 'admin') {
        navigate('/admin');
      }
    }
    //회원가입폼초기화
    setNickname('');
    setEmail('');
    setPw('');
    setConfirmPw('');
  };

  const checkNicknameHandler = () => {
    //닉네임 중복확인 api 처리
  };

  useEffect(() => {
    if (confirmPw === pw) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  }, [confirmPw, pw]);

  return (
    <Style.Form onSubmit={registerSubmitHandler}>
      <Style.Label htmlFor="nickname">닉네임</Style.Label>
      <Style.Input
        type="text"
        name="nickname"
        placeholder="닉네임을 작성해주세요"
        value={nickname}
        required
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      />
      <input type="button" onClick={checkNicknameHandler} value="중복확인" />
      <Style.Label htmlFor="email">이메일</Style.Label>
      <Style.Input
        type="email"
        name="email"
        value={email}
        placeholder="이메일을 입력해주세요"
        required
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Style.Label htmlFor="password">비밀번호</Style.Label>
      <Style.Input
        type="password"
        name="password"
        value={pw}
        placeholder="비밀번호를 입력해주세요"
        required
        autoComplete="off"
        onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <Style.Hint error={!isCheckPw}>
        비밀번호는 영어,숫자가 섞인 4글자 이상으로 입력해주세요
      </Style.Hint>
      <Style.Label htmlFor="confirmPassword">비밀번호 재확인</Style.Label>
      <Style.Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 다시 입력해주세요"
        value={confirmPw}
        required
        autoComplete="off"
        onChange={(e) => {
          setConfirmPw(e.target.value);
        }}
      />
      <Style.Hint error>
        {!isEqual && '비밀번호가 일치하지 않습니다.'}
      </Style.Hint>
      <Style.SubminInput type="submit" value="회원가입" disabled={!isEqual} />
    </Style.Form>
  );
};
