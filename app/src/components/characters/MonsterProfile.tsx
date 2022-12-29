import React,{ useEffect, useState } from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { mainProfile, secondProfile, thirdProfile, mainName, mainAffection, characterId } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import * as API from '../../api';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';

export default function MonsterProfile() {

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { point, email } = user;

  const dispatch = useDispatch();
  const name = useSelector((state:any) => state.statusReducer.name);
  // const mainId = useSelector((state:any) => state.statusReducer.mainId);
  // const coin = useSelector((state:any) => state.statusReducer.coin);
  const affection = useSelector((state:any) => state.statusReducer.affection);
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);
  const secondImage = useSelector((state:any) => state.statusReducer.secondImage);
  const thirdImage = useSelector((state:any) => state.statusReducer.thirdImage);

  const [isFull, setIsFull] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
        const data = await API.get(`/characterlist/pick/${email}`);

        dispatch(mainName(data.nameKo));
        dispatch(mainAffection(data.myExp));
        dispatch(characterId(data._id));

        dispatch(mainProfile(data.image.imageSprites.back_default));
        dispatch(secondProfile(data.image.imageSprites.front_default));
        dispatch(thirdProfile(data.image.imageSprites.front_shiny));
    }
    fetchData();
  }, []);

  const buttonHandler = (e:any) => {
    console.dir(e.target);
  };


    return (
        <>
          <MonsterContainer>
            {affection >= 100 ? 
            (
              <>
            <MonsterImageContainer>
              <MonsterImage src={thirdImage}
              />
            </MonsterImageContainer>

            <div style={{display:'flex', justifyContent:'space-around'}}>
            {/* <ImageButton>⬅</ImageButton>
            <ImageButton onClick={buttonHandler}>➡</ImageButton> */}
            <ImageSlider></ImageSlider>
            </div>
            
            </>

            )
            : 
              <MonsterImageContainer>
                <MonsterImage src={
                  affection >= 50 && affection < 100 ? secondImage : affection >= 100 ? thirdImage : mainImage
                }
                />
              </MonsterImageContainer>
            }

                <MonsterStatus>
                  <ul>
                    <MonsterLine>이름 : {name}</MonsterLine>
                    <MonsterLine>애정도 : ❤️ {affection > 100 ? 100 : affection}</MonsterLine>
                    {/* <MonsterLine>애정도 : {affection >= 50 && affection < 100 ? ' ❤️ ❤️ ' : affection >= 100 ? ' ❤️ ❤️ ❤️ ❤️ ' : '🖤'}</MonsterLine> */}
                    {/* <MonsterLine>
                      <div style={{display:'flex', alignItems:'center'}}>
                        애정도 ❤️ :  
                        <AffectionStatus />
                        <AffectionStatus />
                        <AffectionStatus />
                        <AffectionStatus /> 
                        {affection > 100 ? 100 : `${affection}`}
                      </div></MonsterLine> */}
                    <MonsterLine>보유 코인 : 💰 {point}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}

const AffectionStatus = styled.div`
  background-color: #85a6fc;
  border-radius: 20%;
  margin-left: 3px;
  width: 1.2rem;
  height: 0.7rem;
`

const ButtonContainer = styled.div`
  display: flex;

`

const ImageButton = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  margin: 0 1rem;
  border: none;
  border-radius: 20%;
`