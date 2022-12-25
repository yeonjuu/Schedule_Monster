import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import * as API from '../../api';
import { asyncitemListFetch } from './slice/itemListSlice';
import { useDispatch, useSelector } from 'react-redux';
const EditItemBox = styled.div`
  background-color: white;
`;
const ImgBox = styled.div``;
const Img = styled.img`
  height: 150px;
  width: 150px;
`;

function EditItem({ itemData }: any) {
  const dispatch = useDispatch<any>();
  const categoryList = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  const [previewImg, setPreviewImg] = useState(itemData.image);
  const [check, setCheck] = useState(false);
  const [itemState, setItemState] = useState({
    _id: itemData._id,
    itemName: itemData.itemName,
    price: itemData.price,
    exp: itemData.exp,
    image: itemData.image,
    info: itemData.itemInfo,
    category: itemData.categoryName,
  });
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: any) => {
        draft.itemName = e.target.value;
      }),
    );
  };
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: any) => {
        draft.price = e.target.value;
      }),
    );
  };
  const onChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemState(
      produce((draft: any) => {
        draft.info = e.target.value;
      }),
    );
  };
  const onChangeImg = (e: any) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));

    setItemState(
      produce((draft: any) => {
        draft.image = '';
      }),
    );
  };
  const onChangeExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: any) => {
        draft.exp = e.target.value;
      }),
    );
  };
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemState(
      produce((draft: any) => {
        draft.category = e.target.value;
      }),
    );
  };
  useEffect(() => {
    setItemState({
      _id: itemData._id,
      itemName: itemData.itemName,
      price: itemData.price,
      exp: itemData.exp,
      image: itemData.image,
      info: itemData.itemInfo,
      category: itemData.categoryName,
    });
  }, [itemData]);
  useEffect(() => {
    dispatch(asyncitemListFetch());
    setCheck(false);
  }, [check, dispatch]);
  return (
    <EditItemBox>
      <form>
        <ImgBox>
          <Img src={previewImg}></Img>
        </ImgBox>
        <div>이미지업로드</div>
        <input type="file" onChange={onChangeImg} required />
        <div>이름</div>
        <input
          type="text"
          value={itemState.itemName}
          onChange={onChangeName}
          required
        />
        <div>가격</div>
        <input
          type="text"
          value={itemState.price}
          onChange={onChangePrice}
          required
        />
        <div>애정도</div>
        <input
          type="text"
          value={itemState.exp}
          onChange={onChangeExp}
          required
        />
        <div>카테고리</div>
        <select onChange={onChangeCategory} value={itemState.category}>
          <option value="">==선택하세요==</option>
          {categoryList.map((category: any): JSX.Element => {
            return (
              <option key={category._id} value={category.categoryName}>
                {category.categoryName}
              </option>
            );
          })}
        </select>
        <div>상세설명</div>
        <textarea
          name=""
          cols={30}
          rows={10}
          value={itemState.info}
          onChange={onChangeInfo}
          required
        ></textarea>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (window.confirm('수정 or 추가 하시겠습니까?')) {
              console.log({
                itemName: itemState.itemName,
                itemImage: '',
                itemInfo: itemState.info,
                price: itemState.price,
                exp: itemState.exp,
                categoryName: itemState.category,
              });
              try {
                itemState._id === ''
                  ? API.post('/items/register', {
                      itemName: itemState.itemName,
                      itemImage: '',
                      itemInfo: itemState.info,
                      price: itemState.price,
                      exp: itemState.exp,
                      categoryName: itemState.category,
                    })
                  : API.put('/items/update', {
                      _id: itemState._id,
                      itemName: itemState.itemName,
                      itemImage: '',
                      price: itemState.price,
                      exp: itemState.exp,
                      categoryName: itemState.category,
                      itemInfo: itemState.info,
                    });
              } catch {
                console.log('에러');
              } finally {
                setCheck(true);
              }
            }
          }}
        >
          {itemState._id === '' ? '추가' : '수정'}
        </button>
        {itemState._id === '' ? (
          <></>
        ) : (
          <button
            onClick={(e) => {
              if (window.confirm('삭제 하시겠습니까?')) {
                try {
                  e.preventDefault();

                  API.delete(`/items/delete/${itemState._id}`);
                } catch {
                  console.log('에러');
                } finally {
                  setCheck(true);
                }
              }
            }}
          >
            삭제
          </button>
        )}
      </form>
    </EditItemBox>
  );
}

export default EditItem;
