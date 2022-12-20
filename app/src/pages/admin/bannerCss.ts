import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  height: 50px;
  position: relative;
  list-style: none;
  li {
    margin: auto 0;
    margin-right: 15px;
    font-size: 18px;
    color: black;
    cursor: pointer;
    font-weight: bold;
  }
`;

export const BuyButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: blue;
  color: white;
  border-radius: 30px;
`;
