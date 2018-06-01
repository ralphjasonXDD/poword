import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import KeyCodes from '../Resources/keycodes.json';
import { JssUserAnswer } from '../Resources/jss_styles';
import Dictionary from '../Resources/dictionary.json';

import beep from '../Resources/audio/beep.mp3';
import buzz from '../Resources/audio/buzz.mp3';

const SOUNDS = {
  beep: new Audio(beep),
  buzz: new Audio(buzz),
};

class UserAnswer extends Component {
  constructor(props) {
    super(props);
    this.keyEventHandler();
    this.state = {
      answerStyle: {
        backgroundColor: '',
        boxShadow: '',
        color: '#fff',
      },
    };
  }

  keyEventHandler() {
    const keyHandle = (e) => {
      this.handleKeys(e.keyCode);
    };

    document.addEventListener('keydown', keyHandle.bind(this));
  }

  handleKeys(keyCode) {
    if (!this.props.inputStart)
      return false;

    let ans = this.props.answer;

    this.setState({ answerStyle: { color: '#fff' } });
    if (this.isLetterCode(keyCode) && this.isValidLetter(KeyCodes.letter_codes[keyCode])) {
      ans += KeyCodes.letter_codes[keyCode];
    } else if (KeyCodes.action_codes[keyCode] === 'enter') {
      if (!this.isValidWord(ans)) {
        this.props.playSound(SOUNDS.buzz);
      } else {
        this.props.sendWord(ans);
        this.props.playSound(SOUNDS.beep);
        ans = '';
      }
    } else if (KeyCodes.action_codes[keyCode] === 'delete') {
      ans = ans.substr(0, ans.length - 1);
    }

    this.props.setAnswer(ans);
  }

  isValidLetter(letter) {
    const prop = this.props;
    return this.filterOccurence(prop.answer, letter) < this.filterOccurence(prop.letters, letter);
  }

  filterOccurence(word, letter) {
    return word.split('').filter(v => v === letter).length;
  }

  isLetterCode(code) {
    return Object.keys(KeyCodes.letter_codes).indexOf(code.toString()) >= 0;
  }

  isValidWord(word) {
    if (Dictionary.words.includes(word)) return true;
    return this.setState({ answerStyle: { backgroundColor: '#bd081c', boxShadow: 'inset 0 -3px 0 #a60517' } });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.answerHolder}>
        <div className={classes.answerBox} style={this.state.answerStyle}>
          { this.props.answer }
        </div>
      </div>
    );
  }
}

UserAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
  sendWord: PropTypes.func.isRequired,
  playSound: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssUserAnswer)(UserAnswer);
