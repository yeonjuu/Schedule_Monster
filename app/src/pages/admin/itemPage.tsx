import React, { useState } from 'react';
import Search from '../../components/shop/search';
import ItemListComponents from '../../components/shop/ItemList';
import BannerItem from '../../components/shop/categories';
import EditItem from './editItem';
import { ItemType } from 'types/shopTypes';
import {
  StoreContainer,
  ContentsBox,
  ItemContainer,
  CategoryBox,
  ItemList,
  Contents,
} from '../../components/characters/StoreStyle';
import { resetItem } from './util/util';
function ItemPage() {
  const [item, setItem] = useState<ItemType>(resetItem);
  const [inputState, setInputState] = useState('');
  const [category, setCategory] = useState('all');
  return (
    <StoreContainer>
      <ContentsBox>
        <Contents>
          <ItemList>
            <BannerItem setCategory={setCategory}></BannerItem>

            <Search setState={setInputState}></Search>
            <button
              onClick={() => {
                setItem(resetItem);
              }}
            >
              에딧 창 리셋
            </button>
            <ItemContainer>
              <CategoryBox>
                <ItemListComponents
                  category={category === 'all' ? 'all' : category}
                  inputValue={inputState}
                  setItem={setItem}
                ></ItemListComponents>
              </CategoryBox>
            </ItemContainer>
          </ItemList>

          <EditItem itemData={item}></EditItem>
        </Contents>
      </ContentsBox>
    </StoreContainer>
  );
}

export default ItemPage;
