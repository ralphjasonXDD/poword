import React, { Component } from 'react';
import KeyCodes from '../Resources/keycodes.json';

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
    return (
      <div>
        <h2> Mao ni iyang answer: { this.props.answer } </h2>
      </div>
    )
  }
}

export default UserAnswer;
