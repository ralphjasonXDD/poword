import React, { Component } from 'react';
import { JssTimer } from '../Resources/jss_styles';

class ReadyButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handler}>Ready</button>
      </div>
    );
  }
}

export default ReadyButton;
