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
  StoreContainer,
} from '../../components/characters/StoreStyle';
import { SearchResetBox } from './adminCss';

function MonsterPage() {
  const [inputState, setInputState] = useState('');
  const [monster, setMonster] = useState({
    _id: '',
    characterId: '',
    nameKo: '',
    levelupPoint: '',
    image: {
      imageSprites: {
        back_default: '',
        front_default: '',
        front_shiny: '',
      },
    },
  });

  return (
    <StoreContainer>
      <ContentsBox>
        <Contents>
          <ItemList>
            <ItemContainer>
              <SearchResetBox>
                <Search
                  setState={setInputState}
                  placeholder={'몬스터 검색'}
                ></Search>
              </SearchResetBox>
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
    </StoreContainer>
  );
}

export default MonsterPage;
