import React, { useEffect, useState } from 'react';
import { CategoryListBox, CategoryInfo, SearchResetBox } from './adminCss';
import { useSelector, useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './slice/categoryListSlice';
import { UpdateButton } from 'pages/mypage/style';
import * as API from '../../api';
import {
  CategoryBox,
  Contents,
  ContentsBox,
  ItemContainer,
  ItemList,
  StoreContainer,
} from 'components/characters/StoreStyle';
import { AppDispatch } from 'store/store';

import { Plus } from './categoryPlus';
function CategoryItem({ category, setCheck }: any) {
  const itemList = useSelector((state: any) => state.itemListReducer.itemList);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  const findCategory = (): any => {
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].categoryName === category.categoryName) {
        return false;
      }
    }
    return true;
  };
  return (
    <CategoryInfo>
      <input
        padding-left="5px"
        type="text"
        value={categoryName}
        onChange={onChangeName}
      />
      <UpdateButton
        type="button"
        value={'수정'}
        onClick={() => {
          if (window.confirm('수정하시겠습니까?')) {
            try {
              API.put('/category/update', {
                _id: category._id,
                categoryName: categoryName,
              });
            } catch {
            } finally {
              setCheck(true);
            }
          }
        }}
      ></UpdateButton>
      <UpdateButton
        type="button"
        value={'삭제'}
        del
        onClick={() => {
          if (window.confirm('삭제하시겠습니까?')) {
            if (findCategory()) {
              try {
                API.delete(`/category/delete/${category._id}`);
              } catch {
              } finally {
                setCheck(true);
              }
            } else {
              window.alert('카테고리에 포함된 아이템이 존재합니다');
            }
          }
        }}
      ></UpdateButton>
    </CategoryInfo>
  );
}

function CategoryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [check, setCheck] = useState(false);
  const categoryList = useSelector(
    (state: any) => state.categoryListReducer.categoryList,
  );

  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    setCheck(false);
  }, [check]);
  return (
    <StoreContainer>
      <ContentsBox>
        <ItemList>
          <SearchResetBox>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div>카테고리 추가하기</div>
              <Plus setCheck={setCheck}></Plus>
            </div>
          </SearchResetBox>

          <ItemContainer>
            <CategoryBox>
              <CategoryListBox>
                {categoryList.map((category: any) => {
                  return (
                    <CategoryItem
                      key={category._id}
                      category={category}
                      setCheck={setCheck}
                    ></CategoryItem>
                  );
                })}
              </CategoryListBox>
            </CategoryBox>
          </ItemContainer>
        </ItemList>
      </ContentsBox>
    </StoreContainer>
  );
}

export default CategoryPage;
