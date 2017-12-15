import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import UserAnswer from './UserAnswer';
import RandomLetter from './RandomLetter';
import Timer from './Timer';
import { JssPlay } from '../Resources/jss_styles.js';
import LetterScores from '../Resources/keycodes.json';

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


  componentWillMount() {
    this.getWords(this.state.player.id, 'player');
    this.getWords(this.state.opponent.id, 'opponent');
  }

  setRandomLetters() {
    let text = '';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';

    /* Generate random vowel letters: min 4, max 8 */
    const vowelCount = Math.floor(Math.random() * 3) + 4;
    for (let i = 0; i < vowelCount; i++) {
      text += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }

    /* Generate random consonant letters */
    for (let j = 0; j < 16 - vowelCount; j++) {
      text += consonants.charAt(Math.floor(Math.random() * consonants.length));
    }

    const letters = text.split('').sort(() => Math.random() - 0.5);

    return letters.join('');
  }

  setLetterStyle(answer) {
    const ans = answer.split('');
    return this.state.random_letters.split('').map ((letter, i) => {
      if (ans.indexOf(letter) === -1) {
        return [letter, ['#949ba2', 'rgba(255,255,255,0.08)']];
      }

      ans.splice(ans.indexOf(letter), 1);
      return [letter, ['#554000', '#edc53f']];
    });
  }

  getWords(id, thePlayer) {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByChild('game_info_id').equalTo(id);
    wordsRef.on('value', snapshot => {
      const wordList = Object.values(snapshot.val() || {}).map(words => words.text);
      /* Update React state when word is added at Firebase Database */
      this.setState({
        [thePlayer]: {
          ...this.state[thePlayer],
          words: wordList.reverse(),
        },
      });
    });
  }

  setAnswer = (ans) => {
    this.setLetterStyle(ans);
    this.setState({ current_answer: ans });
  }

  chunkRandomLetters() {
    const setLetterStyle = this.setLetterStyle(this.state.current_answer);
    const chunk = 4;
    const arr = [];
    for (let i = 0, j = setLetterStyle.length; i < j; i += chunk) {
      arr.push(setLetterStyle.slice(i, i + chunk));
    }
    return arr;
  }

  wordScore(word) {
    return 1;
  }

  appendWordScore() {
    let words = ["a", "b", "c", "d"];
    let word_score = [];
    words.forEach(function(word) {
      word_score.push([this.wordScore(word),word]);
    }.bind(this));
    return word_score;
  }


  sendWord = (word) => {
    if (word == null || this.state.player.words.includes(word)) {
      return false;
    }

    fire.database().ref('words').push({
      game_info_id: this.state.player.id,
      text: word,
    });
  }

  getWordScore = (word) => {
    console.log(this.appendWordScore());
    let score = 0;
    word.split("").forEach(function(letter) {
      score += LetterScores.words_score[letter];
    });
    return score;
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
              <PlayerBox
                username={this.state.player.username}
                words={this.state.player.words}
                getWordScore={this.getWordScore}
              />
            </div>
            <div className={classes.wordWrap}>
              <RandomLetter randomLetters={this.chunkRandomLetters()} />
            </div>
            <div className={classes.sideBar}>
              <PlayerBox
                username={this.state.opponent.username}
                words={this.state.opponent.words}
                getWordScore={this.getWordScore}
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

export default injectSheet(JssPlay)(Play);
