import React from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { useNavigate } from 'react-router-dom';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { useParams } from 'react-router-dom';
import { ItemBox } from './../characters/StoreStyle';
function ItemList({ category, inputValue, url }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const itemList =
    inputValue === ''
      ? filterCategory(category, 'items')
      : useSelector((state: any) => {
          return state.items.filter((val: any) => {
            return createFuzzyMatcher(inputValue, val.itemName);
          });
        });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <ItemBox key={item.itemId}>
            <div
              onClick={(): void => {
                navigate(`${url}${item.itemId}`);
              }}
            >
              <div>{item.itemName}</div>
              <div>{item.price}</div>
            </div>
          </ItemBox>
        );
      })}
    </>
  );
}
export default ItemList;
