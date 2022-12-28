import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import * as API from '../../api';
import { asyncitemListFetch } from './slice/itemListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ItemType } from 'types/shopTypes';
import {
  EditItemBoxContainer,
  UploadFileBox,
  InputBox,
  AddAndEditBtn,
  DelBtn,
} from './adminCss';
import { resetItem } from './util/util';
import { AppDispatch, RootState } from 'store/store';
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
`;
const Img = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 0.5rem;
  border: 0.5px solid #a2bcff; ;
`;

function EditItem({ itemData }: any) {
  const urlInput = useRef<any>();
  const dispatch = useDispatch<AppDispatch>();
  const categoryList = useSelector((state: RootState) => {
    return state.categoryListReducer.categoryList;
  });
  const [check, setCheck] = useState(false);
  const [itemState, setItemState] = useState<ItemType>({
    _id: itemData._id,
    itemName: itemData.itemName,
    price: itemData.price,
    exp: itemData.exp,
    itemImage: itemData.itemImage,
    itemInfo: itemData.itemInfo,
    categoryName: itemData.categoryName,
  });

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: ItemType) => {
        draft.itemName = e.target.value;
      }),
    );
  };
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: ItemType) => {
        draft.price = e.target.value;
      }),
    );
  };
  const onChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemState(
      produce((draft: ItemType) => {
        draft.itemInfo = e.target.value;
      }),
    );
  };
  const onChangeImg = () => {
    setItemState(
      produce((draft: ItemType) => {
        draft.itemImage = urlInput.current.value;
      }),
    );
  };
  const onChangeExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft: ItemType) => {
        draft.exp = e.target.value;
      }),
    );
  };
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemState(
      produce((draft: ItemType) => {
        draft.categoryName = e.target.value;
      }),
    );
  };
  useEffect(() => {
    setItemState({
      _id: itemData._id,
      itemName: itemData.itemName,
      price: itemData.price,
      exp: itemData.exp,
      itemImage: itemData.itemImage,
      itemInfo: itemData.itemInfo,
      categoryName: itemData.categoryName,
    });
    urlInput.current.value = itemData.itemImage;
  }, [itemData]);

  useEffect(() => {
    setCheck(false);
    dispatch(asyncitemListFetch());
    setItemState(resetItem);
    urlInput.current.value = '';
  }, [check]);

  return (
    <EditItemBoxContainer>
      <ImgBox>
        <Img
          src={itemState.itemImage}
          alt="이미지가 없거나  이미지 파일이 아닙니다"
        ></Img>
      </ImgBox>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            window.confirm(
              `${
                itemState._id === '' ? '추가하시겠습니까?' : '수정하시겠습니까?'
              }`,
            )
          ) {
            try {
              if (itemState._id === '') {
                API.post('/items/register', {
                  itemName: itemState.itemName,
                  itemImage: itemState.itemImage,
                  itemInfo: itemState.itemInfo,
                  price: itemState.price,
                  exp: itemState.exp,
                  categoryName: itemState.categoryName,
                });
              } else {
                API.put('/items/update', {
                  _id: itemState._id,
                  itemName: itemState.itemName,
                  itemImage: itemState.itemImage,
                  price: itemState.price,
                  exp: itemState.exp,
                  categoryName: itemState.categoryName,
                  itemInfo: itemState.itemInfo,
                });
              }
            } catch {
              console.log('에러');
            } finally {
              setCheck(true);
            }
          }
        }}
      >
        <UploadFileBox>
          <label htmlFor="upload">이미지url업로드</label>
          <input
            type="text"
            defaultValue={itemState.itemImage}
            id="upload"
            ref={urlInput}
            required
          />
          <button type="button" onClick={onChangeImg}>
            url 이미지 가져오기
          </button>
        </UploadFileBox>
        <InputBox>
          <div>이름</div>
          <input
            type="text"
            value={itemState.itemName}
            onChange={onChangeName}
            required
          />
          <div>가격</div>
          <input
            type="number"
            value={itemState.price}
            onChange={onChangePrice}
            required
          />
          <div>애정도</div>
          <input
            type="number"
            value={itemState.exp}
            onChange={onChangeExp}
            required
          />
          <div>카테고리</div>
          <select onChange={onChangeCategory} value={itemState.categoryName}>
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
            value={itemState.itemInfo}
            onChange={onChangeInfo}
            required
          ></textarea>
        </InputBox>

        <AddAndEditBtn>{itemState._id === '' ? '추가' : '수정'}</AddAndEditBtn>
        {itemState._id === '' ? (
          <></>
        ) : (
          <DelBtn
            type="button"
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
          </DelBtn>
        )}
      </form>
    </EditItemBoxContainer>
  );
}

export default EditItem;
