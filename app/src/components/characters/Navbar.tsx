import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';
import { Header } from 'components/header/Header';
import { useSelector } from 'react-redux';


export default function Navbar() {

  const [myPokemon, setMyPokemon] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>('상점');
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);

  return (
    <>
        <Header/>
        <NavContainer>
          <NavMenuContainer>
              <Link style={{ textDecoration: 'none' }} to="/store">
                <NavMenu
                onClick={() => {
                  setCurrent('상점');
                  setMyPokemon(false);}}
                active={current === '상점'}
                >
                  상점
                </NavMenu>
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/myitems">
                <NavMenu
                onClick={() => {
                  setCurrent('내아이템');
                  setMyPokemon(false);
                }}
                active={current === '내아이템'}
                >내아이템</NavMenu>
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/characters">
                <NavMenu
                onClick={() => {
                  setCurrent('수집도감');
                  setMyPokemon(true);
                }}
                active={current === '수집도감'}
                >수집도감</NavMenu>
                {mainImage === '/pokeball.png' ? 
                <Tooltip
                selected={myPokemon === true}
                >포켓몬을 클릭해서 대표 캐릭터로 지정해보세요!</Tooltip> : null}
                
              </Link>

              <Link style={{ textDecoration: 'none' }} to="/store/allcharacters">
                <NavMenu
                onClick={() => {setCurrent('전체도감');
                setMyPokemon(false)}}
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
  position: relative;
`

const Tooltip = styled.div<{selected:Boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 10rem;
  height: 3.5rem;
  font-size: 15px;
  background-color: #969595;
  color: #0c0cd1;
  opacity: 70%;
  border-radius: 1rem;
  border-top-left-radius: 0;
  text-align: center;
  flex-wrap: wrap;
  position: absolute;
  top: 2rem;
  left: 12rem;
  visibility: hidden;

  ${(props) => props.selected && css`

    animation: fadein 5s ease-out;

    @keyframes fadein {
      0% {
        opacity : 1;
        visibility: visible;
        top: 2rem;

      }

      50% {
        opacity : 1;
        visibility: visible;
        top: 1.8rem;
    }

      100% {
        opacity : 0;
        visibility: hidden;
        top: 2rem;


      }
    } 
  `}

  
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

  &:hover ${Tooltip} {
    visibility: visible;
  }
`;

