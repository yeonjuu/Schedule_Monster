import React, { useState } from 'react';
import Search from '../../components/shop/search';
import MonsterList from '../../components/shop/monsterList';
import BannerItem from '../../components/shop/categories';
import EditMonster from './editMonster';
function MonsterPage({ setCategory, category }: any) {
  const [inputState, setInputState] = useState('');
  const [monster, setMonster] = useState({
    _id: '',
    characterName: '',
    images: {
      img1: '',
      img2: '',
      img3: '',
    },
    levelupPoint: {
      point1: 0,
      point2: 0,
      point3: 0,
    },
  });
  console.log('몬페리');

  return (
    <div>
      <BannerItem
        categories={[]}
        setCategory={setCategory}
        category={category}
      ></BannerItem>
      <Search setState={setInputState}></Search>
      <button
        onClick={() => {
          setMonster({
            _id: '',
            characterName: '',
            images: {
              img1: '',
              img2: '',
              img3: '',
            },
            levelupPoint: {
              point1: 0,
              point2: 0,
              point3: 0,
            },
          });
        }}
      >
        선택된 몬스터 리셋
      </button>
      <MonsterList
        category={category === 'all' ? 'all' : category}
        inputValue={inputState}
        setMonster={setMonster}
      ></MonsterList>
      <EditMonster monsterData={monster} setMonster={setMonster}></EditMonster>
    </div>
  );
}

export default MonsterPage;
