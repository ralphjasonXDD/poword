import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import UserAnswer from './UserAnswer';
import RandomLetter from './RandomLetter';
import Timer from './Timer';
import StartTimer from './StartTimer';
import GameResult from './GameResult';
import ReadyButton from './ReadyButton';
import MuteButton from './MuteButton';
import { JssPlay } from '../Resources/jss_styles';
import LetterScores from '../Resources/keycodes.json';
import Modal from 'react-modal';

const modalResult = {
  content: {
    backgroundColor: '#f8f3d6',
    borderColor: '#c8b89e',
    boxShadow: 'inset 0 -7px 0 0 #c0b5a3',
    height: '450px',
    margin: '0 auto',
    width: '550px',
  }
};

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
        key: params.playerKey,
      },
      opponent: {
        id: null,
        username: 'chi',
        words: [],
        isReady: false,
      },
      random_letters: params.randomLetters,
      gameId: params.gameId,
      current_answer: '',
      isPlay: false,
      opponentAvailable: false,
      isMute: false,
      gameDone: false,
      inputStart: false,
      gameTime: 120,
      timerStart: false,
    };

    //this.handlePlay = this.handlePlay.bind(this);
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
    const playerRef = fire.database().ref('player').orderByChild('gameId').equalTo(this.state.gameId);
    playerRef.on('child_added', (snapshot) => {
      const { id, username, isReady } = snapshot.val();
      if (id === this.state.player.id) return;
      this.setState({
        opponent: {
          ...this.state.opponent,
          id,
          username,
          isReady,
        },
        opponentAvailable: true,
      });
      this.getWords(id, 'opponent');
      this.getOpponentReady(snapshot.key);
    });
  }

  getOpponentReady(id) {
    const opponentRef = fire.database().ref('player/' + id).on("child_changed", (snapshot) => {
      this.setState({
        opponent: { ...this.state.opponent, isReady: snapshot.val() },
      });
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

  playerReady = () => {
    const playerRef = fire.database().ref('player').orderByChild('id').equalTo(this.state.player.id);
    playerRef.on('child_added', function(snapshot) {
      snapshot.ref.update({ isReady: true })
    });

    this.setState({
      player: {
        ...this.state.player,
        isReady: true,
      },
    });
  }

  handlePlay = () => {
    this.setState(prevState => ({
      player: {
        ...prevState.player,
      },
      isPlay: true,
    }));
    //temporary
    this.setState({
      inputStart: true,
    });
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

  setStartTimer = () => {
    this.setState({ timerStart: true });
  }

  setGameDone = (val) => {
    this.setState({
      gameDone: val,
      inputStart: !(val),
    });
  }

  gameData = () => {
    let data = {
      player: {
        name: this.state.player.username,
        words: this.appendWordScore(this.state.player.words),
      },
      opponent: {
        name: this.state.opponent.username,
        words: this.appendWordScore(this.state.opponent.words),
      },
    };
    data.player['score'] = this.totalScore(data.player['words']);
    data.opponent['score'] = this.totalScore(data.opponent['words']);
    return data;
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>
          gameId: {this.state.gameId}
        </div>
        <StartTimer
          opponentReady = {this.state.opponent.isReady}
          playerReady = {this.state.player.isReady}
          playSound={this.playSound}
          handler={this.handlePlay}
        />

        <div className={classes.playHeader}>
          <div className={classes.playHeaderCol}>
          <MuteButton toggleMute={this.toggleMute} />
          </div>
          <div className={classes.playHeaderCol}>
          <Timer
            seconds={this.state.gameTime}
            start={this.state.isPlay}
            setGameDone={this.setGameDone}
          />
          </div>
          <div className={classes.playHeaderCol}>
          <ReadyButton
            playerReady={this.playerReady}
            opponentAvailable={this.state.opponentAvailable}
            opponent={this.state.opponent}
            player={this.state.player}
          />
          </div>
        </div>
        <div className={classes.container}>
          <UserAnswer
            sendWord={this.sendWord}
            setAnswer={this.setAnswer}
            answer={this.state.current_answer}
            letters={this.state.random_letters}
            playSound={this.playSound}
            inputStart={this.state.inputStart}
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
              this.state.opponentAvailable &&
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
          <Modal isOpen={this.state.gameDone} style={modalResult}>
            <GameResult
              gameData={this.gameData()}
            />
            <div className={classes.goBackWrap}>
              <Link to="/" className={classes.goBack}>
                  Go Back
              </Link>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

Play.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssPlay)(Play);
