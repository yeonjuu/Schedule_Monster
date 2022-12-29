import React from 'react';
import { Container } from './adminCss';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
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
