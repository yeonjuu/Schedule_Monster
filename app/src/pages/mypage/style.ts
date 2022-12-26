import styled from 'styled-components';

export const InfoWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-rows: 50px 200px;
  width: 84vw;
  position: relative;
  background-color: #a2bcfe;
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
  border: 1px solid #f2f2f2;
`;

export const StaticWrapper = styled.div`
  display: grid;
  width: 84vw;
  margin: 0 auto;
  grid-template-areas:
    'h h'
    'a a'
    'b c';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr;
  background-color: #c4d3f8;
`;

export const TodoBlock = styled.div`
  grid-area: a;
  border: 1px solid #f2f2f2;
`;

export const MonsterBlock = styled.div`
  grid-area: b;
  border: 1px solid #f2f2f2;
  position: relative;
`;
export const RankBlock = styled.div`
  grid-area: c;
  border: 1px solid #f2f2f2;
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

export const Info = styled.div`
  font-size: 15px;
  padding: 20px;
  position: relative;
`;

export const UpdateButton = styled.input<{ type: 'button' }>`
  position: absolute;
  right: 20px;
  top: 5px;
  width: 100px;
  height: 40px;
  font-size: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;

  :hover {
    background-color: #c4d3f8;
  }
`;

export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: baseline;
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
  position: absolute;
  bottom: 0px;
  left: 83px;
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
