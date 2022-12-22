import produce from 'immer';
import React, { useState } from 'react';
import { UserInfoBox, UserPageContainer } from './adminCss';
import * as API from '../../api';

function UserInfo({ user }: any) {
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    password: user.password,
    nickname: user.nickname,
    point: user.point,
  });
  console.log(user);
  const onChangePoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(
      produce((draft: any) => {
        draft.point = parseInt(e.target.value);
      }),
    );
  };
  return (
    <UserInfoBox>
      <div>
        <div>
          <span>이메일: </span>
          <span>{user.email}</span>
        </div>
        <div>
          <span>닉네임: </span>
          <span>{user.nickname}</span>
        </div>
        <div>
          <span>_id: </span>
          <span>{user._id}</span>
        </div>
      </div>
      <div>
        <div>
          <div>포인트</div>
          <input
            type="number"
            value={userInfo.point}
            onChange={onChangePoint}
          />
        </div>
      </div>
      <div>
        <div>
          <div>상태</div>
          <div>{user.auth}</div>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            API.put(
              'https://port-0-schedulemonster-883524lbq4l3iv.gksl2.cloudtype.app/users/user',
              userInfo,
            );
          }}
        >
          수정
        </button>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
