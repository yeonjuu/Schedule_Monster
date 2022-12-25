import produce from 'immer';
import React, { useState } from 'react';
import { UserInfoBox } from './adminCss';

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
          <div>{user.auth}</div>
        </div>
      </div>
      <div>
        <button>수정</button>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
