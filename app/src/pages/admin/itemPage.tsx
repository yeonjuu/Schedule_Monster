import React, { useState } from 'react';
import Search from '../../components/shop/search';
import ItemListComponents from './itemList';
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
import { SearchResetBox } from './adminCss';
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
            <SearchResetBox>
              <Search
                setState={setInputState}
                placeholder={'아이템 검색'}
              ></Search>
              <button
                onClick={() => {
                  setItem(resetItem);
                }}
              >
                추가하기
              </button>
            </SearchResetBox>
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
