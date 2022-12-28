import React, { useState, useEffect } from 'react';
import {
  ContentsBox,
  CharacterContainer,
  CharacterBox,
  StoreContainer,
  Contents,
} from '../../components/characters/StoreStyle';
import MonsterProfile from 'components/characters/MonsterProfile';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mainProfile, secondProfile, thirdProfile, mainName, mainAffection, characterId} from 'pages/characters/statusReducer';
import * as API from '../../api';
import Navbar from 'components/characters/Navbar';
import { RootState } from '../../store/store';
import Loading from 'components/characters/Loading';

export default function CharactersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<any[]>([]);

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { email } = user;

  useEffect(() => {
    async function fetchData() {
        const data = await API.get(`/characterlist/detail/${email}`);
        setPokemons(data);
        setIsLoading(!isLoading);
    }
    fetchData();
  }, []);

  return (
    <StoreContainer>
      <ContentsBox>
        <Navbar />
        
        <Contents>
          <CharacterContainer>
            {isLoading ? <Loading /> : (
              <>
                {pokemons.map((pokemon: any) => (
                  <CharacterBox
                    onClick={() => {
                      navigate(`/store/characters/${pokemon._id}`);
                      const clicked: any = pokemons.find(
                        (p) => p._id == pokemon._id,
                      );
                      const isMain = window.confirm(
                        `'${clicked.nameKo}'을/를 대표 캐릭터로 지정하시겠습니까?`,
                      );
                      if (isMain) {
                        dispatch(mainProfile(clicked.image.back_default));
                        dispatch(secondProfile(clicked.image.front_default));
                        dispatch(thirdProfile(clicked.image.front_shiny));
                        dispatch(mainName(clicked.nameKo));
                        dispatch(mainAffection(clicked.myExp));
                        dispatch(characterId(clicked._id));

                        API.put('/characterlist/pick',{ 
                          email,
                          characterId : clicked._id,
                        });
                      }

                    }}
                    key={pokemon._id}
                    // id={pokemon._id}
                  >
                    <img src={pokemon.myExp >= 50 && pokemon.myExp < 100 ? pokemon.image.front_default : pokemon.myExp >= 100 ? pokemon.image.front_shiny : pokemon.image.back_default} />
                    <h4 style={{ alignSelf: 'center' }}>{pokemon.nameKo}</h4>
                  </CharacterBox>
                ))}
              </>
            )}
          </CharacterContainer>

          <MonsterProfile />
        </Contents>

      </ContentsBox>
    </StoreContainer>
  );
}
