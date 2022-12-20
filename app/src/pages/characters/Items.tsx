import React, {useState} from 'react';
import { MonsterProfile, MonsterImage, ContentsBox, MonsterStatus, ItemList, ItemBox, ItemContainer, CategoryBox } from '../../components/characters/StoreStyle';
import StoreItem from '../../components/characters/StoreItem'



export default function Items() {

    const [affection, setAffection] = useState(10);

    return (
        <ContentsBox>
            <ItemList>
                상점 아이템
            <ItemContainer>
                    <CategoryBox>
                        <StoreItem></StoreItem>
                        <StoreItem></StoreItem>
                        <StoreItem></StoreItem>
                        <StoreItem></StoreItem>
                        <StoreItem></StoreItem>

                    </CategoryBox>

                    <CategoryBox>
                        <StoreItem></StoreItem>
                        <StoreItem></StoreItem>
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
                        <li>{`애정도 : ❤️ ${affection}`} </li>
                    </ul>
                </MonsterStatus>
            </MonsterProfile>
        </ContentsBox>
    );
}

