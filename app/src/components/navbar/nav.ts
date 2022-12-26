import styled, { css } from 'styled-components';

export const TabWrapper = styled.div`
  display: flex;
  width: auto;
  right: 20px;
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

export const Wrapper = styled.div`
  align-items: center;
  padding: 33px 0;
`;
