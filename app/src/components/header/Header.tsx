import { Logo } from 'components/logo/Logo';
import { NavBar } from 'components/navbar/NavBar';
import React from 'react';
import styled from 'styled-components';

export const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <NavBar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 84vw;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
