import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from './fire';
import Signin from './Signin';

const AppStyle = {
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%'
  },
};

const App = () => {
  return (
    <div style={AppStyle.container}>
      {isAuthenticated() && <Redirect to={{ pathname: '/room' }} />}
      <Signin />
    </div>
  );
};

export default App;
