import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../../pages/admin/adminCss';
import { StoreContainer } from 'components/characters/StoreStyle';

function CategoryList({ setCategory, purpose }: any) {
  const itemCategoryList = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  return (
    <>
    {purpose !== '상점' ? 
      <Container>
        <Category
          key={'all'}
          onClick={(): void => {
            setCategory('all');
          }}
        >
          전체
        </Category>
        {itemCategoryList.map((category: any, idx: number): JSX.Element => {
          return (
            <Category
              key={idx}
              onClick={(): void => {
                setCategory(itemCategoryList[idx].categoryName);
              }}
            >
              {category.categoryName}
            </Category>
          );
        })}
      </Container> :

      <BuyContainer>
        <Category
          key={'all'}
          onClick={(): void => {
            setCategory('all');
          }}
        >
          전체
        </Category>
        {itemCategoryList.map((category: any, idx: number): JSX.Element => {
          return (
            <Category
              key={idx}
              onClick={(): void => {
                setCategory(itemCategoryList[idx].categoryName);
              }}
            >
              {category.categoryName}
            </Category>
          );
        })}
      </BuyContainer>
    }

    </>
  );
}
export default CategoryList;


const BuyContainer = styled.div`
  display: flex;
  list-style: none;
  margin-bottom: 1rem;
`

const Category = styled.li`
  color: #404040;
  opacity: 80%;  
  margin-right: 1rem;
  font-size: 18px;
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`