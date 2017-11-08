import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from './History';
import Username from './Components/Username';


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
      <div className="App">
        <Username onLogin={this.onLogin.bind(this)} />
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string
}

export default App;
