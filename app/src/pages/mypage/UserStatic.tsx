import React, { useState, useEffect } from 'react';
import * as Style from './style';
import * as API from '../../api';
import { useNavigate } from 'react-router-dom';

type UserStaticProps = {
  email: string;
};

export const UserStatic: React.FC<UserStaticProps> = ({ email }) => {
  const [myCharacter, setMyCharacter] = useState(0);
  const [total, setToal] = useState(0);
  const navigate = useNavigate();

  const getCharactorData = async () => {
    const _total = await API.get('/characters/all');
    const res = await API.get(`/characterlist/detail/${email}`);
    setMyCharacter(res.length);
    setToal(_total.length);
  };

  useEffect(() => {
    getCharactorData();
  }, []);

  return (
    <Style.StaticWrapper>
      <Style.StaticHead>통계</Style.StaticHead>
      <Style.MonsterBlock>
        <Style.BlockTitle>현재 수집한 몬스터 수</Style.BlockTitle>
        <Style.Navigate
          onClick={() => {
            navigate('/store/characters');
          }}
        >
          보러가기😈
        </Style.Navigate>
        <Style.Wrapper>
          <Style.MyChar>{myCharacter}</Style.MyChar>
          <Style.TotalChar>/ {total}</Style.TotalChar>
        </Style.Wrapper>
      </Style.MonsterBlock>
      <Style.RankBlock>
        <div style={{ width: '80%', margin: '0 auto', maxWidth: '400px' }}>
          <img
            src="/serviceNotYet.png"
            alt="서비스 준비중"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </Style.RankBlock>
    </Style.StaticWrapper>
  );
};
