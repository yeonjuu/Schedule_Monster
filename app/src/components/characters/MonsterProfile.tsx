import React,{ useEffect, useState } from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { mainProfile, secondProfile, thirdProfile, mainName, mainAffection, characterId } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import * as API from '../../api';
import styled from 'styled-components';

export default function MonsterProfile() {

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { point, email } = user;

  const dispatch = useDispatch();
  const name = useSelector((state:any) => state.statusReducer.name);
  const affection = useSelector((state:any) => state.statusReducer.affection);
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);
  const secondImage = useSelector((state:any) => state.statusReducer.secondImage);
  const thirdImage = useSelector((state:any) => state.statusReducer.thirdImage);

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

  useEffect(
    () => setCurrentIndex(0)
    ,[mainImage])

  const slides:any = [thirdImage, mainImage, secondImage];
  const prevSlides:any = [secondImage, mainImage];
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length-1 : currentIndex-1;
    setCurrentIndex(newIndex);
  };

  const nextHandler = () => {
    const isLastSlide = currentIndex === slides.length -1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const halfPreviousHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? prevSlides.length-1 : currentIndex-1;
    setCurrentIndex(newIndex);
  };

  const halfNextHandler = () => {
    const isLastSlide = currentIndex === prevSlides.length -1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

    return (
        <>
          <MonsterContainer>
            {affection >= 100 || affection >= 50 && affection <100 ? 
            (
              <>
            <MonsterImageContainer>
              <MonsterImage src={affection >= 100 ? slides[currentIndex] : prevSlides[currentIndex]}
              />
            </MonsterImageContainer>

            <div>

            <ImageButton onClick={affection >= 100 ? previousHandler : halfPreviousHandler}>
              ◀︎
            </ImageButton>
            <ImageButton onClick={affection >= 100 ? nextHandler: halfNextHandler}>▶︎</ImageButton>
            
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
                    <MonsterLine>보유 코인 : 💰 {point}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}


const ImageButton = styled.button`
  cursor: pointer;
  background-color: aliceblue;
  color: #85a6fc;
  font-size: 20px;
  width: 2rem;
  height: 2rem;
  margin: 0 1.5rem;
  border: none;
  border-radius: 30%;

  box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.55);

  &:hover {
    color: #668ff7;
    box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.77);
    -webkit-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.77);
    -moz-box-shadow: 7px 10px 22px -8px rgba(0, 0, 0, 0.77);
  }
`