import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';

export const Input = styled.input<{
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  type: string;
}>`
  width: calc(100% - 65px);
  height: 33px;
  text-indent: 13px;
  border: 0.5px solid #a2bcfe;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  ${(props) =>
    props.errors &&
    css`
      color: black;
      font-weight: bold;
      border: 1.5px solid #ffa4b2;
    `}
  
`;

export const SelectCal = styled.select<{
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}>`
  width: 332px;
  height: 33px;
  border: 1px solid #a2bcfe;
  border-radius: 8px;
  text-indent: 13px;
  ${(props) =>
    props.errors &&
    css`
      font-weight: bold;
      border: 1.5px solid #ffa4b2;
    `}
`;

export const InputBox = styled.div`
  & > input {
    margin-top: 20px;
  }
  & > select {
    margin-top: 20px;
  }

  & > div {
    margin-top: 20px;
  }
`;

export const SchedulePicker = styled(DatePicker)`
  width: 100%;
  height: 33px;
  font-size: 13px;
  border: 1px solid #a2bcfe;
  border-radius: 8px;
  box-sizing: border-box;
  text-align: center;
`;
export const ScheduleBox = styled.div`
  display: flex;
  height: 33px;
  align-items: center;
  justify-content: center;
`;

export const ErrorWord = styled.small`
  margin-left: 13px;
  color: #d83167;
  font-weight: bold;
`;

export const CheckBox = styled.input`
  height: 30px;
  width: 30px;
`;

export const CheckInput = styled(Input)`
  width: calc(100% - 115px);
`;

export const CheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
