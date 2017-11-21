import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import history from './History';
import logo from './logo.png'

import {
  auth,
  fbProvider,
  fbKey,
  isAuthenticated
} from './fire';


class App extends Component {
  constructor() {
    super();
  }

  onLogin() {
    auth.signInWithPopup(fbProvider).then(function(result) {
      window.localStorage.setItem(
        fbKey,
        JSON.stringify({
          uid: auth.currentUser.uid,
          username: auth.currentUser.displayName
        })
      );

      history.push({pathname: '/room'});
    }).catch(function(error) {
      console.log('fb login: ', error);
    });
  }

  onLogout() {
    auth.signOut().then(function() {
      window.localStorage.removeItem(fbKey);
      history.replace({pathname: '/'})
    }).catch(function(error) {
      console.log('fb logout: ', error);
    });
  }

  render() {
    return (
      <div>
        {isAuthenticated() && <Redirect to={{pathname: '/room'}} />}
        <div>
          <img src={logo} alt="poword logo" />
          <button onClick={this.onLogin}>FB Login</button>
        </div>
      </div>
    );
  }
}


export default App;
