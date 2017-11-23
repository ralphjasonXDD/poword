import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import UserAnswer from './UserAnswer';
import RandomLetter from './RandomLetter';
import Timer from './Timer';
import JssStyle from '../Resources/jss_styles.js';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        id: 5,
        username: 'kizuchie',
        words: [],
      },
      opponent: {
        id: 2,
        username: 'chi',
        words: [],
      },
      random_letters: this.setRandomLetters(),
      current_answer: '',
    };
  }

  setRandomLetters() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 16; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text.toString();
  }

  setLetterStyle(answer) {
    var ans = answer.split("");
    return this.state.random_letters.split("").map ((letter, i) => {
      if (ans.indexOf(letter) === -1)
        return [letter, ['#4e4e4e', '#e4e6eb']];

      ans.splice(ans.indexOf(letter), 1);
      return [letter, ['#fff', '#398bf7']];
    });
  }

  chunkRandomLetters() {
    var letter_styles = this.setLetterStyle(this.state.current_answer);
    var j, chunk = 4, arr = [];
    for (var i = 0, j = letter_styles.length; i < j; i += chunk) {
      arr.push(letter_styles.slice(i, i + chunk));
    }
    return arr;
  }

  componentWillMount() {
    this.getWords(this.state.player.id, 'player');
    this.getWords(this.state.opponent.id, 'opponent');
  }

  getWords(id, thePlayer) {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByChild('id').equalTo(id);
    wordsRef.on('child_added', snapshot => {
      /* Update React state when word is added at Firebase Database */
      const word = { text: snapshot.val().text, id: snapshot.key };
      this.setState({
        [thePlayer]: {
          ...this.state[thePlayer],
          words: [word].concat(this.state[thePlayer].words),
        },
      });
    });
  }

  setAnswer = (ans) => {
    this.setLetterStyle(ans);
    this.setState({ current_answer: ans });
  }

  sendWord = (word) => {
    if (word == null) return false;

    fire.database().ref('words').push({
      id: this.state.player.id,
      text: word,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.playHeader}>
          <Timer seconds="120" />
        </div>
        <div className={classes.container}>
          <div className={classes.playWrap}>
            <div className={classes.sideBar}>
              <PlayerBox username={this.state.player.username} words={this.state.player.words} />
            </div>
            <div className={classes.wordWrap}>
              <RandomLetter randomLetters={this.chunkRandomLetters()} />
            </div>
            <div className={classes.sideBar}>
              <PlayerBox
                username={this.state.opponent.username}
                words={this.state.opponent.words}
                isOpponent
              />
            </div>
          </div>
          <div>
            <UserAnswer
              sendWord={this.sendWord}
              setAnswer={this.setAnswer}
              answer={this.state.current_answer}
              letters={this.state.random_letters}
            />
          </div>
        </div>
      </div>
    );
  }
}

Play.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssStyle.play)(Play);
