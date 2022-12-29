import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { ItemBox, ItemButton, QuanButton, Tooltip } from './../characters/StoreStyle';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import * as API from '../../api';
import { minusPoint } from 'pages/login/userSlice';

function Item({ item, purpose }: any) {
  const dispatch = useDispatch<any>();
  // const currentCoin = useSelector((state: any) => state.statusReducer.coin);
  const [count, setCount] = useState(1);

  const user = useSelector((state: RootState) => state.persistedReducer);
  const { point, email } = user;

  useEffect( 
    () => setCount(1)
    ,[point])

  return (
    <ItemBox>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '0.3rem',
        }}
      >
        {purpose === '구매' ? (
          <>
          <span style={{ fontSize: '15px' }}>💰 {item.price}</span>
          {item.categoryName !== '알' ? <span style={{fontSize:'15px'}}>+❤️ {item.exp}</span> : null}
          </>

        ) : null}
      </div>

      <div style={{alignSelf:'center'}}>{item.itemName}</div>
      <img style={{alignSelf:'center', width:'2rem', height:'2rem'}} src={item.itemImage}/>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {purpose === '구매' ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '0.3rem',
              }}
            >
              <QuanButton
                onClick={(e) => {
                  count >= 2
                    ? setCount((cur) => cur - 1)
                    : setCount((cur) => cur);
                }}
              >
                <AiOutlineMinus />
              </QuanButton>
              <span style={{ margin: '0 1.5rem' }}>{count}</span>
              <QuanButton onClick={() => setCount((cur) => cur + 1)}>
                <AiOutlinePlus />
              </QuanButton>
            </div>

            <ItemButton
              onClick={() => {
                if(point >= item.price * count) {
                  const isPurchase = window.confirm(
                    `'${item.itemName}' 아이템을 구매하시겠습니까?`,
                  );

                  if (isPurchase && point >= item.price * count) {

                    dispatch(minusPoint(item.price * count));

                    API.post('/useritem/buy', {
                      email,
                      itemName: item.itemName,
                      itemImage: item.itemImage,
                      itemInfo: item.itemInfo,
                      price: item.price,
                      exp: item.exp,
                      categoryName: item.categoryName,
                      quantity: count,
                  });

                  alert('구매 완료 하였습니다. 내아이템에서 확인해보세요!')
                  } 

                  else if (isPurchase && point < item.price * count) {
                    alert('보유 코인이 부족합니다😭');
                  }
                }

                else if(point < item.price) {
                  alert('보유 코인이 부족합니다😭');
                }


              }}
            >
              {`${purpose}`}
            </ItemButton>
            <Tooltip>{item.itemInfo}</Tooltip>


          </>
        ) : null}
      </div>
    </ItemBox>
  );
}

function ItemList({ category, inputValue, purpose, setItem }: any) {
  const reducerData = useSelector((state: any) => state.itemListReducer);
  const data = reducerData.itemList;
  const itemList =
    inputValue === ''
      ? filterCategory(category, data)
      : data.filter((val: any) => {
          return createFuzzyMatcher(inputValue, val.itemName);
        });
  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <Item
            item={item}
            purpose={purpose}
            key={item._id}
          ></Item>
        );
      })}
    </>
  );
}
export default ItemList;
