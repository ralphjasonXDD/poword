import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { browserHistory } from 'react-router';
import history from './History';
import { auth, fbKey } from './fire';

class Signout extends Component {
  onSignout = (e) => {
    e.preventDefault();
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
        <button onClick={this.onSignout}>
          Signout
        </button>
      </div>
    );
  }
}

export default Signout;
