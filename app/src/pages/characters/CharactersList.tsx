import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentsBox, CharacterContainer, CharacterBox} from '../../components/characters/StoreStyle';
// import { useQuery } from '@tanstack/react-query';



export default function CharactersList() {

    // const { isLoading, error, data:pokemons} = useQuery(['pokemonData'],
    //  async () => {
    //         return axios.get('/pokeMockData/pokemon.json')
    //         .then((pokemon) => pokemon.data);
    //     }
    // );

    // console.log(pokemons);


     
    return (
        <>
        <ContentsBox>
            
            {/* {isLoading &&
            <CharacterContainer>
                <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Loading,,,</h1>
            </CharacterContainer>}

            {error && 
            <CharacterContainer>
                <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Error 발생🤕</h1>
            </CharacterContainer>
            }
            {pokemons && 
            <CharacterContainer>
                {pokemons}
            </CharacterContainer>} */}

        </ContentsBox>
    </>

    );
}

