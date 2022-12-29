import React, { useState, useEffect } from 'react';
import Search from '../../components/shop/search';
import { asyncUserListFetch } from './slice/userListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { createFuzzyMatcher } from 'util/filterHangul';
import UserInfo from './userInfo';
import {
  CategoryBox,
  ContentsBox,
  ItemContainer,
  ItemList,
  StoreContainer,
} from '../../components/characters/StoreStyle';
import { AppDispatch, RootState } from 'store/store';
import { SearchResetBox } from './adminCss';
import * as API from '../../api';
function UserPage() {
  const loginUser = useSelector((state: RootState) => state.persistedReducer);
  const email = loginUser.email;

  const [inputState, setInputState] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.userListReducer);
  const filterUserList = userList.userList.filter((val: any) => {
    return createFuzzyMatcher(inputState, val.email);
  });

  return (
    <StoreContainer>
      <ContentsBox>
        <ItemList>
          <SearchResetBox>
            <Search setState={setInputState} placeholder={'유저 검색'}></Search>
            <button
              onClick={() => {
                dispatch(asyncUserListFetch(email));
              }}
            >
              유저 불러오기
            </button>
          </SearchResetBox>
          <ItemContainer>
            <CategoryBox>
              {filterUserList.map((user: any): JSX.Element => {
                return (
                  <UserInfo key={user._id} user={user} email={email}></UserInfo>
                );
              })}
            </CategoryBox>
          </ItemContainer>
        </ItemList>
      </ContentsBox>
    </StoreContainer>
  );
}

export default UserPage;
