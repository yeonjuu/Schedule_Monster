import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentsBox, CharacterContainer, CharacterBox, MonsterProfile, MonsterImage, MonsterStatus} from '../../components/characters/StoreStyle';
import { useQuery } from '@tanstack/react-query';


export default function CharactersList() {

    const { isLoading, error, data: pokemons} = useQuery(['pokemonData'],
     async () => {
            return axios.get('/pokeMockData/pokemon.json')
            .then((res) => console.log(res.data.pokedata))
        });

     
    return (
        <>
        <ContentsBox>
            <CharacterContainer></CharacterContainer>
            <MonsterProfile></MonsterProfile>
        </ContentsBox>
            
            {/* {isLoading &&
            <ContentsBox>
                <CharacterContainer>
                    <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Loading,,,</h1>
                </CharacterContainer>

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
                        <li>{`애정도 : ❤️ `}</li>
                        <li>보유 코인 : </li>
                    </ul>
                    </MonsterStatus>
                </MonsterProfile>
            </ContentsBox>}

            {error && 
            <ContentsBox>
                <CharacterContainer>
                    <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Error 발생🤕</h1>
                </CharacterContainer>

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
                    <li>{`애정도 : ❤️ `}</li>
                    <li>보유 코인 : </li>
                </ul>
                </MonsterStatus>
            </MonsterProfile>
            </ContentsBox>}

            {pokemons && 
            <ContentsBox>
                <CharacterContainer>
                    {pokemons}
                </CharacterContainer>


            </ContentsBox>} */}

    </>

    );
}

