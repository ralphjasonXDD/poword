import React, { Component } from 'react';
import history from './History';
import injectSheet from 'react-jss';
import { auth, fbKey } from './fire';

const jssStyles = {
  wrap: {
    backgroundColor: '#322f40',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px'
  },
  signOutBtn: {
    backgroundColor: 'transparent',
    border: '0',
    color: '#f6a821',
    cursor: 'pointer',
    fontSize: '13px',
    '&:hover': {
      textDecoration: 'underline'
    },
  }
};

class Signout extends Component {
  onSignout(e) {
    e.preventDefault();
    auth.signOut().then(() => {
      window.localStorage.removeItem(fbKey);
      history.replace({ pathname: '/' });
    }).catch((error) => {
      console.log('fb logout: ', error);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrap}>
        <button className={classes.signOutBtn} onClick={this.onSignout}>
          Logout
        </button>
      </div>
    );
  }
}

export default injectSheet(jssStyles)(Signout);
