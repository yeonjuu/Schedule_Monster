import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContentsBox, Main } from './StoreStyle';
import { useDispatch } from 'react-redux';
import { asyncitemListFetch } from 'pages/admin/slice/itemListSlice';


export default function Navbar() {
  const dispatch = useDispatch<any>();
  return (
    <>
      <NavMenuContainer>
          <Link style={{ textDecoration: 'none' }} to="/store">
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

      </NavMenuContainer>
    </>
  );
}


const NavMenuContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 1rem 0 1rem 1rem;
`

const NavMenu = styled.li`
  color: black;
  font-weight: 500;
  font-size: large;
  margin-left: 1.7rem;

  text-decoration: none;
  text-decoration-line: none;
  list-style: none;

  &:hover {
    opacity: 50%;
  }
`;