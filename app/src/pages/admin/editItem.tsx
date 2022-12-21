import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';
import { changeItem } from '../../store/mockData';

const EditItemBox = styled.div`
  background-color: white;
`;
const ImgBox = styled.div``;
const Img = styled.img`
  height: 150px;
  width: 150px;
`;

function EditItem() {
  const dispatch = useDispatch();
  const itemList = useSelector((state: any) => state.items);
  const categories = useSelector((state: any) => state.itemCategories);
  const { id } = useParams();
  const selectItem = itemList.find((item: any): any => {
    return item.itemId === id;
  });
  const initialstate =
    id === 'normal'
      ? {
          itemId: '',
          itemName: '',
          price: '',
          exp: '',
          image: '',
          info: '',
          category: '',
        }
      : {
          itemId: selectItem.itemId,
          itemName: selectItem.itemName,
          price: selectItem.price,
          exp: selectItem.exp,
          image: selectItem.imgage,
          info: selectItem.info,
          category: selectItem.category,
        };

  const [itemState, setItemState] = useState(initialstate);
  const [previewImg, setPreviewImg] = useState(initialstate.image);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft) => {
        draft.itemName = e.target.value;
      }),
    );
  };
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft) => {
        draft.price = e.target.value;
      }),
    );
  };
  const onChangeInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemState(
      produce((draft) => {
        draft.info = e.target.value;
      }),
    );
  };
  const onChangeImg = (e: any) => {
    setPreviewImg(URL.createObjectURL(e.target.files[0]));

    setItemState(
      produce((draft) => {
        draft.image = '';
      }),
    );
  };
  const onChangeExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState(
      produce((draft) => {
        draft.exp = e.target.value;
      }),
    );
  };
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemState(
      produce((draft) => {
        draft.category = e.target.value;
      }),
    );
  };
  useEffect((): void => {
    setItemState(initialstate);
    setPreviewImg(initialstate.image);
  }, [id]);
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
          {categories.map((category: any): JSX.Element => {
            return (
              <option key={category.categoryId} value={category.categoryName}>
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
            dispatch(changeItem(itemState));
          }}
        >
          {id === 'normal' ? '추가' : '수정'}
        </button>
      </form>
    </EditItemBox>
  );
}

export default EditItem;
