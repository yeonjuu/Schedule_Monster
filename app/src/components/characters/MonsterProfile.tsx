import React from 'react';
import { MonsterContainer, MonsterImage, MonsterLine, MonsterStatus } from './StoreStyle';
import { useSelector } from 'react-redux';

export default function MonsterProfile() {

  const coin = useSelector((state:any) => state.statusReducer.coin);
  const affection = useSelector((state:any) => state.statusReducer.affection);
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);

    return (
        <>
          <MonsterContainer>
                <h6>이미지 주소 :{mainImage}</h6>
                <MonsterImage>
                  <img
                    style={{ width: '15rem', height: '15rem' }}
                    src={mainImage}
                  />
                </MonsterImage>

                <MonsterStatus>
                  <ul>
                    <MonsterLine>이름 : 메타몽</MonsterLine>
                    <MonsterLine>{`애정도 : ❤️ ${affection}`}</MonsterLine>
                    <MonsterLine>보유 코인 : 💰 {coin}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}

