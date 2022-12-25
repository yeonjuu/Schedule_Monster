import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '../../pages/admin/adminCss';

function CategoryList({ setCategory }: any) {
  const itemCategoryList = useSelector((state: any) => {
    return state.categoryListReducer.categoryList;
  });
  return (
    <>
      <Container>
        <li
          style={{ color: '#404040', opacity: '80%' }}
          key={'all'}
          onClick={(): void => {
            setCategory('all');
          }}
        >
          전체
        </li>
        {itemCategoryList.map((category: any, idx: number): JSX.Element => {
          return (
            <li
              style={{ color: '#404040', opacity: '80%' }}
              key={idx}
              onClick={(): void => {
                setCategory(itemCategoryList[idx].categoryName);
              }}
            >
              {category.categoryName}
            </li>
          );
        })}
      </Container>
    </>
  );
}
export default CategoryList;
