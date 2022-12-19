import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './components/layout/globalStyle';
import { LoginRegister } from './pages/Login/Login';
import Items from './pages/characters/Items';
import CalendarPage from './pages/calendar/CalendarPage';
import MyItems from './pages/characters/MyItems';
import CharactersList from './pages/characters/CharactersList';

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/store" element={<Items />} />
            <Route path="/store/myitems" element={<MyItems />} />
            <Route path="/store/characters" element={<CharactersList />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
