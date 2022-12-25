import React, { useEffect, useState } from 'react';
import Banner from './banner';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ItemPage from './itemPage';
import MonsterPage from './monsterPage';
import UserPage from './userPage';
import { asyncCategoryListFetch } from './slice/categoryListSlice';
import { asyncitemListFetch } from './slice/itemListSlice';
import { asyncUserListFetch } from './slice/userListSlice';
import { asyncMonsterListFetch } from './slice/monsterListSlice';
import CategoryPage from './categoryPage';
const Body = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

function Admin() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    dispatch(asyncUserListFetch());
    dispatch(asyncitemListFetch());
    dispatch(asyncMonsterListFetch());
  }, []);
  return (
    <Body>
      <Banner></Banner>
      <Main>
        <div>
          <Routes>
            <Route path="/item" element={<ItemPage></ItemPage>}></Route>
            <Route
              path="/monster"
              element={<MonsterPage></MonsterPage>}
            ></Route>
            <Route path="/user" element={<UserPage></UserPage>}></Route>
            <Route
              path="/category"
              element={<CategoryPage></CategoryPage>}
            ></Route>
          </Routes>
        </div>
      </Main>
    </Body>
  );
}

export default Admin;
