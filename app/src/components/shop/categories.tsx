import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../../pages/admin/adminCss';

function CategoryList({ setCategory }: any) {
  const itemCategoryList = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  return (
    <>
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
      </Container>
    </>
  );
}
export default CategoryList;


const Category = styled.li`
  color: #404040;
  opacity: 80%;
  
  &:hover {
    opacity: 60%;
    cursor: pointer;
  }
`