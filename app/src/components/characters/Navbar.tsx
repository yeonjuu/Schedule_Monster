import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from 'components/header/Header';


export default function Navbar() {
  return (
    <>
        <Header/>
        <NavContainer>
          <NavMenuContainer>
              <Link style={{ textDecoration: 'none' }} to="/store">
                <NavMenu
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

              <Link style={{ textDecoration: 'none' }} to="/store/allcharacters">
                <NavMenu>전체도감</NavMenu>
              </Link>

          </NavMenuContainer>
        </NavContainer>

    </>
  );
}

const NavContainer = styled.div`
  width: 84vw;
  margin: 0 auto;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  display: flex;
  justify-content: flex-start;
`;


const NavMenuContainer = styled.div`
  display: flex;
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

  &:visited {
    opacity: 50%;
  }
`;