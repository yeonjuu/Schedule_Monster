import React, { useState, useEffect } from 'react';
import {
  ContentsBox,
  ItemList,
  ItemContainer,
  CategoryBox,
} from '../../components/characters/StoreStyle';
import ItemList2 from 'components/shop/ItemList';
import BannerItem from 'components/shop/categories';
import Search from 'components/shop/search';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MonsterProfile from '../../components/characters/MonsterProfile';
import { asyncCategoryListFetch } from 'pages/admin/slice/categoryListSlice';
import { asyncitemListFetch } from 'pages/admin/slice/itemListSlice';

export default function Items() {

  useEffect( () => {
    dispatch(asyncitemListFetch());
    dispatch(asyncCategoryListFetch());
  },
  []);


  const dispatch = useDispatch<any>();
  const [category, setCategory] = useState('all');
  const [inputState, setInputState] = useState('');
  const { id } = useParams();
//   console.log(id);
  const itemCategoryList = useSelector(
    (state: any): any => state.itemCategories,
  );

  return (
    <ContentsBox>
      <ItemList>

        <BannerItem
          categories={itemCategoryList}
          setCategory={setCategory}
        ></BannerItem>

        <Search setState={setInputState}></Search>

        <ItemContainer>
          <CategoryBox>
        
            <ItemList2
              category={category === 'all' ? 'all' : category}
              inputValue={inputState}
              url={'/store/item/'}
              purpose={'구매'}

            ></ItemList2>

          </CategoryBox>
        </ItemContainer>

      </ItemList>


      <MonsterProfile/>
      

    </ContentsBox>
  );
}
