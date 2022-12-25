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
function ItemPage() {
  const [item, setItem] = useState({
    _id: '',
    itemName: '',
    price: '',
    exp: '',
    image: '',
    itemInfo: '',
    category: '',
  });
  const [inputState, setInputState] = useState('');
  const [category, setCategory] = useState('all');
  return (
    <ContentsBox>
      <ItemList>
        <ItemContainer>
          <BannerItem setCategory={setCategory}></BannerItem>
          <Search setState={setInputState}></Search>
          <button
            onClick={() => {
              setItem({
                _id: '',
                itemName: '',
                price: '',
                exp: '',
                image: '',
                itemInfo: '',
                category: '',
              });
            }}
          >
            에딧 창 리셋
          </button>
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
    </ContentsBox>
  );
}

export default ItemPage;
