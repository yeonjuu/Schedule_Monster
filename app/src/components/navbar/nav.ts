import styled, { css } from 'styled-components';

export const TabWrapper = styled.div`
  display: flex;
  position: absolute;
  width: auto;
  right: 20px;
  top: 35px;
  > div:first-child {
    border: none;
  }
`;

export const Tab = styled.div<{ nolink?: boolean }>`
  padding: 0 20px;
  border-left: 1px solid #999;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
  ${(props) =>
    props.nolink &&
    css`
      pointer-events: none;
    `}
`;
