import React from 'react';
import { useSelector } from 'react-redux';

import { CharacterBox } from './../../components/characters/StoreStyle';
import { createFuzzyMatcher } from '../../util/filterHangul';
function MonsterList({ inputValue, setMonster }: any) {
  const monsterList = useSelector(
    (state: any) => state.monsterListReducer.monsterList,
  );
  const data = monsterList;
  const itemList = data.filter((val: any) => {
    return createFuzzyMatcher(inputValue, val.nameKo);
  });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <CharacterBox
            key={item._id}
            onClick={(): void => {
              setMonster(item);
            }}
          >
            <img src={item.image.imageSprites.front_default} />
            <h4 style={{ alignSelf: 'center' }}>{item.nameKo}</h4>
          </CharacterBox>
        );
      })}
    </>
  );
}
export default MonsterList;
