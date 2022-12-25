import React,{ useEffect,useState } from 'react';
import { ItemBox, ItemButton } from './StoreStyle';
import * as API from '../../api';
import { applyItem } from 'pages/characters/statusReducer';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCategoryListFetch } from 'pages/admin/slice/categoryListSlice';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';



export default function MyitemList ({ myItems, setMyItems, category, inputValue } :
    {   myItems: any;
        setMyItems: any;
        category: any;
        inputValue: any;
      }) : JSX.Element {

    const dispatch = useDispatch<any>();
    const currentCoin = useSelector((state: any) => state.statusReducer.coin);
    const [isLoading, setIsLoading] = useState(true);


    useEffect( () => {
        async function fetchData () {
            const data = await API.get('/items/all');
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
                alignItems: 'center',
                alignSelf: 'center',
                margin: '0 auto',
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
                    <span>+ ❤️{myitems.exp}</span>
                    </div>

                    <div>{myitems.itemName}</div>

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
                    const isUse = window.confirm(
                    `'${myitems.itemName}' 아이템을 시용하시겠습니까?`,
                    );
                    if (isUse && currentCoin != 0) {
                    dispatch(applyItem(myitems.exp));
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

