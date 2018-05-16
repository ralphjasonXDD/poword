import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import UserAnswer from './UserAnswer';
import RandomLetter from './RandomLetter';
import Timer from './Timer';
import ReadyButton from './ReadyButton';
import MuteButton from './MuteButton';
import { JssPlay } from '../Resources/jss_styles';
import LetterScores from '../Resources/keycodes.json';

class Play extends Component {
  constructor(props) {
    super();
    const params = props.location.state;
    this.state = {
      player: {
        id: params.playerId,
        username: params.playerName,
        words: [],
        isReady: false,
      },
      opponent: {
        id: null,
        username: 'chi',
        words: [],
      },
      random_letters: params.randomLetters,
      gameId: params.gameId,
      current_answer: '',
      isPlay: false,
      numPlayers: 1,
      isMute: false,
    };

    this.handlePlay = this.handlePlay.bind(this);
  }

  componentWillMount() {
    this.getWords(this.state.player.id, 'player');
    this.getOpponents();
  }

  setLetterStyle(answer) {
    const ans = answer.split('');
    return this.state.random_letters.split('').map((letter) => {
      if (ans.indexOf(letter) === -1) {
        return [letter, ['#717675', '#f6f8f7', 'inset 0 -5px 0 #abb7b7']];
      }

      ans.splice(ans.indexOf(letter), 1);
      return [letter, ['#fff', '#f2b34c', 'inset 0 -5px 0 #ba7e1b']];
    });
  }

  getOpponents() {
    const gameRef = fire.database().ref(`games/${this.state.gameId}`);
    gameRef.on('value', (snapshot) => {
      const { players, numPlayers } = snapshot.val();
      const opponentID = Object.keys(players).find(e => e !== this.state.player.id);
      if (!opponentID) return;
      const userName = players[opponentID].username;
      this.setState({
        opponent: {
          ...this.state.opponent,
          id: opponentID,
          username: userName,
        },
        numPlayers,
      });

      this.getWords(opponentID, 'opponent');
    });
  }

  getWords(id, thePlayer) {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByChild('player_id').equalTo(id);
    wordsRef.on('child_added', (snapshot) => {
      const { text } = snapshot.val();
      /* Update React state when word is added at Firebase Database */
      this.setState(prevState => ({
        [thePlayer]: {
          ...prevState[thePlayer],
          words: prevState[thePlayer].words.concat(text),
        },
      }));
    });
  }

  setAnswer = (ans) => {
    this.setLetterStyle(ans);
    this.setState({ current_answer: ans });
  }

  getWordScore = (word) => {
    let score = 0;
    word.split('').forEach((letter) => {
      score += LetterScores.words_score[letter];
    });
    return score;
  }

  handlePlay() {
    this.setState(prevState => ({
      player: {
        ...prevState.player,
        isReady: true,
      },
      isPlay: true,
    }));
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

  appendWordScore(words) {
    const wordScore = [];
    words.forEach((word) => {
      wordScore.push([this.getWordScore(word), word]);
    });
    return wordScore;
  }

  playSound = (sound) => {
    if (!sound || this.state.isMute) return;

    const audio = sound;
    audio.currentTime = 0;
    audio.play();
  };

  sendWord = (word) => {
    if (word == null || this.state.player.words.includes(word)) {
      return;
    }

    fire.database().ref('words').push({
      player_id: this.state.player.id,
      text: word,
    });
  }

  totalScore = (words) => {
    let score = 0;

    if (words.length === 0) return score;
    words.forEach((l) => {
      score += l[0];
    });
    return score;
  }

  toggleMute = () => {
    this.setState({ isMute: !this.state.isMute });
  }


  render() {
    const { isReady } = this.state.player;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.playHeader}>
          <div className={classes.playHeaderCol}>
          <MuteButton toggleMute={this.toggleMute} />
          </div>
          <div className={classes.playHeaderCol}>
          <Timer seconds="5" start={this.state.isPlay} />
          </div>
          <div className={classes.playHeaderCol}>
          <ReadyButton handler={this.handlePlay} />
          </div>
        </div>
        <div className={classes.container}>
          <UserAnswer
            sendWord={this.sendWord}
            setAnswer={this.setAnswer}
            answer={this.state.current_answer}
            letters={this.state.random_letters}
            playSound={this.playSound}
          />
          <div className={classes.playWrap}>
            <div className={classes.sideBar}>
              <PlayerBox
                username={this.state.player.username}
                words={this.appendWordScore(this.state.player.words)}
                totalScore={this.totalScore}
              />
            </div>
            <div className={classes.wordWrap}>
              <RandomLetter randomLetters={this.chunkRandomLetters()} />
            </div>
            {
              this.state.numPlayers > 1 &&
                <div className={classes.sideBar}>
                  <PlayerBox
                    username={this.state.opponent.username}
                    words={this.appendWordScore(this.state.opponent.words)}
                    totalScore={this.totalScore}
                    isOpponent
                  />
                </div>
            }
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
