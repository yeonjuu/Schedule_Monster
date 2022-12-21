import React, { useState } from 'react';

import { Container } from '../../pages/admin/bannerCss';
import Search from './search';
import NavItem from './ItemList';
import NavMonster from './monsterList';

function BannerItem({ categories, setCategory, category }: any) {
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
                setCategory(categories[idx]);
              }}
            >
              {category.categoryName}
            </li>
          );
        })}
      </Container>

      {/* {type === 'item' ? (
        <NavItem
          category={category === 'all' ? 'all' : category.categoryId}
          inputValue={inputState}
        ></NavItem>
      ) : (
        <NavMonster
          category={category === 'all' ? 'all' : category.categoryId}
          inputValue={inputState}
        ></NavMonster>
      )} */}
    </>
  );
}
export default BannerItem;
