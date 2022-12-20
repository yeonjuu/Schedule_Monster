import React, { useState } from 'react';
import { Container } from './bannerCss';
import Search from '../../components/shop/search';
import ItemList from '../../components/shop/ItemList';
import BannerItem from '../../components/shop/categories';
import EditItem from './editItem';
import {
  ContentsBox,
  ItemContainer,
  CategoryBox,
  ItemBox,
} from '../../components/characters/StoreStyle';
import StoreItem from 'components/characters/StoreItem';
function ItemPage({ categories, setCategory, category }: any) {
  const [inputState, setInputState] = useState('');
  return (
    <ContentsBox>
      <ItemContainer>
        <BannerItem
          categories={categories}
          setCategory={setCategory}
          category={category}
        ></BannerItem>
        <Search setState={setInputState}></Search>
        <CategoryBox>
          <ItemList
            category={category === 'all' ? 'all' : category}
            inputValue={inputState}
            url={'/admin/item/'}
          ></ItemList>
        </CategoryBox>
      </ItemContainer>

      <EditItem></EditItem>
    </ContentsBox>
  );
}

export default ItemPage;
