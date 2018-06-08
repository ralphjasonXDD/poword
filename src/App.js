import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './Components/Game';

const App = () => (
  <BrowserRouter>
    <Route path='/' component={Game} />
  </BrowserRouter>
);

export default App;
