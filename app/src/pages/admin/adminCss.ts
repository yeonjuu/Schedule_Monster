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

export const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0px;
`;

export const UserPageContainer = styled.div`
  overflow-y: scroll;
  border: 2px solid black;
  height: 500px;
`;
