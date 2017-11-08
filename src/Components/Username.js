import React from 'react';
import PropTypes from 'prop-types';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      onLogin: props.onLogin
    }
  }

  handleChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  onLogin(e) {
    e.preventDefault();
    this.state.onLogin(
      this.state.username
    );
  }

  render() {
    return (
      <form onSubmit={this.onLogin.bind(this)}>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <button>login</button>
      </form>
    );
  }
}

Username.propTypes = {
  onLogin: PropTypes.func.isRequired
}


export default Username;