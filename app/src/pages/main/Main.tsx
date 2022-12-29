import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { hoverDark } from 'assets/styles';

export const Main = () => {
  const navigate = useNavigate();
  //사용자유저토큰이 있으면 캘린더 화면으로 라우팅해주면 좋곘다
  const startClickHandler = () => {
    navigate('/login');
  };

  return (
    <MainContainer>
      <div style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
        <Logo src="/logo.png" alt="스케줄몬스터로고" />
      </div>
      <div style={{ width: '100%', backgroundColor: '#f2f2f2' }}>
        <Banner>
          <TopContainer>
            <Title position="start" top>
              공유가능한 캘린더
            </Title>
            <div>친구, 가족과 캘린더를 공유해서 일정을 관리하세요.</div>
            <StartButton onClick={startClickHandler}>시작하기</StartButton>
          </TopContainer>
          <Image src="/banner/banner01.png" alt="메인화면베너1" />
        </Banner>
      </div>
      <div style={{ width: '100%' }}>
        <Banner>
          <Title position="end">일정과 할 일로 수집할 수 있는 포켓몬</Title>
          <Container>
            <div>
              계획을 실천하는 습관도 들이고, 캐릭터를 수집하며 애정도를
              높여보세요.
            </div>
            <div>새로운 포켓몬들이 습관의 동기부여가 될 거에요.</div>
          </Container>
          <Gif src="/banner/banner02.gif" alt="메인화면배너2" />
        </Banner>
      </div>
      <div style={{ width: '100%', backgroundColor: '#cecece' }}>
        <Footer>
          <h2>스케쥴몬스터</h2>
          <Wrapper>
            <Block>
              <span>이용약관</span>
              <span>개인정보처리방침</span>
              <span>청소년보호정책</span>
              <span>대량주문안내</span>
              <span>채용공고</span>
            </Block>
            <Block>
              <span>대표이사</span>
              <span>서울특별시 </span>
              <span>사업자등록번호</span>
              <span>대표전화 </span>
            </Block>
          </Wrapper>
        </Footer>
      </div>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  position: relative;
`;

const Logo = styled.img`
  max-width: 500px;
  height: auto;
`;
const Banner = styled.div`
  width: 100%;
  height: 500px;
  max-width: 1170px;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  + div {
    margin-top: 50px;
  }
`;

const StartButton = styled.button`
  width: 140px;
  height: 40px;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
  line-height: 40px;
  border: none;
  color: #000000;
  text-decoration: none;
  background-color: #a2bcfe;
  z-index: 10;
  margin-top: 2em;

  :hover {
    background-color: ${hoverDark};
  }
`;

const Footer = styled.footer`
  width: 80%;
  height: 300px;
  padding: 70px;
  margin: 0 auto;
  margin-top: 50px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  > span {
    width: 40%;
    margin-left: 20px;
    margin-top: 5px;
  }
`;

const Gif = styled.img`
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: -1;
  max-width: 600px;
  width: 60%;
  height: auto;
`;

const Title = styled.h1<{ position: string; top?: boolean }>`
  padding: 5% 30px 0 0;
  text-align: ${(props) => props.position};
  ${(props) =>
    props.top &&
    css`
      margin: 0;
      position: relative;
    `}
`;

const Container = styled.div`
  margin: 5% 30px;
  text-align: end;

  > div {
    margin-bottom: 20px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  padding: 15% 0 0 10%;
  flex-direction: column;
  > div {
    margin-top: 20px;
  }
`;

const Image = styled.img`
  width: 60%;
  max-width: 600px;
  height: auto;
  position: absolute;
  top: 50%;
  right: 2em;
  transform: translateY(-50%);
`;
