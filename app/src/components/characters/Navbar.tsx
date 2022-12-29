import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { Header } from 'components/header/Header';


export default function Navbar() {

  const [current, setCurrent] = useState('상점');

  return (
    <>
        <Header/>
        <NavContainer>
          <NavMenuContainer>
              <Link style={{ textDecoration: 'none' }} to="/store">
                <NavMenu
                onClick={() => setCurrent('상점')}
                active={current === '상점'}
                >
                  상점
                </NavMenu>
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/myitems">
                <NavMenu
                onClick={() => setCurrent('내아이템')}
                active={current === '내아이템'}
                >내아이템</NavMenu>
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/characters">
                <NavMenu
                onClick={() => setCurrent('수집도감')}
                active={current === '수집도감'}
                >수집도감</NavMenu>
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/allcharacters">
                <NavMenu
                onClick={() => setCurrent('전체도감')}
                active={current === '전체도감'}
                >전체도감</NavMenu>
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

const NavMenu = styled.li<{active: boolean}>`
  color: black;
  font-weight: 500;
  font-size: large;
  margin-left: 1.7rem;

  text-decoration: none;
  text-decoration-line: none;
  list-style: none;

  ${(props) => props.active && css`
    color: #85a6fc;
  `}

  &:hover {
    opacity: 50%;
  }

  &:visited {
    opacity: 50%;
  }
`;