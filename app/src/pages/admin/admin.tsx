import React, { useState } from 'react';
import Banner from './banner';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditItem from './editItem';
import ItemPage from './itemPage';
import MonsterPage from './monsterPage';
const Body = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
`;

function Admin() {
  const [category, setCategory] = useState('all');
  const itemCategories = useSelector((state: any) => {
    return state.itemCategories;
  });
  const monsterCategories = useSelector((state: any) => {
    return state.monsterCategories;
  });
  return (
    <Body>
      <Banner setCategory={setCategory}></Banner>
      <Main>
        <div>
          <Routes>
            <Route
              path="/item/:id"
              element={
                <ItemPage
                  categories={itemCategories}
                  setCategory={setCategory}
                  category={category}
                ></ItemPage>
              }
            ></Route>
            <Route
              path="/monster/:id"
              element={
                <MonsterPage
                  categories={monsterCategories}
                  type={'monster'}
                  setCategory={setCategory}
                  category={category}
                ></MonsterPage>
              }
            ></Route>
          </Routes>
        </div>
      </Main>
    </Body>
  );
}

export default Admin;
