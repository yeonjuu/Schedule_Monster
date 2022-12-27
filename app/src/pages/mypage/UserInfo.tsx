import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Style from './style';
import { changeNickname } from 'pages/login/userSlice';
import * as API from '../../api';
import * as MD from '../../components/modal/modal';
import { useNavigate } from 'react-router-dom';

type UserInfoProps = {
  nickname: string;
  email: string;
};

export const UserInfo: React.FC<UserInfoProps> = ({ nickname, email }) => {
  const [isChange, setIsChange] = useState(false);
  const [mypageNickname, setMypageNickname] = useState(nickname);
  const [checkMsg, setCheckMsg] = useState('');
  const [checkPw, setCheckPw] = useState(false);
  const [delCheck, setDelCheck] = useState(false);
  const dispatch = useDispatch();

  const updateclickHandler = () => {
    setCheckPw(true);
  };
  const deleteclickHandler = () => {
    setDelCheck(true);
  };

  const clickNicknameHandler = async () => {
    //중복확인
    const checked = await API.get(`/register/nickname/${mypageNickname}`);
    if (checked) {
      setCheckMsg('사용가능한 닉네임입니다.');
    } else {
      setCheckMsg('중복된 닉네임입니다. 다른 닉네임으로 변경해주세요🧐');
      return;
    }
    //정보수정api
    try {
      await API.put(`/users/user`, { nickname: mypageNickname });
      alert('닉네임이 변경되었습니다🤗');
      dispatch(changeNickname(mypageNickname));
      setIsChange(false);
      setCheckMsg('');
    } catch (error) {
      alert('닉네임 변경 실패');
      setIsChange(false);
      setCheckMsg('');
    }
  };
  useEffect(() => {
    setMypageNickname(nickname);
  }, [nickname]);

  return (
    <Style.InfoWrapper>
      <Style.Head>기본정보 </Style.Head>
      <Style.ButtonWrapper>
        <Style.UpdateButton
          type="button"
          value="정보수정"
          onClick={updateclickHandler}
        />
        <Style.UpdateButton
          type="button"
          value="탈퇴"
          onClick={deleteclickHandler}
          del
        />
      </Style.ButtonWrapper>
      {checkPw && (
        <Password
          setCheckPw={setCheckPw}
          email={email}
          setIsChange={setIsChange}
        />
      )}
      {delCheck && <Account setDelCheck={setDelCheck} email={email} />}
      <Style.Infos>
        <Style.Info>
          닉네임
          <Style.InfoInput
            type="text"
            value={mypageNickname}
            disabled={!isChange}
            onChange={(e) => {
              setMypageNickname(e.target.value);
            }}
          />
          {isChange && (
            <Style.Button
              type="button"
              value="변경"
              onClick={clickNicknameHandler}
            />
          )}
          <Style.Message>{checkMsg}</Style.Message>
        </Style.Info>
        <Style.Info>
          이메일
          <Style.InfoInput type="text" value={email} disabled />
        </Style.Info>
      </Style.Infos>
    </Style.InfoWrapper>
  );
};
type PWProps = {
  setCheckPw: (a: any) => void;
  setIsChange: (a: any) => void;
  email: string;
};

const Password = ({ setCheckPw, email, setIsChange }: PWProps) => {
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const cancelHandler = () => {
    setCheckPw(false);
    setIsChange(false);
  };
  const checkPwHandler = async () => {
    if (pw === '') {
      setErrorMsg('비밀번호를 입력해주세요');
      return;
    }
    const checked = await API.post('/register/check/password', {
      email,
      password: pw,
    });
    if (checked) {
      setCheckPw(false);
      setIsChange(true);
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };
  return (
    <Style.Modal>
      <Style.Content>
        <MD.Label>비밀번호 입력란</MD.Label>
        <MD.Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <MD.Error>{errorMsg}</MD.Error>
        <MD.ButtonCotainer>
          <MD.Button type="button" value="취소" onClick={cancelHandler} />
          <MD.Button type="button" value="확인" onClick={checkPwHandler} />
        </MD.ButtonCotainer>
      </Style.Content>
    </Style.Modal>
  );
};

type AProps = {
  setDelCheck: (a: any) => void;
  email: string;
};

const Account = ({ setDelCheck, email }: AProps) => {
  const [pw, setPw] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const cancelHandler = () => {
    setDelCheck(false);
  };
  const checkPwHandler = async () => {
    if (pw === '') {
      setErrorMsg('비밀번호를 입력해주세요');
      return;
    }
    const checked = await API.post('/register/check/password', {
      email,
      password: pw,
    });
    if (checked) {
      try {
        await API.delete(`/users/user/${email}`);
        alert('사용자 탈퇴 완료');
        //정보 전체 삭제
        window.localStorage.clear();
        navigate('/');
      } catch (error) {
        alert('탈퇴 작업 실패');
      }
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };
  return (
    <Style.Modal>
      <Style.Content>
        <MD.Label>❌탈퇴하시면 되돌릴 수 없습니다❌</MD.Label>
        <MD.Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <MD.Error>{errorMsg}</MD.Error>
        <MD.ButtonCotainer>
          <MD.Button type="button" value="취소" onClick={cancelHandler} />
          <MD.Button type="button" value="확인" onClick={checkPwHandler} />
        </MD.ButtonCotainer>
      </Style.Content>
    </Style.Modal>
  );
};
