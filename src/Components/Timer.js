import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssTimer } from '../Resources/jss_styles.js';

class Timer extends Component {
  constructor (props) {
    super(props);
    this.state = { time: {}, seconds: this.props.seconds };
    this.timer = 0;
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
  componentDidMount() {
    let timeLeftVar = this.convertTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  componentDidUpdate() {
    if(this.props.start === true) {
      this.startTimer();
    }
  }
  startTimer = () => {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }
  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.convertTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      alert("Times up!");
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.timeWrap}>
        <span className={classes.timeLabel}>timer</span>
        <h4 className={classes.time}>
          {this.state.time.mins}:{this.state.time.secs}
        </h4>
      </div>
    );
  }
}

export default injectSheet(JssTimer)(Timer);
