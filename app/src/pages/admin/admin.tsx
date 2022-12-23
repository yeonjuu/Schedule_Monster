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
const Body = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

function Admin() {
  console.log('어드민');
  const dispatch = useDispatch<any>();
  const [category, setCategory] = useState('all');
  useEffect(() => {
    dispatch(asyncCategoryListFetch());
    dispatch(asyncUserListFetch());
    dispatch(asyncitemListFetch());
    dispatch(asyncMonsterListFetch());
  }, []);
  return (
    <Body>
      <Banner setCategory={setCategory}></Banner>
      <Main>
        <div>
          <Routes>
            <Route
              path="/item"
              element={
                <ItemPage
                  setCategory={setCategory}
                  category={category}
                ></ItemPage>
              }
            ></Route>
            <Route
              path="/monster"
              element={
                <MonsterPage
                  setCategory={setCategory}
                  category={category}
                ></MonsterPage>
              }
            ></Route>
            <Route path="/user" element={<UserPage></UserPage>}></Route>
          </Routes>
        </div>
      </Main>
    </Body>
  );
}

export default Admin;
