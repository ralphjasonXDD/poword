import React, { Component } from 'react';
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
    fontSize: '40px',
    fontWeight: 'bold',
    height: '40px',
    justifyContent: 'center',
    letterSpacing: '4px',
    margin: '30px auto',
    maxWidth: '46%',
    padding: '15px',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
};

class UserAnswer extends Component {

  constructor(props) {
    super(props);
    this.keyEventHandler();
  }

  keyEventHandler() {
    document.addEventListener("keydown", function (e) {
      this.handleKeys(e.keyCode);
    }.bind(this))
  }

  handleKeys(key_code) {
    var ans = this.props.answer;

    if (this.isLetterCode(key_code) && this.isValidLetter(KeyCodes.letter_codes[key_code]))
      ans = ans + KeyCodes.letter_codes[key_code];
    else if (KeyCodes.action_codes[key_code] === 'enter') {
      this.props.sendWord(ans);
      ans = "";
    } else if (KeyCodes.action_codes[key_code] === 'delete')
      ans = ans.substr(0, ans.length - 1);

    this.props.setAnswer(ans);
  }

  isValidLetter(letter) {
    return this.filterOccurence(this.props.answer, letter) < this.filterOccurence(this.props.letters, letter)
  }

  filterOccurence(word, letter) {
    return word.split("").filter(v => v === letter).length
  }

  isLetterCode(code) {
    return Object.keys(KeyCodes.letter_codes).indexOf(code.toString()) >= 0
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.answerHolder}>
          { this.props.answer }
        </div>
      </div>
    )
  }
}

export default injectSheet(jssStyles)(UserAnswer);
