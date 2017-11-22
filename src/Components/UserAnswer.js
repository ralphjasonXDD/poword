import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import KeyCodes from '../Resources/keycodes.json';

const jssStyles = {
  answerHolder: {
    alignItems: 'center',
    backgroundColor: '#e0e5e9',
    border: '1px solid #d8dcdf',
    borderRadius: '4px',
    color: '#9d9e9f',
    cursor: 'text',
    display: 'flex',
    fontFamily: 'Boogaloo',
    fontSize: '40px',
    fontWeight: 'bold',
    height: '40px',
    justifyContent: 'center',
    letterSpacing: '10px',
    margin: '30px auto',
    maxWidth: '46%',
    padding: '15px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

class UserAnswer extends Component {
  constructor(props) {
    super(props);
    this.keyEventHandler();
  }

  keyEventHandler() {
    const keyHandle = (e) => {
      this.handleKeys(e.keyCode);
    };

    document.addEventListener('keydown', keyHandle.bind(this));
  }

  handleKeys(keyCode) {
    let ans = this.props.answer;

    if (this.isLetterCode(keyCode) && this.isValidLetter(KeyCodes.letter_codes[keyCode])) {
      ans += KeyCodes.letter_codes[keyCode];
    } else if (KeyCodes.action_codes[keyCode] === 'enter') {
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.answerHolder}>
          { this.props.answer }
        </div>
      </div>
    );
  }
}

UserAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  setAnswer: PropTypes.string.isRequired,
  sendWord: PropTypes.string.isRequired,
};

export default injectSheet(jssStyles)(UserAnswer);
