import React, { useState } from 'react';
import Search from '../../components/shop/search';
import { asyncUserListFetch } from './slice/userListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { UserPageContainer } from './adminCss';
import { createFuzzyMatcher } from 'util/filterHangul';
import UserInfo from './userInfo';
import {
  CategoryBox,
  ContentsBox,
  ItemContainer,
  ItemList,
} from '../../components/characters/StoreStyle';

function UserPage() {
  const loginUser = useSelector((state: any) => state.persistedReducer);
  const email = loginUser.email;

  const [inputState, setInputState] = useState('');
  const dispatch = useDispatch<any>();
  const userList = useSelector((state: any) => state.userListReducer);
  const filterUserList = userList.userList.filter((val: any) => {
    return createFuzzyMatcher(inputState, val.nickname);
  });
  return (
    <ContentsBox>
      <ItemList>
        <Search setState={setInputState}></Search>
        <button
          onClick={() => {
            dispatch(asyncUserListFetch(email));
          }}
        >
          유저 불러오기
        </button>
        <ItemContainer>
          <CategoryBox>
            <UserPageContainer>
              {filterUserList.map((user: any): JSX.Element => {
                return <UserInfo key={user._id} user={user}></UserInfo>;
              })}
            </UserPageContainer>
          </CategoryBox>
        </ItemContainer>
      </ItemList>
    </ContentsBox>
  );
}

export default UserPage;
