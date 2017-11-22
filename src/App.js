import React from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from './fire';
import Signin from './Signin';

const AppStyle = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    marginTop: '5%',
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
