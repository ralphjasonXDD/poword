import React, { Component } from 'react';
import history from './History';
import {
  fbKey,
  fbProvider,
  auth,
} from './fire';
import fbLogin from './fb_login.png';

class Signin extends Component {
  onSignin = (e) => {
    e.preventDefault();
    auth.signInWithPopup(fbProvider).then(() => {
      window.localStorage.setItem(
        fbKey,
        JSON.stringify({
          uid: auth.currentUser.uid,
          username: auth.currentUser.displayName,
        }),
      );

      history.push({ pathname: '/room' });
    }).catch((error) => {
      console.log('fb login: ', error);
    });
  }

  render() {
    return (
      <img src={fbLogin} alt="fb login" onClick={this.onSignin} />
    );
  }
}

export default Signin;
