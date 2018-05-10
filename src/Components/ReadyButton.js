import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssReadyButton } from '../Resources/jss_styles';


class ReadyButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <button className={classes.readyButton} onClick={this.props.handler}>Play Game</button>
      </div>
    );
  }
}

export default injectSheet(JssReadyButton)(ReadyButton);
