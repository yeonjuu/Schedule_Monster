import React, { useState } from 'react';
import Search from '../../components/shop/search';
import ItemListComponents from '../../components/shop/ItemList';
import BannerItem from '../../components/shop/categories';
import EditItem from './editItem';
import {
  ContentsBox,
  ItemContainer,
  CategoryBox,
  ItemList,
} from '../../components/characters/StoreStyle';
function ItemPage({ categories, setCategory, category }: any) {
  const [inputState, setInputState] = useState('');
  return (
    <ContentsBox>
      <ItemList>
        <ItemContainer>
          <BannerItem
            categories={categories}
            setCategory={setCategory}
          ></BannerItem>
          <Search setState={setInputState}></Search>
          <CategoryBox>
            <ItemListComponents
              category={category === 'all' ? 'all' : category}
              inputValue={inputState}
              url={'/admin/item/'}
            ></ItemListComponents>
          </CategoryBox>
        </ItemContainer>
      </ItemList>

      <EditItem></EditItem>
    </ContentsBox>
  );
}

export default ItemPage;
