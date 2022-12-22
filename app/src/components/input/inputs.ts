import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import styled, { css } from 'styled-components';

export const Input = styled.input<{
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}>`
  width: 330px;
  height: 33px;
  text-indent: 15px;
  border: 0.5px solid #a2bcfe;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  ${(props) =>
    props.errors &&
    css`
      font-weight: bold;
      border: 1.5px solid #ffa4b2;
      background-color: #ffa4b2;
    `}
`;

export const InputBox = styled.div`
  & > input {
    margin-top: 20px;
  }
  & > select {
    margin: 20px 0;
  }

  & > div {
    margin-top: 20px;
  }
`;
