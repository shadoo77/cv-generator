import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MainApp from './components/MainApp';
import { AnimalesProvider } from './contexts/animalesContext';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Router>
        <div className="App">
          <AnimalesProvider>
            <MainApp />
          </AnimalesProvider>
        </div>
      </Router>
    </StyledEngineProvider>
  );
}

export default App;
