import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import * as Style from './form';
import { IRegister } from '../../types/userInterface';

export const Register = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [isEqual, setIsEqual] = useState(false);

  let registerInfo: IRegister = { nickname: '', email: '', password: '' };

  const registerSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
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

    //회원가입폼초기화
    setNickname('');
    setEmail('');
    setPw('');
    setConfirmPw('');
  };

  useEffect(() => {
    if (confirmPw === pw) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  }, [confirmPw]);

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
        onChange={(e) => {
          setPw(e.target.value);
        }}
      />
      <Style.Label htmlFor="confirmPassword">비밀번호 재확인</Style.Label>
      <Style.Input
        type="password"
        name="confirmPassword"
        placeholder="비밀번호를 다시 입력해주세요"
        value={confirmPw}
        required
        onChange={(e) => {
          setConfirmPw(e.target.value);
        }}
      />
      <Style.Error>{!isEqual && '비밀번호가 일치하지 않습니다.'}</Style.Error>
      <Style.SubminInput type="submit" value="회원가입" />
    </Style.Form>
  );
};
