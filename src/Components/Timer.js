import React, { Component } from 'react';

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
      this.setState({seconds: this.props.seconds})
    }
  }
  render() {
    return (
      <div>
        {this.state.time.mins}:{this.state.time.secs}
      </div>
    );
  }
}

export default Timer;
