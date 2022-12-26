import React from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function MonsterProfile() {

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { nickname, point, isLogin, email } = user;


  const name = useSelector((state:any) => state.statusReducer.name);
  const coin = useSelector((state:any) => state.statusReducer.coin);
  const affection = useSelector((state:any) => state.statusReducer.affection);
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);

    return (
        <>
          <MonsterContainer>
                <MonsterImageContainer>
                  <MonsterImage src={mainImage}
                  />
                </MonsterImageContainer>

                <MonsterStatus>
                  <ul>
                    <MonsterLine>이름 : {name}</MonsterLine>
                    <MonsterLine>애정도 : ❤️ {affection}</MonsterLine>
                    <MonsterLine>보유 코인 : 💰 {point}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}

