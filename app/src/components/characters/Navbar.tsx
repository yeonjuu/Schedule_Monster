import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Main } from './StoreStyle';
import { useDispatch } from 'react-redux';
import { asyncitemListFetch } from 'pages/admin/slice/itemListSlice';
const NavMenu = styled.li`
  color: #8eabf5;
  font-weight: 500;
  font-size: medium;
  margin-left: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  text-decoration: none;
  text-decoration-line: none;
  list-style: none;
`;

export default function Navbar() {
  const dispatch = useDispatch<any>();
  return (
    <div>
      <Main>
        <Link to="/">
          <img style={{ width: '300px', height: '120px' }} src="/logo.png" />
        </Link>

        <div style={{ display: 'flex' }}>
          <Link style={{ textDecoration: 'none' }} to="/store/item/normal">
            <NavMenu
              onClick={() => {
                dispatch(asyncitemListFetch());
              }}
            >
              상점
            </NavMenu>
          </Link>

          <Link style={{ textDecoration: 'none' }} to="/store/myitems">
            <NavMenu>내아이템</NavMenu>
          </Link>

          <Link style={{ textDecoration: 'none' }} to="/store/characters">
            <NavMenu>수집도감</NavMenu>
          </Link>
        </div>
      </Main>
    </div>
  );
}
