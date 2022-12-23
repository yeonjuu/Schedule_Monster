import React, { useState } from 'react';
import Search from '../../components/shop/search';
import { asyncUserListFetch } from './slice/userListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { UserPageContainer } from './adminCss';
import { createFuzzyMatcher } from 'util/filterHangul';
import UserInfo from './userInfo';
function UserPage() {
  const [inputState, setInputState] = useState('');
  const dispatch = useDispatch<any>();
  const userList = useSelector((state: any) => state.userListReducer);
  const filterUserList = userList.userList.filter((val: any) => {
    return createFuzzyMatcher(inputState, val.nickname);
  });
  return (
    <div>
      <button
        onClick={() => {
          dispatch(asyncUserListFetch());
          console.log('???????');
        }}
      >
        유저 불러오기
      </button>
      <Search setState={setInputState}></Search>
      <div>총 유저 수{userList.userList.length} </div>
      <UserPageContainer>
        {filterUserList.map((user: any): JSX.Element => {
          return <UserInfo key={user._id} user={user}></UserInfo>;
        })}
      </UserPageContainer>
    </div>
  );
}

export default UserPage;
