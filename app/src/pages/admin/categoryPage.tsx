import React, { useEffect, useState } from 'react';
import {
  InputCategory,
  CategoryAddBox,
  CategoryAddBtn,
  CategoryListBox,
  CategoryInfo,
} from './adminCss';
import { useSelector, useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './slice/categoryListSlice';

import * as API from '../../api';
import {
  CategoryBox,
  ContentsBox,
  ItemContainer,
  ItemList,
} from 'components/characters/StoreStyle';

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
      <input type="text" value={categoryName} onChange={onChangeName} />
      <button
        onClick={() => {
          if (window.confirm('수정하시겠습니까?')) {
            try {
              API.put('/category/update', {
                _id: category._id,
                categoryName: categoryName,
              });
            } catch {
              console.log('에러');
            } finally {
              setCheck(true);
            }
          }
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          if (window.confirm('삭제하시겠습니까?')) {
            if (findCategory()) {
              console.log('??');
              try {
                API.delete(`/category/delete/${category._id}`);
              } catch {
                console.log('에러');
              } finally {
                setCheck(true);
              }
            } else {
              window.alert('카테고리에 포함된 아이템이 존재합니다');
            }
          }
        }}
      >
        삭제
      </button>
    </CategoryInfo>
  );
}

function CategoryPage() {
  const dispatch = useDispatch<any>();
  const [check, setCheck] = useState(false);
  const categoryList = useSelector(
    (state: any) => state.categoryListReducer.categoryList,
  );
  const [categoryName, setCategoryName] = useState('');
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  const findCategory = (): any => {
    for (let i = 0; i < categoryList.length; i++) {
      console.log(categoryList[i].categoryName);
      console.log(categoryList);
      if (categoryList[i].categoryName === categoryName) {
        console.log(categoryList[i].categoryName);
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    setCheck(false);
    setCategoryName('');
  }, [check]);
  return (
    <ContentsBox>
      <ItemList>
        <CategoryAddBox>
          <InputCategory
            type="text"
            value={categoryName}
            onChange={onChangeName}
            placeholder="카테고리 이름을 입력하세요"
            required
          />
          <CategoryAddBtn
            onClick={() => {
              if (window.confirm('추가하시겠습니까?')) {
                if (findCategory()) {
                  try {
                    API.post('/category/register', {
                      categoryName: categoryName,
                    });
                  } catch {
                    console.log('에러');
                  } finally {
                    setCheck(true);
                  }
                } else {
                  window.alert('이미 같은 이름의 카테고리가 존재합니다');
                }
              }
            }}
          >
            추가하기
          </CategoryAddBtn>
        </CategoryAddBox>
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
  );
}

export default CategoryPage;
