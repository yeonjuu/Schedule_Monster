import React, {useState} from 'react';
import { MonsterContainer, MonsterImage, MonsterLine, MonsterStatus } from './StoreStyle';

export default function MonsterProfile({coin, affection}) {

    return (
        <>
             <MonsterContainer>
        <MonsterImage>
          <img
            style={{ width: '15rem', height: '15rem' }}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/132.png"
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

