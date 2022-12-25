import React, { useEffect, useState } from 'react';
import Search from '../../components/shop/search';
import { useSelector, useDispatch } from 'react-redux';
import { asyncCategoryListFetch } from './slice/categoryListSlice';

import * as API from '../../api';

function CategoryItem({ category, setCheck }: any) {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };
  return (
    <div>
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
            try {
              API.delete(`/category/delete/${category._id}`);
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
    </div>
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
  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    setCheck(false);
  }, [check]);
  return (
    <>
      <div>카테고리 관리</div>
      <div>
        <input type="text" value={categoryName} onChange={onChangeName} />
        <button
          onClick={() => {
            if (window.confirm('추가하시겠습니까?')) {
              try {
                API.post('/category/register', {
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
          추가하기
        </button>
      </div>
      <div>
        {categoryList.map((category: any) => {
          return (
            <CategoryItem
              key={category._id}
              category={category}
              setCheck={setCheck}
            ></CategoryItem>
          );
        })}
      </div>
    </>
  );
}

export default CategoryPage;
