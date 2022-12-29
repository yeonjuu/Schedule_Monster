import React from 'react';
import { UserInfoBox } from './adminCss';
import * as API from '../../api';
import { UpdateButton } from 'pages/mypage/style';
import { asyncUserListFetch } from './slice/userListSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

function UserInfo({ user, email }: any) {
  const dispatch = useDispatch<AppDispatch>();
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
        <UpdateButton
          type="button"
          value={'삭제'}
          del
          onClick={(e) => {
            if (window.confirm('삭제하시겠습니까?')) {
              try {
                API.delete(`/users/user/${user.email}`);
              } finally {
                dispatch(asyncUserListFetch(email));
              }
            }
          }}
        ></UpdateButton>
      </div>
    </UserInfoBox>
  );
}

export default UserInfo;
