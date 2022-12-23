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
import { useSelector } from 'react-redux';
function ItemPage({ setCategory, category }: any) {
  const itemCategories = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  const itemList = useSelector((state: any) => state.itemListReducer.itemList);
  const [item, setItem] = useState({
    _id: '',
    itemName: '',
    price: '',
    exp: '',
    image: '',
    info: '',
    category: '',
  });
  const [inputState, setInputState] = useState('');
  return (
    <ContentsBox>
      <ItemList>
        <ItemContainer>
          <BannerItem
            categories={itemCategories}
            setCategory={setCategory}
          ></BannerItem>
          <Search setState={setInputState}></Search>
          <CategoryBox>
            <ItemListComponents
              category={category === 'all' ? 'all' : category}
              inputValue={inputState}
              data={itemList}
              setItem={setItem}
            ></ItemListComponents>
          </CategoryBox>
        </ItemContainer>
      </ItemList>

      <EditItem
        categoryList={itemCategories}
        itemList={itemList}
        itemState={item}
        setItemState={setItem}
      ></EditItem>
    </ContentsBox>
  );
}

export default ItemPage;
