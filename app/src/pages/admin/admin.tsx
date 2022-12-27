import React, { useEffect } from 'react';
import Banner from './banner';

import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ItemPage from './itemPage';
import MonsterPage from './monsterPage';
import UserPage from './userPage';
import { asyncCategoryListFetch } from './slice/categoryListSlice';
import { asyncitemListFetch } from './slice/itemListSlice';

import { asyncMonsterListFetch } from './slice/monsterListSlice';
import CategoryPage from './categoryPage';

import { Header } from 'components/header/Header';
import { StoreContainer } from 'components/characters/StoreStyle';
function Admin() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    dispatch(asyncitemListFetch());
    dispatch(asyncMonsterListFetch());
  }, []);
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <StoreContainer>
        <Routes>
          <Route path="/item" element={<ItemPage></ItemPage>}></Route>
          <Route path="/monster" element={<MonsterPage></MonsterPage>}></Route>
          <Route path="/user" element={<UserPage></UserPage>}></Route>
          <Route
            path="/category"
            element={<CategoryPage></CategoryPage>}
          ></Route>
        </Routes>
      </StoreContainer>
    </>
  );
}

export default Admin;
