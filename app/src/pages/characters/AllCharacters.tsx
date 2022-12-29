import React, {useEffect, useState} from "react";
import Navbar from "components/characters/Navbar"
import { Contents, ContentsBox, StoreContainer } from "components/characters/StoreStyle"
import styled from "styled-components"
import * as API from '../../api';
import Loading from "components/characters/Loading";
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function AllCharacters() {

    const [allPokemons, setAllPokemons] = useState<any>([]);
    const [myPokemons, setMyPokemons] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const user = useSelector((state: RootState) => state.persistedReducer);
    const { email } = user; 

    useEffect(() => {
        async function fetchData() {
            const alldata = await API.get('/characters/all');
            setAllPokemons(alldata);
            setIsLoading(!isLoading);
        }
        fetchData();
      }, []);

    useEffect(() => {
        async function fetchMyData() {
            const data = await API.get(`/characterlist/detail/${email}`);
            setMyPokemons(data);
        }
        fetchMyData();
      }, []);
      
    return(
        <StoreContainer>
            <ContentsBox>

                <Contents>
                    <AllChaContainer>
                        {isLoading ? <Loading /> : 
                        (<>
                            {allPokemons.map((pokemon: any) => (
                            <>
                                <AllChaBox
                                key={pokemon._id}
                                id={pokemon._id}
                                show={
                                    myPokemons.filter((p:any) => p.characterId === pokemon.characterId).length !== 0 ? "mine" :null
                                }>
                                    <img src={pokemon.image.imageSprites.front_default} />
                                    <h4 style={{ alignSelf: 'center' }}>{pokemon.nameKo}</h4>
                                </AllChaBox> 
                            </>)
                            )}
                        </>)
                        }
                    </AllChaContainer>
                </Contents>

            </ContentsBox>
        </StoreContainer>
    )
}

const AllChaContainer = styled.div`
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    height: 90%;

    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
    scroll-behavior: smooth;
    padding: 1rem;

    &::-webkit-scrollbar {
    width: 0.7rem;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #A2BCFF;
    }

    &::-webkit-scrollbar-track {
    background-color: aliceblue;
    }

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
`

const AllChaBox = styled.div<any>`
    background-color: ${(props:any) => props.show === "mine" ? "#A2BCFF" : "aliceblue"};
    opacity: ${(props:any) => props.show === "mine" ? "100%" : "70%"};
    width: 120px;
    height: 150px;
    margin: 1rem;
    flex-shrink: 0;
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0,0,0,0.55);

    &:hover {
        transform: scale(1.1);
    }
`

