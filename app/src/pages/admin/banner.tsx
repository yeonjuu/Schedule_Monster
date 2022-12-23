import React from 'react';
import { Container } from './adminCss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './slice/categoryListSlice';
import { asyncitemListFetch } from './slice/itemListSlice';
import { asyncUserListFetch } from './slice/userListSlice';
import { asyncMonsterListFetch } from './slice/monsterListSlice';
function Banner({ setCategory }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  return (
    <div>
      <div>나중에 들어갈 타이틀컴포넌트</div>
      <Container>
        <li
          onClick={(): void => {
            navigate(`/admin/item`);
            dispatch(asyncitemListFetch());
            dispatch(asyncCategoryListFetch());
            setCategory('all');
          }}
        >
          상점
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/monster`);
            setCategory('all');
            dispatch(asyncMonsterListFetch());
          }}
        >
          도감
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/user/`);
            dispatch(asyncUserListFetch());
            dispatch(asyncCategoryListFetch());
          }}
        >
          유저 관리
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/category/`);
          }}
        >
          카테고리 관리
        </li>
      </Container>
    </div>
  );
}

export default Banner;
