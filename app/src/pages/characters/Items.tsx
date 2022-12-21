import React, { useState } from 'react';
import {
  MonsterProfile,
  MonsterImage,
  ContentsBox,
  MonsterStatus,
  ItemBox,
  ItemList,
  ItemContainer,
  CategoryBox,
} from '../../components/characters/StoreStyle';
import ItemList2 from 'components/shop/ItemList';
import BannerItem from 'components/shop/categories';
import Search from 'components/shop/search';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Items() {

  const [coin, setCoin] = useState(100);
  const [affection, setAffection] = useState(10);
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

      <MonsterProfile>
        <MonsterImage>
          <img
            style={{ width: '15rem', height: '15rem' }}
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/132.png"
          />
        </MonsterImage>

        <MonsterStatus>
          <ul>
            <li>이름 : 메타몽</li>
            <li>{`애정도 : ❤️ ${affection}`}</li>
            <li>보유 코인 : {coin}</li>
          </ul>
        </MonsterStatus>
      </MonsterProfile>
    </ContentsBox>
  );
}
