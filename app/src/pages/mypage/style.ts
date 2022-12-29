import { mainColor, basicFont } from 'assets/styles';
import styled, { css } from 'styled-components';

export const User = styled.div`
  width: 84vw;
  margin: 0 auto;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  height: 90%;
`;
export const InfoWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-rows: 50px 1fr;
  width: 84vw;
  position: relative;
  background-color: #a2bcfe;
  height: 30%;
  border: 1px solid #f2f2f2;
`;
export const Head = styled.h3`
  font-size: 20px;
  background-color: #f2f2f2;
  padding-left: 20px;
  line-height: 50px;
`;

export const StaticHead = styled.h3`
  grid-area: h;
  font-size: 20px;
  padding-left: 20px;
  line-height: 50px;
  background-color: #f2f2f2;
`;

export const Infos = styled.div`
  padding-left: 20px;
  padding-bottom: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StaticWrapper = styled.div`
  display: grid;
  width: 84vw;
  margin: 0 auto;
  grid-template-areas:
    'h h'
    'b c';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr;
  justify-content: center;
  align-items: center;
  height: 65%;
  border: 1px solid #f2f2f2;
`;

export const TodoBlock = styled.div`
  grid-area: a;
`;

export const MonsterBlock = styled.div`
  grid-area: b;
  position: relative;
  height: 100%;
  border-right: 1px solid #f2f2f2;
`;
export const RankBlock = styled.div`
  grid-area: c;
  height: auto;
`;
export const BlockTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  align-self: start;
  padding: 20px;
  margin-bottom: 20px;
`;
export const Navigate = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Info = styled.div<{ bottom?: boolean }>`
  font-size: 15px;
  padding: 20px;
  position: relative;
  padding-bottom: 0px;
  ${(props) =>
    props.bottom &&
    css`
      padding-top: 0;
      padding-bottom: 20px;
    `}
`;

export const UpdateButton = styled.input<{ type: 'button'; del?: boolean }>`
  width: 80px;
  height: 40px;
  font-size: ${basicFont};
  margin-left: 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;

  :hover {
    background-color: #c4d3f8;
    ${(props) =>
      props.del &&
      css`
        background-color: #d47171;
      `}
  }
`;
export const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  width: auto;
`;
export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  margin-top: 10%;
  margin: 0 auto;
  justify-content: center;
  align-items: baseline;
  padding-top: 10%;
`;

export const MyChar = styled.span`
  font-size: 100px;
  font-weight: 700;
`;

export const TotalChar = styled.span`
  font-size: 30px;
`;

export const Button = styled.input<{ type: 'button' }>`
  width: 100px;
  height: 40px;
  font-size: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 8px;
`;

export const Message = styled.div`
  margin-left: 60px;
  font-size: 13px;
  color: #d23e3e;
`;

export const InfoInput = styled.input<{ type: 'text' }>`
  width: 50%;
  height: 40px;
  font-size: 18px;
  text-indent: 15px;
  margin-left: 10px;
  border-radius: 8px;
  border: none;
`;

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(126, 126, 126, 0.9);
  z-index: 1;
`;

export const Content = styled.div`
  opacity: 1;
  background-color: #ffffff;
  position: absolute;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  border-radius: 8px;
  border: 2px solid ${mainColor};
`;
