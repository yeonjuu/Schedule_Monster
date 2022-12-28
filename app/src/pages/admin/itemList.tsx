import React from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { CharacterBox } from '../../components/characters/StoreStyle';

function Item({ setItem, item }: any) {
  return (
    <CharacterBox
      onClick={(): void => {
        setItem(item);
      }}
    >
      <img src={item.itemImage} />
      <h4 style={{ alignSelf: 'center' }}>{item.itemName}</h4>
    </CharacterBox>
  );
}

function ItemList({ category, inputValue, purpose, setItem }: any) {
  const reducerData = useSelector((state: any) => state.itemListReducer);
  const data = reducerData.itemList;
  const itemList =
    inputValue === ''
      ? filterCategory(category, data)
      : data.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.itemName);
        });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <Item
            item={item}
            setItem={setItem}
            purpose={purpose}
            key={item._id}
          ></Item>
        );
      })}
    </>
  );
}
export default ItemList;
