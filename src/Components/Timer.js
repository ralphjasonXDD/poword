import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { JssTimer } from '../Resources/jss_styles.js';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: {},
      seconds: this.props.seconds,
      start: this.props.start,
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.seconds !== 0 && this.state.seconds < props.seconds) {
      return;
    }

    this.setState({
      seconds: props.seconds,
      start: props.start,
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.state.seconds !== nextProps.seconds;
  }

  componentDidUpdate() {
    if (this.state.start) {
      this.startTimer();
    }
  }

  convertTime = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = (duration % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return {
      mins: minutes,
      secs: seconds,
    };
  }

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    const seconds = this.state.seconds - 1;
    this.setState({
      time: this.convertTime(seconds),
      seconds,
    });

    if (seconds < 0) {
      clearInterval(this.timer);
      this.props.setGameDone(true);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.timeWrap}>
        <span className={classes.timeLabel}>timer</span>
        <h4 className={classes.time}>
          {this.state.time.mins || '00'}:{this.state.time.secs || '00'}
        </h4>
      </div>
    );
  }
}

export default injectSheet(JssTimer)(Timer);
