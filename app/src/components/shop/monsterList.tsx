import React from 'react';
import { useSelector } from 'react-redux';

import filterCategory from '../../util/filterCategory';
import { ItemBox } from 'components/characters/StoreStyle';
import { createFuzzyMatcher } from '../../util/filterHangul';
function MonsterList({ inputValue, setMonster }: any) {
  const monsterList = useSelector(
    (state: any) => state.monsterListReducer.monsterList,
  );
  const data = monsterList;
  const itemList = data.filter((val: any) => {
    return createFuzzyMatcher(inputValue, val.characterName);
  });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <ItemBox
            key={item._id}
            onClick={(): void => {
              setMonster(item);
            }}
          >
            <div>{item.characterName}</div>
            <img src={item.images.image1} alt="" />
          </ItemBox>
        );
      })}
    </>
  );
}
export default MonsterList;
