import React from 'react';
import GlobalStyle from './components/layout/globalStyle';
import CalendarPage from './pages/calendar/CalendarPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <CalendarPage />
      </div>
    </>
  );
}

export default App;
