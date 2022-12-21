import React, {useState} from 'react';
import ItemCard from '../../components/characters/MyitemsCard';
import BannerItem from 'components/shop/categories';
import Search from 'components/shop/search';
import ItemList2 from 'components/shop/ItemList';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ContentsBox, MonsterProfile, MonsterStatus, MonsterImage, ItemList, ItemBox, CategoryBox, ItemContainer } from '../../components/characters/StoreStyle';

export default function MyItems() {

    const [coin, setCoin] = useState(1000);
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
                purpose={'사용'}
                coin={coin}
                setCoin={setCoin}
                affection={affection}
                setAffection={setAffection}
                ></ItemList2>

            </CategoryBox>
            </ItemContainer>

            </ItemList>

            <MonsterProfile>
                <MonsterImage>
                    <img style={{width:'15rem', height:"15rem"}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/132.png" />
                </MonsterImage>

                <MonsterStatus>
                    <ul>
                        <li>이름 : 메타몽</li>
                        <li>애정도 : ❤️ {affection} </li>
                    </ul>
                </MonsterStatus>
            </MonsterProfile>

        </ContentsBox>
    );
}

