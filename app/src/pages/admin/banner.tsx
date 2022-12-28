import React from 'react';
import { Container } from './adminCss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './slice/categoryListSlice';
import { AppDispatch } from 'store/store';

function Banner() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <Container>
        <li
          onClick={(): void => {
            navigate(`/admin/item`);
          }}
        >
          상점
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/monster`);
          }}
        >
          도감
        </li>
        <li
          onClick={(): void => {
            navigate(`/admin/user/`);
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
    </>
  );
}

export default Banner;
