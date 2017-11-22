import React, { Component } from 'react';
import injectSheet from 'react-jss';

const jssStyles = {
  time: {
    color: '#4e4e4e',
    fontSize: '30px',
    margin: '10px auto 0'
  },
  timeHeading: {
    color: '#7f8fa4',
    margin: '0 auto'
  }
};

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = { time: {}, seconds: this.props.seconds };
    this.startTimer();
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  convertTime(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return {
      'mins': minutes,
      'secs': seconds
    }
  }
  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }
  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.convertTime(seconds),
      seconds: seconds,
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h5 className={classes.timeHeading}>Time remaining</h5>
        <h4 className={classes.time}>{this.state.time.mins}:{this.state.time.secs}</h4>
      </div>
    );
  }
}

export default injectSheet(jssStyles)(Timer);
