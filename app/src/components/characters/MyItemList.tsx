import React,{ useEffect,useState } from 'react';
import { ItemBox, ItemButton } from './StoreStyle';
import * as API from '../../api';
import { applyItem, mainAffection } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCategoryListFetch } from 'pages/admin/slice/categoryListSlice';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { RootState } from '../../store/store';

export default function MyitemList ({ myItems, setMyItems, category, inputValue } :
    {   myItems: any;
        setMyItems: any;
        category: any;
        inputValue: any;
      }) : JSX.Element {

    const dispatch = useDispatch<any>();
    const currentCoin = useSelector((state: any) => state.statusReducer.coin);
    
    const [isLoading, setIsLoading] = useState(true);

    const affection = useSelector((state:any) => state.statusReducer.affection);
    const mainImage = useSelector((state:any) => state.statusReducer.mainImage);
    const mainId = useSelector((state: any) => state.statusReducer.mainId);

    const user = useSelector((state: RootState) => state.persistedReducer);
    const { email, point } = user;

    useEffect( () => {
        async function fetchData () {
            //테스트 데이터
            const data = await API.get(`/useritem/detail/${email}`);
            setMyItems(data);
            setIsLoading(!isLoading);
        };
        fetchData();
        dispatch(asyncCategoryListFetch());
    },[]);


    //검색기능
    const myitemList =
    inputValue === ''
      ? filterCategory(category, myItems)
      : myItems.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.itemName);
        });


    return (
        <>
            {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
              }}
            >
              <h3>Loading...</h3>
              <img
                style={{ width: '6rem', height: '3rem' }}
                src="https://weichiachang.github.io/pokemon-master/img/loading.45600eb9.gif"
              />
            </div>
          ) : 
          ( <>
            {myitemList.map((myitems:any) => (
                <ItemBox
                key={myitems._id}
                >
                    <div
                        style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '0.3rem',
                        }}
                    >
                    {myitems.exp > 0 ? <span>+ ❤️{myitems.exp}</span> : null}
                    
                    </div>

                    <div style={{alignSelf:'center'}}>{myitems.itemName}</div>
                    <img style={{alignSelf:'center', width:'2rem', height:'2rem'}} src={myitems.itemImage}/>

                    <div
                        style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        }}
                    >

            {(
            <>
                <ItemButton
                onClick={() => {
                      const isEgg = myitems.categoryName == '알';

                  if (mainImage !== '/pokeball.png' || isEgg) {
                      const isUse = window.confirm(
                        `'${myitems.itemName}' 아이템을 시용하시겠습니까?`,
                        ); 

                      if (!isEgg && isUse && affection < 100 && mainImage !== '/pokeball.png') {
                      dispatch(applyItem(myitems.exp));
                      alert(`${myitems.exp}만큼 애정도가 채워졌습니다😊`);

                      API.post('/useritem/use', {
                        email,
                        itemId: myitems._id,        //사용하려는 아이템의 id
                        characterId: mainId,    // 아이템효과를 적용하려는 캐릭터의 id
                    });

                    //리페치
                      // const refetchMyItems = API.get(`/useritem/detail/${email}`);
                      // setMyItems(refetchMyItems);

                      }
                      else if (!isEgg && isUse && affection >= 100) {
                      alert('애정도가 이미 가득 채워졌습니다');
                    }

                    else if (isEgg && isUse) {
                      alert('새로운 포켓몬이 나왔습니다! 도감에서 확인해보세요.');
                      API.post('/useritem/egg', {
                        email,
                        itemId: myitems._id
                    })
                    }
                  }


                else if (!isEgg && mainImage === '/pokeball.png') {
                  const isEgg = myitems.categoryName == '알';

                    alert('대표캐릭터를 먼저 지정해주세요!');
                    }

                }}
                >
                사용하기
                </ItemButton>
            </>
            )}
        </div>

                </ItemBox>
            )
            )}
          </> )}

        </>
    )
};

