import React from 'react';
import { UserInfoBox } from './adminCss';
import * as API from '../../api';

function UserInfo({ user, email }: any) {
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
          <div>권한</div>
          <div>{user.auth}</div>
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            if (window.confirm('삭제하시겠습니까?')) {
              API.delete(`/users/user/${user.email}`);
            }
          }}
        >
          삭제
        </button>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
