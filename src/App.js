import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from './History';
import Username from './Components/Username';
import logo from './logo.png'


class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }

  onLogin(username) {
    this.setState({
      username: username
    });
    history.push({ pathname: `/room/${username}` })
  }

  render() {
    return (
      <div style={AppStyle.container}>
        <div style={AppStyle.logo}>
          <img src={logo} alt="poword logo" />
          <Username onLogin={this.onLogin.bind(this)} />
        </div>
      </div>
    );
  }
}

const AppStyle = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%',
    height: '100%'
  }
}

App.propTypes = {
  username: PropTypes.string
}

export default App;
