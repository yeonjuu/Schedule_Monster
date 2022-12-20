import React from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { useNavigate } from 'react-router-dom';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { useParams } from 'react-router-dom';
import { ItemBox } from './../characters/StoreStyle';
function ItemList({ category, inputValue }: any) {
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
    <ul>
      {itemList.map((item: any): JSX.Element => {
        return (
          <ItemBox key={item.itemId}>
            <li
              onClick={(): void => {
                navigate(`/admin/item/${item.itemId}`);
              }}
            >
              <div>{item.itemName}</div>
              <div>{item.price}</div>
            </li>
          </ItemBox>
        );
      })}
    </ul>
  );
}
export default ItemList;
