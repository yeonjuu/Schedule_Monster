import React from 'react';
import { useSelector } from 'react-redux';

import filterCategory from '../../util/filterCategory';

import { createFuzzyMatcher } from '../../util/filterHangul';
function MonsterList({ category, inputValue }: any) {
  const data = useSelector((state: any) => state.monsters);
  const itemList =
    inputValue === ''
      ? filterCategory(category, 'monsters', data)
      : data.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.characterName);
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
