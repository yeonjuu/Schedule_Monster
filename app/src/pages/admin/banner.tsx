import React from 'react';
import { Container } from './adminCss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './categoryListSlice';
import { asyncitemListFetch } from './itemListSlice';
import { asyncUserListFetch } from './userListSlice';
function Banner({ setCategory }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  return (
    <div>
      <div>나중에 들어갈 타이틀컴포넌트</div>
      <Container>
        <li
          onClick={(): void => {
            navigate(`/admin/item/normal`);
            setCategory('all');
            dispatch(asyncCategoryListFetch());
            dispatch(asyncitemListFetch());
          }}
        >
          상점
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/monster/normal`);
            setCategory('all');
          }}
        >
          도감
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/user/`);
            setCategory('all');
            dispatch(asyncUserListFetch());
          }}
        >
          유저 관리
        </li>
      </Container>
    </div>
  );
}

export default Banner;
