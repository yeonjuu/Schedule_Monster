import React from 'react';
import { Container } from './bannerCss';

import { useNavigate } from 'react-router-dom';

function Banner({ setCategory }: any) {
  const navigate = useNavigate();
  return (
    <div>
      <div>나중에 들어갈 타이틀컴포넌트</div>
      <Container>
        <li
          onClick={(): void => {
            navigate(`/admin/item/normal`);
            setCategory('all');
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
        <li>유저 관리</li>
      </Container>
    </div>
  );
}

export default Banner;
