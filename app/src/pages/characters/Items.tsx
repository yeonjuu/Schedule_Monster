import React, { useState, useEffect } from 'react';
import {
  ContentsBox,
  ItemList,
  ItemContainer,
  CategoryBox,
  Contents,
} from '../../components/characters/StoreStyle';
import ItemList2 from 'components/shop/ItemList';
import BannerItem from 'components/shop/categories';
import Search from 'components/shop/search';
import { useSelector, useDispatch } from 'react-redux';
import MonsterProfile from '../../components/characters/MonsterProfile';
import { asyncCategoryListFetch } from 'pages/admin/slice/categoryListSlice';
import { asyncitemListFetch } from 'pages/admin/slice/itemListSlice';
import styled from 'styled-components';
import * as API from 'api';
import { RootState } from 'store/store';

export default function Items() {
  const point = useSelector((state: RootState) => state.persistedReducer.point);
  useEffect(() => {
    dispatch(asyncitemListFetch());
    dispatch(asyncCategoryListFetch());
    const setPoint = async () => {
      await API.put('/users/user', { point: point });
    };
    setPoint();
  }, []);

  const dispatch = useDispatch<any>();
  const [category, setCategory] = useState('all');
  const [inputState, setInputState] = useState('');
  const itemCategoryList = useSelector(
    (state: any): any => state.itemCategories,
  );

  return (
    <StoreContainer>
      <ContentsBox>
        <Contents>
          <ItemList>
            <BannerItem
              categories={itemCategoryList}
              setCategory={setCategory}
              purpose={'상점'}
            ></BannerItem>

            <Search
              placeholder={'아이템 검색'}
              setState={setInputState}
            ></Search>

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
          <MonsterProfile />
        </Contents>
      </ContentsBox>
    </StoreContainer>
  );
}

const StoreContainer = styled.div`
  display: flex;
  justify-content: center;
`;
