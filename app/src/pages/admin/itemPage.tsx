import React, { useState } from 'react';
import { Container } from './bannerCss';
import Search from '../../components/shop/search';
import ItemListComponents from '../../components/shop/ItemList';
import BannerItem from '../../components/shop/categories';
import EditItem from './editItem';
import {
  ContentsBox,
  ItemContainer,
  CategoryBox,
  ItemBox,
  ItemList,
} from '../../components/characters/StoreStyle';
import StoreItem from 'components/characters/StoreItem';
function ItemPage({ categories, setCategory, category }: any) {
  const [inputState, setInputState] = useState('');
  return (
    <ContentsBox>
      <ItemList>
        <ItemContainer>
          <BannerItem
            categories={categories}
            setCategory={setCategory}
            category={category}
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
