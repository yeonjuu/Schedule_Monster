import React from 'react';

import { Container } from '../../pages/admin/adminCss';

function CategoryList({ categories, setCategory }: any) {
  return (
    <>
      <Container>
        <li
          style={{color:'#404040', opacity:'80%'}}
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
              style={{color:'#404040', opacity:'80%'}}
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
