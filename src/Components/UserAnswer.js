import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import KeyCodes from '../Resources/keycodes.json';
import { JssUserAnswer } from '../Resources/jss_styles.js';
import Dictionary from '../Resources/dictionary.json';

class UserAnswer extends Component {

  constructor(props) {
    super(props);
    this.keyEventHandler();
    this.state ={
      answerStyle: {
        color: '#545454',
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
    let ans = this.props.answer;

    this.setState({ answerStyle: { color: '#545454' } });
    if (this.isLetterCode(keyCode) && this.isValidLetter(KeyCodes.letter_codes[keyCode])) {
      ans += KeyCodes.letter_codes[keyCode];
    } else if (KeyCodes.action_codes[keyCode] === 'enter' && this.isValidWord(ans)) {
      this.props.sendWord(ans);
      ans = '';
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
    if (Dictionary.words.includes(word)) {
      return true;
    } else {
      this.setState({ answerStyle: { color: 'rgba(255,0,0,0.6)' } });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={ classes.answerHolder } style={ this.state.answerStyle }>
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
  classes: PropTypes.object.isRequired,
};

export default injectSheet(JssUserAnswer)(UserAnswer);
