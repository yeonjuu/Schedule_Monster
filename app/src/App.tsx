import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider} from 'react-router-dom';
import GlobalStyle from './components/layout/globalStyle';
import { LoginRegister } from './pages/Login/Login';
import Items from './pages/characters/Items';
import CalendarPage from './pages/calendar/CalendarPage';
import MyItems from './pages/characters/MyItems';
import CharactersList from './pages/characters/CharactersList';
import Root from './pages/characters/Root';


const router = createBrowserRouter([
  {
    path:'/',
    element: <LoginRegister />
  },
  {
    path:'/calendar',
    element: <CalendarPage />
  },
  {
    path:'/store',
    element: <Root />,
    errorElement : <p>페이지를 찾을 수 없습니다😭</p>,
    children: [
      {index : true, element : <Items></Items>},
      {path : '/store/characters', element:<CharactersList></CharactersList>},
      {path : '/store/myitems', element:<MyItems></MyItems>}
    ]
  }
]);


function App() {
  return (
    <>
      <GlobalStyle />

      <RouterProvider router={router} />
      <div className="App">
      </div>
      
    </>
  );
}

export default App;