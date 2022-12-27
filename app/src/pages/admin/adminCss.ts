import styled from 'styled-components';

export const Container = styled.ul`
  width: 84vw;
  margin: 0 auto;

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
  height: 300px;
`;
export const EditItemBoxContainer = styled.div`
  background-color: white;
  width: 25%;
  height: 80%;
  border-radius: 1rem;
  padding: 1rem;
  margin-left: 1rem;
  overflow-y: scroll;
  box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  position: relative;
`;

export const UploadFileBox = styled.div`
  padding: 0.5rem 0rem;
  display: flex;
  flex-direction: column;

  > input {
    border: 0.5px solid #a2bcff;
  }
  > input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > input {
    border: 0.5px solid #a2bcff;
    border-radius: 10rem;
  }
  > textarea {
    border: 0.5px solid #a2bcff;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
  }
`;
const Btn = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background-color: #a2bcff;
`;
export const AddAndEditBtn = styled(Btn)``;
export const DelBtn = styled(Btn)``;
export const SearchResetBox = styled.div`
  height: 100%;
  border: 1px solid black;
`;

export const EditMonsterBox = styled.div`
  background-color: white;
  width: 25%;
  height: 80%;
  border-radius: 1rem;
  padding: 1rem;
  margin-left: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  position: relative;
`;
export const SearchUserBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
`;
export const LoadUserBtnBox = styled.div`
  height: 10%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InputCategory = styled.input`
  width: 40%;
  height: 40%;
  flex-shrink: 0;

  border: 2px solid #6e8ee0;

  border-radius: 10rem;
  margin-right: 10%;
  color: gray;
  text-align: start;
  padding: 0 0.5rem;

  box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
`;
export const CategoryAddBox = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CategoryAddBtn = styled.button`
  border-radius: 1rem;
  height: 40%;
  width: 10%;
  background-color: #a2bcff;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
export const CategoryListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CategoryInfo = styled.div`
  display: flex;
  height: 8%;
  margin: 5px 0px;
  > input {
    border-radius: 1rem;
    border: 0.2px solid black;
    width: 100%;
    margin-right: 10px;
  }
`;
