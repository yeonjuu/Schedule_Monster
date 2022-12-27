import React,{useEffect} from 'react';
import { MonsterContainer, MonsterImage, MonsterImageContainer, MonsterLine, MonsterStatus } from './StoreStyle';
import { mainImage, secondImage, thirdImage, mainName } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import * as API from '../../api';

export default function MonsterProfile() {

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { point, email } = user;

  const dispatch = useDispatch();
  // const name = useSelector((state:any) => state.statusReducer.name);
  const mainName = useSelector((state:any) => state.statusReducer.mainName);
  // const coin = useSelector((state:any) => state.statusReducer.coin);
  const affection = useSelector((state:any) => state.statusReducer.affection);
  const mainImage = useSelector((state:any) => state.statusReducer.mainImage);
  const secondImage = useSelector((state:any) => state.statusReducer.secondImage);
  const thirdImage = useSelector((state:any) => state.statusReducer.thirdImage);


  useEffect(() => {
    async function fetchData() {
        //api주소 변경 필요     `/characterlist/pick/${email}`
        const data = await API.get('/characterlist/pick/chaeyujin@email.com');
        // dispatch(mainImage(data.image.back_default));
        // dispatch(secondImage(data.image.front_default));
        // dispatch(thirdImage(data.image.front_shiny));
        dispatch(mainName(data.nameKo));
        console.log(data);
        console.log(data.nameKo);
    }
    fetchData();
  }, []);


    return (
        <>
          <MonsterContainer>
                <MonsterImageContainer>
                  <MonsterImage src={
                    affection === 100 ? secondImage : affection === 200 ? thirdImage : mainImage
                  }
                  />
                </MonsterImageContainer>

                <MonsterStatus>
                  <ul>
                    <MonsterLine>이름 : {mainName}</MonsterLine>
                    <MonsterLine>애정도 : ❤️ {affection}</MonsterLine>
                    <MonsterLine>보유 코인 : 💰 {point}</MonsterLine>
                  </ul>
                </MonsterStatus>
          </MonsterContainer>
      </>
    );
}

