import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentsBox, CharacterContainer, CharacterBox, MonsterContainer, MonsterImage, MonsterStatus} from '../../components/characters/StoreStyle';
import { useQuery } from '@tanstack/react-query';
import MonsterProfile from 'components/characters/MonsterProfile';

export default function CharactersList() {

    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const [coin, setCoin] = useState(1000);
    const [affection, setAffection] = useState(10);

    // const { isLoading, error, data: pokemons} = useQuery(['pokemonData'],
    //  async () => {
    //         return axios.get('/pokeMockData/pokemon.json')
    //         .then((res) => console.log(res))
    //     });

    useEffect(() => {
        axios.get('/pokeMockData/pokemon.json')
        .then((res) => {
            setPokemons(res.data.pokedata);
            setIsLoading(!isLoading);
        });
    }, []);

    console.log(pokemons);
     
    return (
        <>
        <ContentsBox>
            <CharacterContainer>
                {isLoading ? 
                <div style={{display:'flex', alignItems:'center', alignSelf:'center', margin: '0 auto'}}>
                    <h3>Loading...</h3>
                    <img style={{width:'6rem', height:'3rem'}} src="https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif" />
                    </div> :
                    <>
                    {pokemons.map((pokemon: any) => 
                    <CharacterBox key={pokemon.id}>
                        <span>{pokemon.name}</span>
                        <img src={pokemon.image}/>
                    </CharacterBox>)}
                    </>
                }
            </CharacterContainer>

            <MonsterProfile
            coin={coin}
            affection={affection}
             />
        </ContentsBox>

            
            {/* {isLoading &&
            <ContentsBox>
                <CharacterContainer>
                    <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Loading,,,</h1>
                </CharacterContainer>
            </ContentsBox>}

            {error && 
            <ContentsBox>
                <CharacterContainer>
                    <h1 style={{textAlign:'center', alignSelf:'center', margin: '0 auto'}}>Error 발생🤕</h1>
                </CharacterContainer>
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

