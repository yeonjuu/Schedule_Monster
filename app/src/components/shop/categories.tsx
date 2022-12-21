import React from 'react';

import { Container } from '../../pages/admin/adminCss';

function CategoryList({ categories, setCategory }: any) {
  return (
    <>
      <Container>
        <li
          key={'all'}
          onClick={(): void => {
            setCategory('all');
          }}
        >
          전체
        </li>
        {categories.map((category: any, idx: number): JSX.Element => {
          return (
            <li
              key={idx}
              onClick={(): void => {
                setCategory(categories[idx].categoryName);
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
