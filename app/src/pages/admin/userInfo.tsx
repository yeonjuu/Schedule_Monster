import produce from 'immer';
import React, { useState } from 'react';
import { UserInfoBox } from './adminCss';
import * as API from '../../api';

function UserInfo({ user }: any) {
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
          <div>{user.point}</div>
        </div>
      </div>
      <div>
        <div>
          <div>상태</div>
          <select name="상태" id="" defaultValue={user.auth}>
            <option value="user">user</option>
            <option value="manager">manager</option>
          </select>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            console.log({
              password: user.password,
              email: user.email,
              nickname: user.nickname,
            });
            API.post('/users/master', {
              password: user.password,
              email: user.email,
              nickname: user.nickname,
            });
          }}
        >
          수정
        </button>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
