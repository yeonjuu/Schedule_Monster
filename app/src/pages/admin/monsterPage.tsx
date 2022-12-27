import React, { useState } from 'react';
import Search from '../../components/shop/search';
import MonsterList from '../../components/shop/monsterList';
import EditMonster from './editMonster';
import {
  ContentsBox,
  ItemContainer,
  CategoryBox,
  ItemList,
  Contents,
} from '../../components/characters/StoreStyle';

function MonsterPage() {
  const [inputState, setInputState] = useState('');
  const [monster, setMonster] = useState({
    _id: '',
    characterName: '',
    images: {
      img1: '',
      img2: '',
      img3: '',
    },
    levelupPoint: {
      point1: 0,
      point2: 0,
      point3: 0,
    },
  });

  return (
    <ContentsBox>
      <Contents>
        <ItemList>
          <ItemContainer>
            <Search setState={setInputState}></Search>
            <button
              onClick={() => {
                setMonster({
                  _id: '',
                  characterName: '',
                  images: {
                    img1: '',
                    img2: '',
                    img3: '',
                  },
                  levelupPoint: {
                    point1: 0,
                    point2: 0,
                    point3: 0,
                  },
                });
              }}
            >
              에딧 창 리셋
            </button>
            <CategoryBox>
              <MonsterList
                inputValue={inputState}
                setMonster={setMonster}
              ></MonsterList>
            </CategoryBox>
          </ItemContainer>
        </ItemList>
        <EditMonster
          monsterData={monster}
          setMonster={setMonster}
        ></EditMonster>
      </Contents>
    </ContentsBox>
  );
}

export default MonsterPage;
