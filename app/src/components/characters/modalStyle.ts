import styled from 'styled-components';

export const Box = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;
export const Image = styled.img`
  position: relative;
  height: 150px;
  width: 150px;
  background-blend-mode: overlay;
  transform-origin: 50% 100%;
  position: relative;

  @keyframes vibration {
    0% {
      opacity: 1;
      transform: rotate(10deg);
    }
    5% {
      transform: rotate(-10deg);
    }
    10% {
      transform: rotate(10deg);
    }
    15% {
      transform: rotate(-10deg);
    }
    20% {
      transform: rotate(10deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    30% {
      transform: rotate(10deg);
    }
    35% {
      transform: rotate(-10deg);
    }
    40% {
      transform: rotate(10deg);
    }
    45% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    55% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(10deg);
    }
    65% {
      transform: rotate(-10deg);
    }
    70% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-10deg);
    }
    80% {
      transform: rotate(10deg);
    }
    85% {
      transform: rotate(-10deg);
    }
    90% {
      transform: rotate(10deg);
    }
    95% {
      transform: rotate(-10deg);
      opacity: 0.1;
    }
    100% {
      transform: rotate(10deg);
      opacity: 0;
    }
  }
  animation: vibration 3s;
  animation-fill-mode: both;
  position: absolute;
`;

export const MonsterImage = styled.img`
  @keyframes visible {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  height: 150px;
  width: 150px;
  animation: visible 6s;
  animation-fill-mode: both;
  position: absolute;
`;
export const ModalBtn = styled.button`
  position: absolute;
  right: 35%;
  top: 60%;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 20px;
  background-color: #a2bcff;
  :hover {
    cursor: pointer;
  }
`;
export const MoveBox = styled.div`
  color: white;
  font-size: large;
  position: absolute;
  top: 30%;
  @keyframes ball {
    0% {
      margin-top: 0px;
    }
    95% {
    }
    to {
      margin-top: 20px;
    }
  }
  animation: ball 0.5s ease-in Infinite Alternate;
`;
