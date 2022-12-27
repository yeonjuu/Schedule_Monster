import styled, { css } from 'styled-components';
import * as Common from 'assets/styles';

type Props = {
  small?: boolean;
  del?: boolean;
};

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: auto;
  height: auto;
`;

export const Container = styled.div`
  width: auto;
  height: auto;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 2px 2px 7px ${Common.mainColor};
  position: absolute;
  top: 40px;
  left: 4px;
  z-index: 99;
  box-sizing: border-box;
`;

export const Button = styled.input<Props>`
  border: none;
  border-radius: 8px;
  padding: 5px 13px;
  font-size: ${Common.largeFont};
  margin-left: 10px;
  ${(props) =>
    props.small &&
    css`
      font-size: ${Common.basicFont};
      padding: 3px 5px;
      margin-left: 3px;
    `}
  :hover {
    background-color: ${Common.hoverDark};
  }
  ${(props) =>
    props.del &&
    css`
      background-color: ${Common.errorMsg};
      :hover {
        background-color: #d32f2f;
      }
    `}
`;

export const Input = styled.input`
  border: 1px solid #000000;
  height: 30px;
  width: 350px;
  border-radius: 3px;
  text-indent: 10px;
`;

export const Title = styled.p`
  font-size: ${Common.largeFont};
  margin-bottom: 5px;
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0;
`;

export const Error = styled.div`
  font-size: ${Common.smallFont};
  color: ${Common.errorMsg};
  margin-bottom: 5px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
export const Members = styled.ul`
  list-style: none;
  position: relative;
  max-height: 300px;
  width: 100%;
  overflow: auto;
  font-size: ${Common.largeFont};
  ::before {
    content: '';
    width: 100%;
    height: 2px;
    display: block;
    background-color: #efefef;
    position: absoulte;
    top: 0;
    left: 0;
    margin-bottom: 10px;
  }
`;
export const Member = styled.li`
  font-size: ${Common.basicFont};
  margin-top: 5px;
`;

export const ButtonCotainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;
