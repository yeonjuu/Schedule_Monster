import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, {css} from 'styled-components';
import { asyncCategoryListFetch } from 'pages/admin/slice/categoryListSlice';
import { Container } from '../../pages/admin/adminCss';
import { AppDispatch } from 'store/store';

function CategoryList({ setCategory, purpose }: any) {
  const [current, setCurrent] = useState('전체');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(asyncCategoryListFetch());
  }, []);
  const itemCategoryList = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  return (
    <>
      {purpose !== '상점' ? (
        <Container>
          <Category
            key={'all'}
            onClick={(): void => {
              setCategory('all');
              setCurrent('전체');
            }}
            active={current==='전체'}
          >
            전체
          </Category>
          {itemCategoryList.map((category: any, idx: number): JSX.Element => {
            return (
              <Category
                key={idx}
                onClick={(): void => {
                  setCategory(itemCategoryList[idx].categoryName);
                  setCurrent(itemCategoryList[idx]);
                }}
                active={current===itemCategoryList[idx]}
              >
                {category.categoryName}
              </Category>
            );
          })}
        </Container>
      ) : (
        <BuyContainer>
          <Category
            key={'all'}
            onClick={(): void => {
              setCategory('all');
              setCurrent('전체');
            }}
            active={current === '전체'}
          >
            전체
          </Category>
          {itemCategoryList.map((category: any, idx: number): JSX.Element => {
            return (
              <Category
                key={idx}
                onClick={(): void => {
                  setCategory(itemCategoryList[idx].categoryName);
                  setCurrent(itemCategoryList[idx])
                }}
                active={current === itemCategoryList[idx]}
              >
                {category.categoryName}
              </Category>
            );
          })}
        </BuyContainer>
      )}
    </>
  );
}
export default CategoryList;

const BuyContainer = styled.div`
  display: flex;
  list-style: none;
  margin-bottom: 1rem;
`;

const Category = styled.li<{active:boolean}>`
  color: #404040;
  opacity: 78%;
  margin-right: 1rem;
  font-size: 18px;

  ${(props) => props.active && css`
    color: black;
  `}

  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`;
