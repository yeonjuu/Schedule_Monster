import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import filterCategory from '../../util/filterCategory';
import { useNavigate } from 'react-router-dom';
import { createFuzzyMatcher } from '../../util/filterHangul';
import { useParams } from 'react-router-dom';
import { ItemBox, ItemButton, QuanButton} from './../characters/StoreStyle';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

function ItemList({ category, inputValue, url, purpose, coin, setCoin, affection, setAffection}: any) {
  const [count, setCount] = useState(1);  

  const { id } = useParams();
  const navigate = useNavigate();
  const itemList =
    inputValue === ''
      ? filterCategory(category, 'items')
      : useSelector((state: any) => {
          return state.items.filter((val: any) => {
            return createFuzzyMatcher(inputValue, val.itemName);
          });
        });

  return (
    <>
      {itemList.map((item: any): JSX.Element => {
        return (
          <ItemBox key={item.itemId}>

          <div style={{display:'flex', justifyContent:'space-around', padding:'0.3rem'}}>
          <span>💰 {item.price}</span>
          <span>❤️ +{item.exp}</span>
          </div>

            <div
              onClick={(): void => {
                navigate(`${url}${item.itemId}`);
              }}
            >
              <div>{item.itemName}</div>
              {/* <div>{item.price}</div> */}
              
            </div>



            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>

            { purpose === '구매' ? (
              <>
              <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'0.3rem'}}>
                <QuanButton onClick={
                  (e) => {
                    count >= 2 ? setCount((cur) => cur-1) : setCount((cur) => cur);
                    console.log(e);
                  }
                  }>
                  <AiOutlineMinus/>
                </QuanButton>
                <span style={{margin: '0 1.5rem'}}>{count}</span>
                <QuanButton onClick={
                  () => setCount((cur) => cur+1) }>
                  <AiOutlinePlus/>
                </QuanButton>
              </div>

              <ItemButton onClick={() => 
                {const isPurchase = confirm(`'${item.itemName}' 아이템을 구매하시겠습니까?`);
                  if (isPurchase && coin >= item.price) {
                    setCoin((prev : number) => prev - item.price);
                }
                }}>
                {`${purpose}`}
              </ItemButton>

              </>
              )
               : null }

              
              { purpose === '사용' ? (
              <>
              <ItemButton onClick={() => 
                {const isPurchase = confirm(`'${item.itemName}' 아이템을 시용하시겠습니까?`);
                  if (isPurchase && coin >= item.price) {
                    setAffection((prev : number) => prev + item.exp);
                }
                }}>
                {`${purpose}`}
              </ItemButton>

              </>
              )

                : null }
              
              </div>


          </ItemBox>
        );
      })}
    </>
  );
}
export default ItemList;
