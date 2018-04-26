import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Room from './Components/Room';

const App = () => (
  <BrowserRouter>
    <Route path='/' component={Room} />
  </BrowserRouter>
);

export default App;
