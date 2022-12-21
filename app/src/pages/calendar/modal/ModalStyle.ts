import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import styled, { css } from 'styled-components';

export const ModalContainer = styled.div`
  width: 380px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  padding: 20px;
  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 14px;
`;

export const BtnBox=styled.div`
display: flex;
justify-content: flex-end;
height: 25px;
`

export const TabBox = styled.div`
  display: flex;
  padding: 0;
  width: 150px;
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10px;
`;

export const Tab = styled.div<{ active: boolean }>`
  display: flex;

  cursor: pointer;
  font-size: 20px;
  line-height: 20px;
  width: 50%;
  padding: 0;

  ${(props) =>
    props.active &&
    css`
      color: #a2bcfe;
      font-weight: bold;
    `}
`;

export const PickColor = styled.button<{ labelColor: string }>`
  cursor: pointer;
  margin-left: 10px;
  width: 40px;
  height: 28px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  ${(props) =>
    props.labelColor &&
    css`
background-color: {props.labelColor}`}
`;
