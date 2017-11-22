import React from 'react';
import { Redirect } from 'react-router-dom';
import logo from './logo.png';
import { isAuthenticated } from './fire';
import Signin from './Signin';

const App = () => {
  return (
    <div>
      {isAuthenticated() && <Redirect to={{ pathname: '/room' }} />}
      <div>
        <img src={logo} alt="poword logo" />
        <Signin />
      </div>
    </div>
  );
};

export default App;
