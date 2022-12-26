import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContentsBox, Main } from './StoreStyle';
import { useDispatch } from 'react-redux';
import { asyncitemListFetch } from 'pages/admin/slice/itemListSlice';
import { NavBar } from 'components/navbar/NavBar';
import { Logo } from 'components/logo/Logo';


export default function Navbar() {
  const dispatch = useDispatch<any>();
  return (
    <Container>
      <Main>
        <Logo />
        <NavBar />


      </Main>

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
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
`


const NavMenuContainer = styled.div`
  display: flex;
  position: relative;
  top: 3rem;
  left: 6rem;
`

const NavMenu = styled.h3`
  color: black;
  font-weight: 500;
  font-size: medium;
  font-weight: bold;
  margin-left: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  text-decoration: none;
  text-decoration-line: none;
  list-style: none;

  &:hover {
    opacity: 50%;
  }
`;