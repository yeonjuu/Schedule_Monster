import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Items from './pages/characters/Items';
import CalendarPage from './pages/calendar/CalendarPage';
import MyItems from './pages/characters/MyItems';
import CharactersList from './pages/characters/CharactersList';
import Root from './pages/characters/Root';
import { LoginRegister } from 'pages/login/LoginRegister';
import { Main } from 'pages/main/Main';
import Admin from './pages/admin/admin';
import { MyPage } from 'pages/mypage/UserMyPage';
import { PersistGate } from 'redux-persist/integration/react';
import { NotFound } from 'pages/NotFound';
import AllCharacters from 'pages/characters/AllCharacters';
import MonsterPage from 'pages/admin/monsterPage';
import UserPage from 'pages/admin/userPage';
import CategoryPage from 'pages/admin/categoryPage';
import ItemPage from 'pages/admin/itemPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <LoginRegister />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/calendar/todos/:dates',
    element: <CalendarPage />,
  },
  {
    path: '/calendar/todos/:isTodo/:scheduleId',
    element: <CalendarPage />,
  },
  {
    path: '/store',
    element: <Root />,

    errorElement: <NotFound />,
    children: [
      { index: true, element: <Items></Items> },
      { path: '/store/item/:id', element: <Items></Items> },
      { path: '/store/characters', element: <CharactersList></CharactersList> },
      {
        path: '/store/characters/:id',
        element: <CharactersList></CharactersList>,
      },
      { path: '/store/myitems', element: <MyItems></MyItems> },
      { path: '/store/myitems/:id', element: <MyItems></MyItems> },
      {
        path: '/store/allcharacters',
        element: <AllCharacters></AllCharacters>,
      },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <ItemPage></ItemPage> },
      { path: '/admin/item/', element: <ItemPage></ItemPage> },
      { path: '/admin/monster', element: <MonsterPage></MonsterPage> },
      { path: '/admin/user', element: <UserPage></UserPage> },
      { path: '/admin/category', element: <CategoryPage></CategoryPage> },
    ],
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <App />
    </Provider>
  </React.StrictMode>,
);
