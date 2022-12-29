import React from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { CharacterBox } from '../../components/characters/StoreStyle';
import styled from 'styled-components';
const Img = styled.img`
  height: 70px;
  width: 70px;
  display: inline;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
function Item({ setItem, item }: any) {
  return (
    <CharacterBox
      onClick={(): void => {
        setItem(item);
      }}
    >
      <Box>
        <Img src={item.itemImage} />
      </Box>
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
