import React, {useState} from 'react';
import { MonsterContainer, MonsterImage, MonsterLine, MonsterStatus } from './StoreStyle';

export default function MonsterProfile({coin, affection, myPokemon}) {

    return (
        <>
             <MonsterContainer>
        <MonsterImage>
          <img
            style={{ width: '15rem', height: '15rem' }}
            src={myPokemon}
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

