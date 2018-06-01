import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssStartTimer } from '../Resources/jss_styles.js';

class StartTimer extends Component {
  constructor(props) {
    super();
    this.state = {  startTime: 3 };
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
    let sec = this.state.startTime - 1;
    this.setState({ startTime: sec });

    if (this.state.startTime === 0) {
      clearInterval(this.timer);
      this.setState({ startTime: "START" });
      this.props.handler();
    }
  }

  render() {
    return (
      <div>
        Start Time: { this.state.startTime }
      </div>
    );
  }
}

export default injectSheet(JssStartTimer)(StartTimer);
