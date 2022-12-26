import React, { useState, useEffect } from 'react';
import * as API from '../../api';
import * as Style from './form';
import { IUser } from '../../types/userInterface';
import { login } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorMsg, hintMsg } from 'assets/styles';

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
  const [isChecked, setIsChecked] = useState(false);
  const [msg, setMsg] = useState({
    content: '',
    color: '',
  });
  const [authCode, setAuthCode] = useState('');
  const [resAuthNum, setResAuthNum] = useState('');
  const [onAuth, setOnAuth] = useState(false);
  const [authMsg, setAuthMsg] = useState({
    content: '',
    color: '',
    checked: false,
  });
  const [emailErr, setEmailErr] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    //중복체크를 하지 않은 경우
    if (!isChecked) {
      setMsg({
        content: '중복을 확인해주세요',
        color: errorMsg,
      });
      return;
    }
    //비밀번호
    if (!validatePassword(pw)) {
      setIsCheckPw(false);
      return;
    }
    //이메일인증했니?
    if (!onAuth) {
      setAuthMsg({
        content: '이메일 인증을 해주세요',
        color: errorMsg,
        checked: false,
      });
      return;
    }
    //인증번호확인했니?
    if (!authMsg.checked) {
      setAuthMsg({
        content: '인증번호를 확인해주세요',
        color: errorMsg,
        checked: false,
      });
      return;
    }

    //사용자 등록
    const data = await API.post('/users', {
      nickname,
      email,
      password: pw,
    });
    alert(`${data.nickname}님 환영합니다🙂`);

    //로그인 연결
    const resData = await API.post('/users/login', { email, password: pw });
    console.log(resData);
    const { auth, point, nickname: resNickname } = resData.loginUser;
    const { accessToken } = resData;
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

  const checkNicknameHandler = async () => {
    const isRight = await API.get(`/users/nickname/${nickname}`);
    if (isRight) {
      setMsg({
        content: '사용가능한 닉네임입니다.',
        color: '#388e3c',
      });
      setIsChecked(true);
    } else {
      setMsg({
        content: '중복된 닉네임입니다.',
        color: errorMsg,
      });
    }
  };

  const checkEmailHandler = async () => {
    if (email === '') {
      alert('이메일을 작성해주세요');
      return;
    }
    //이메일 인증 api
    try {
      const { authNum } = await API.get(`/users/auth/${email}`);
      console.log('response : ', authNum);
      setOnAuth(true);
      setResAuthNum(authNum);
    } catch (error) {
      setEmailErr(error.data.message);
    }
  };

  const checkAuthCodeHandler = () => {
    if (authCode !== resAuthNum) {
      setAuthMsg({
        content: '인증번호가 옳지 않습니다',
        color: errorMsg,
        checked: false,
      });
      return;
    }
    setAuthMsg({
      content: '인증번호 확인완료',
      color: '#388e3c',
      checked: true,
    });
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
      <Style.InputWrapper>
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
        <Style.Button
          type="button"
          onClick={checkNicknameHandler}
          value="중복확인"
        />
      </Style.InputWrapper>
      <Style.Message color={msg.color}>{msg.content}</Style.Message>
      <Style.Label htmlFor="email">이메일</Style.Label>
      <Style.InputWrapper>
        <Style.Input
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{' '}
        <Style.Button
          type="button"
          onClick={checkEmailHandler}
          value="이메일인증"
        />
      </Style.InputWrapper>
      <Style.Message color={errorMsg}>{emailErr}</Style.Message>
      <Style.InputWrapper style={{ marginTop: '3px' }}>
        <Style.Input
          type="text"
          placeholder="6자리 인증번호 입력"
          value={authCode}
          disabled={!onAuth}
          onChange={(e) => {
            setAuthCode(e.target.value);
          }}
        />
        <Style.Button
          type="button"
          value="확인"
          disabled={!onAuth}
          onClick={checkAuthCodeHandler}
        />
      </Style.InputWrapper>
      <Style.Message color={authMsg.color}>{authMsg.content}</Style.Message>
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
      <Style.Message color={hintMsg} error={!isCheckPw}>
        영어,숫자가 섞인 4글자 이상으로 입력해주세요
      </Style.Message>
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

      <Style.Message error>
        {!isEqual && '비밀번호가 일치하지 않습니다.'}
      </Style.Message>
      <Style.SubminInput type="submit" value="회원가입" disabled={!isEqual} />
    </Style.Form>
  );
};
