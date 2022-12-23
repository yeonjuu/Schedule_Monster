import React from 'react';
import { useSelector } from 'react-redux';

import filterCategory from '../../util/filterCategory';

import { createFuzzyMatcher } from '../../util/filterHangul';
function MonsterList({ category, inputValue, setMonster }: any) {
  const monsterList = useSelector(
    (state: any) => state.monsterListReducer.monsterList,
  );
  const data = monsterList;
  const itemList =
    inputValue === ''
      ? filterCategory(category, data)
      : data.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.characterName);
        });
  return (
    <ul>
      {itemList.map((item: any): JSX.Element => {
        return (
          <li
            key={item._id}
            onClick={(): void => {
              setMonster(item);
            }}
          >
            <div>{item.characterName}</div>
            <img src={item.images.image1} alt="" />
          </li>
        );
      })}
    </ul>
  );
}
export default MonsterList;
