import React, {useState,useEffect} from 'react';
import BannerItem from 'components/shop/categories';
import Search from 'components/shop/search';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ContentsBox, ItemList, CategoryBox, ItemContainer } from '../../components/characters/StoreStyle';
import MonsterProfile from 'components/characters/MonsterProfile';
import MyitemList from '../../components/characters/MyItemList';

import { Container } from '../../pages/admin/adminCss';


export default function MyItems() {

    const [myItems, setMyItems] = useState([]);
    const dispatch = useDispatch<any>();
  
    const [category, setCategory] = useState('all');
    const [inputState, setInputState] = useState('');
    const { id } = useParams();
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

                    <MyitemList 
                    myItems={myItems} 
                    setMyItems={setMyItems} 
                    category={category === 'all' ? 'all' : category}
                    inputValue={inputState}
                    />

                      
                  </CategoryBox>
                </ItemContainer>

          </ItemList>

          <MonsterProfile />

        </ContentsBox>
    );
}

