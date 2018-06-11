import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import UserAnswer from './UserAnswer';
import RandomLetter from './RandomLetter';
import Timer from './Timer';
import StartTimer from './StartTimer';
import GameResult from './GameResult';
import PageNotFound from './PageNotFound';
import HomeButton from './HomeButton';
import ReadyButton from './ReadyButton';
import MuteButton from './MuteButton';
import { JssPlay } from '../Resources/jss_styles';
import LetterScores from '../Resources/keycodes.json';
import Modal from 'react-modal';
import UUID from 'uuid';

const modalResult = {
  content: {
    backgroundColor: '#f8f3d6',
    borderColor: '#c8b89e',
    boxShadow: 'inset 0 -7px 0 0 #c0b5a3',
    height: '450px',
    margin: '0 auto',
    width: '550px',
  },
};

// game time is 30.seconds
const GAME_TIME_RANGE = (1000 * 30);

// supported number of players
const NUM_PLAYER = 2;

class Play extends Component {
  constructor(props) {
    super();

    const params = props.location.state;
    const gameId = props.match.params.id;

    this.state = {
      player: {
        id: params ? params.playerId : null,
        username: params ? params.playerName : "",
        words: [],
        isReady: false,
        key: params ? params.playerKey : null,
      },
      opponent: {
        id: null,
        username: 'chi',
        words: [],
        isReady: false,
      },
      random_letters: (params ? params.randomLetters : '....................'),
      gameId,
      current_answer: '',
      isPlay: false,
      opponentAvailable: false,
      isMute: false,
      gameDone: false,
      inputStart: false,
      gameTime: 0,
      gameNotFound: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({isLoading: false}), 3000)
  }

  generateRandomLetters(gameId) {
    const gameRef = fire.database().ref(`game/${gameId}`);
    gameRef.once('value', (snapshot) => {
      this.setState({
        random_letters: snapshot.val().randomLetters
      });
      this.getOpponents();
      this.getWords(this.state.player.id, 'player');
    });

    gameRef.update({ opponentAvailable: true });
  }

  generateOtherPlayer(gameId) {
    const playerId = UUID.v1();
    const playerName = `player-${playerId.substring(0, 7)}`;

    fire.database().ref('player').push({
      id: playerId,
      username: playerName,
      gameId,
      isReady: false,
    }).then((snap) => {
      this.setState({
        player: {
          ...this.state.player,
          id: playerId,
          username: playerName,
          key: snap.key,
        }
      });
      this.generateRandomLetters(gameId);
    });
  }

  componentWillMount() {
    const gameId = this.props.match.params.id;

    if (typeof this.props.location.state === 'undefined') {
      const gameRef = fire.database().ref('game').child(gameId);
      gameRef.once('value', (snapshot) => {
        if (snapshot.val() && !snapshot.val().opponentAvailable) {
          this.generateOtherPlayer(gameId);
        } else {
          this.setState({ gameNotFound: true });
        }
      });
    }

    if (this.state.player.id !== null) {
      this.getWords(this.state.player.id, 'player');
      this.getOpponents();
      this.checkInGame();
    }
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

  checkInGame = () => {
    const playerRef = fire.database().ref('player').orderByChild('gameId').equalTo(this.state.gameId);

    let inGameCount = 0;

    playerRef.on('child_added', (snapshot) => {
      const { isReady } = snapshot.val();
      let { startTime } = snapshot.val();

      if (isReady) {
        inGameCount += 1;
      }

      const inGame = (startTime + GAME_TIME_RANGE) > (new Date()).getTime();

      if (inGame) {
        startTime = this.getCalculateGameTime(startTime);
      } else {
        startTime = 0;
      }

      if (!this.state.isPlay && inGameCount === NUM_PLAYER) {
        this.setState({
          gameTime: startTime,
          isPlay: true,
          inputStart: true,
        });
      }
    });
  }

  getCalculateGameTime = (gameTime) => {
    const currentTime = (new Date()).getTime();
    const endTime = (gameTime + GAME_TIME_RANGE);

    return Math.floor(((endTime - currentTime) / 1000));
  }

  handlePlay = () => {
    const playerRef = fire.database().ref('player').orderByChild('id').equalTo(this.state.player.id);
    const gameTime = (new Date()).getTime();

    this.setState({
      gameTime: this.getCalculateGameTime(gameTime),
      isPlay: true,
      inputStart: true,
    });

    playerRef.on('child_added', (snapshot) => {
      snapshot.ref.update({ startTime: gameTime });
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
    playerRef.on('child_added', (snapshot) => {
      snapshot.ref.update({ isReady: true });
    });

    this.setState({
      player: {
        ...this.state.player,
        isReady: true,
      },
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
    if (this.state.isLoading) {
      return (
        <div className="loader"></div>
      );
    }

    let readyButton = null;

    if (!this.state.isPlay) {
      readyButton = (
        <ReadyButton
          playerReady={this.playerReady}
          opponentAvailable={this.state.opponentAvailable}
          opponent={this.state.opponent}
          player={this.state.player}
        />
      );
    }

    return (
      <div>
        { this.state.gameNotFound ? <PageNotFound /> :
          <div>
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
                { readyButton }
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
                <HomeButton />
              </Modal>
            </div>
          </div>
        }
      </div>
    );
  }
}

Play.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssPlay)(Play);
