import React, { useState } from 'react';
import Search from '../../components/shop/search';
import MonsterList from '../../components/shop/monsterList';
import BannerItem from '../../components/shop/categories';

function MonsterPage({ categories, setCategory, category }: any) {
  const [inputState, setInputState] = useState('');
  return (
    <div>
      <BannerItem
        categories={categories}
        setCategory={setCategory}
        category={category}
      ></BannerItem>
      <Search setState={setInputState}></Search>
      <MonsterList
        category={category === 'all' ? 'all' : category}
        inputValue={inputState}
      ></MonsterList>
    </div>
  );
}

export default MonsterPage;
