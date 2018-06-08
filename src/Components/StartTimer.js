import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssStartTimer } from '../Resources/jss_styles.js';
import countdown from '../Resources/audio/countdown.mp3';
import start from '../Resources/audio/start.mp3';

const SOUNDS = {
  countdown: new Audio(countdown),
  start: new Audio(start),
};

class StartTimer extends Component {
  constructor(props) {
    super();
    this.state = {
      startTime: 4,
      displayTime: 'READY',
    };
    this.timer = 0;
  }

  componentDidUpdate() {
    if (this.props.opponentReady && this.props.playerReady && this.timer === 0) {
      this.startTimer();
    }
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    const sec = this.state.startTime - 1;
    this.setState({ startTime: sec, displayTime: sec });

    if (this.state.startTime > 0) {
      this.props.playSound(SOUNDS.countdown);
    }

    if (this.state.startTime === 0) {
      this.props.playSound(SOUNDS.start);
      this.setState({ displayTime: 'GO!' });
    }

    if (this.state.startTime < 0) {
      clearInterval(this.timer);
      this.props.handler();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={this.state.startTime < 0 || !this.props.opponentReady || !this.props.playerReady ? 'hidden' : 'show'}>
        <div className={classes.startTimeWrap}>
          <h3 className={classes.startTimeDigit}>{ this.state.displayTime }</h3>
        </div>
      </div>
    );
  }
}

export default injectSheet(JssStartTimer)(StartTimer);
