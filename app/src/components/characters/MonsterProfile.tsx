import React,{useEffect} from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { mainProfile, secondProfile, thirdProfile, mainName, mainAffection, characterId } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import { IoBatteryDeadOutline, IoBatteryHalfOutline, IoBatteryFullOutline } from 'react-icons/io';
import { FaBatteryEmpty, FaBatteryHalf, FaBatteryFull } from 'react-icons/fa';

import * as API from '../../api';
import styled from 'styled-components';

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


  useEffect(() => {
    async function fetchData() {
        //api주소 변경 필요     `/characterlist/pick/${email}`
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


    return (
        <>
          <MonsterContainer>
                <MonsterImageContainer>
                  <MonsterImage src={
                    affection >= 50 && affection < 100 ? secondImage : affection >= 100 ? thirdImage : mainImage
                  }
                  />
                </MonsterImageContainer>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                <ImageButton>⬅</ImageButton>
                <ImageButton>➡</ImageButton>
                </div>



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
  border: none;
`