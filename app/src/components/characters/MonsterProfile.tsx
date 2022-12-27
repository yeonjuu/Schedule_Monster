import React,{useEffect} from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { mainProfile, secondProfile, thirdProfile, mainName, mainAffection, characterId } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import * as API from '../../api';

export default function MonsterProfile() {

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { point, email } = user;

  const dispatch = useDispatch();
  const name = useSelector((state:any) => state.statusReducer.name);
  const mainId = useSelector((state:any) => state.statusReducer.mainId);
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

        dispatch(mainProfile(data.image.back_default));
        dispatch(secondProfile(data.image.front_default));
        dispatch(thirdProfile(data.image.front_shiny));
    }
    fetchData();
  }, []);


    return (
        <>
          <MonsterContainer>
                <MonsterImageContainer>
                  <MonsterImage src={
                    affection >= 50 ? secondImage : affection >= 100 ? thirdImage : mainImage
                  }
                  />
                </MonsterImageContainer>

                <MonsterStatus>
                  <ul>
                    <MonsterLine>이름 : {name}</MonsterLine>
                    <MonsterLine>애정도 : ❤️ {affection}</MonsterLine>
                    <MonsterLine>보유 코인 : 💰 {point}</MonsterLine>
                    <MonsterLine>{mainId}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}

