import styled, { css } from 'styled-components';
import { basicFont, smallFont, mainColor, hoverDark } from 'assets/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  justify-content: center;
  background-color: #f2f2f2;
`;

export const LogoWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  > img {
    width: 100%;
    height: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  cursor: pointer;
  width: 200px;
`;

export const Tab = styled.p<{ active: boolean }>`
  text-align: center;
  font-size: 18px;
  ${(props) =>
    props.active &&
    css`
      color: #a2bcfe;
    `}
`;

export const Label = styled.label`
  font-size: ${basicFont};
  display: inline-block;
  margin-top: 12px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 28px;
  text-indent: 15px;
  border: 1px solid #a2bcfe;
  border-radius: 8px;
  box-sizing: border-box;
`;

export const SubminInput = styled.input.attrs({ type: 'submit' })`
  width: 330px;
  height: 30px;
  margin-top: 18px;
  background-color: #a2bcfe;
  border: none;
  border-radius: 8px;
  :hover {
    background-color: #85a6fc;
  }
`;

export const Title = styled.h5`
  font-size: 20px;
`;

export const Message = styled.p<{ error?: boolean; color?: string }>`
  color: ${(props) => props.color};
  font-size: ${smallFont};
  margin: 3px 0;

  ${(props) =>
    props.error &&
    css`
      color: #d23e3e;
      font-size: ${basicFont};
    `}
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.input`
  margin-left: 5px;
  font-size: ${smallFont};
  background-color: ${mainColor};
  border: none;
  border-radius: 3px;
  width: 25%;
  padding: 0 3px;
  :hover {
    background-color: ${hoverDark};
  }
`;
