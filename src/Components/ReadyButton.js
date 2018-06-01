import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssReadyButton } from '../Resources/jss_styles';

class ReadyButton extends Component {
  bothReady() {
    return this.props.opponent.isReady && this.props.player.isReady;
  }

  render() {
    const { classes } = this.props;
    const readyButtonText = this.props.player.isReady ? "Waiting other player ready" : "Ready to play"
    const buttonText = this.props.opponentAvailable ? readyButtonText : "Waiting for another player";
    const readyButton = (
      <button className={classes.readyButton} onClick={this.props.playerReady}>{buttonText}</button>
    );
    const displayButton = this.bothReady() ? "" : readyButton;

    return (
      <div className={classes.readyButtonWrap}>{displayButton}</div>
    );
  }
}

export default injectSheet(JssReadyButton)(ReadyButton);
