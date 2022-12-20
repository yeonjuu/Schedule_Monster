import React from 'react';
import { useSelector } from 'react-redux';

import filterCategory from '../../util/filterCategory';

import { createFuzzyMatcher } from '../../util/filterHangul';
function MonsterList({ category, inputValue }: any) {
  const itemList =
    inputValue === ''
      ? filterCategory(category, 'monsters')
      : useSelector((state: any) => {
          return state.monsters.filter((val: any) => {
            return createFuzzyMatcher(inputValue, val.characterName);
          });
        });
  return (
    <ul>
      {itemList.map((item: any): JSX.Element => {
        return (
          <li key={item.characterId}>
            <div>{item.characterName}</div>
            <img src={item.image.image1} alt="" />
          </li>
        );
      })}
    </ul>
  );
}
export default MonsterList;
