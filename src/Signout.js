import React, { Component } from 'react';
import history from './History';
import { auth, fbKey } from './fire';

class Signout extends Component {
  onSignout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      window.localStorage.removeItem(fbKey);
      history.replace({ pathname: '/' });
    }).catch((error) => {
      console.log('fb logout: ', error);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onSignout}>
          Signout
        </button>
      </div>
    );
  }
}

export default Signout;
