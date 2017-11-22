import React, { Component } from 'react';
import injectSheet from 'react-jss';
import history from './History';
import {
  fbKey,
  fbProvider,
  auth,
} from './fire';
import fbLogin from './fb-login.png';
import mainLogo from './logo-poword.png'

const jssStyles = {
  fbLogin: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px'
  },
  images: {
    maxWidth: '100%'
  }
};

class Signin extends Component {
  onSignin(e) {
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
    const { classes } = this.props;
    return (
      <div>
        <figure>
          <img className={classes.images} src={mainLogo} alt="poword logo"/>
        </figure>
        <figure className={classes.fbLogin}>
          <img className={classes.images} src={fbLogin} alt="fb login" onClick={this.onSignin} />
        </figure>
      </div>
    );
  }
}

export default injectSheet(jssStyles)(Signin);
