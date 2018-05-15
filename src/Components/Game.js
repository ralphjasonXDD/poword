import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import UUID from 'uuid';
import fire from '.././fire';
import { Scrollbars } from 'react-custom-scrollbars';
import injectSheet from 'react-jss';
import { JssGame } from '../Resources/jss_styles';
import Play from './Play';
import Rooms from './Rooms';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      randomLetters: '',
      status: 'available',
      challengeStatus: null,
      gameId: null,
      playerId: null,
      playerName: '',
    };
  }

  componentWillMount() {
    this.getRooms();
  }

  setRandomLetters = () => {
    let text = '';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';

    /* Generate random vowel letters: min 4, max 8 */
    const vowelCount = Math.floor(Math.random() * 3) + 4;
    for (let i = 0; i < vowelCount; i += 1) {
      text += vowels.charAt(Math.floor(Math.random() * vowels.length));
    }

    /* Generate random consonant letters */
    for (let j = 0; j < 16 - vowelCount; j += 1) {
      text += consonants.charAt(Math.floor(Math.random() * consonants.length));
    }

    const letters = text.split('').sort(() => Math.random() - 0.5);

    return letters.join('');
  }

  getRooms() {
    const gamesRef = fire.database().ref('games');
    gamesRef.on('value', (snapshot) => {
      const list = Object.keys(snapshot.val() || {});
      this.setState({ list });
    });
  }

  createRoom = () => {
    const uid = UUID.v1();
    const gameId = `game_id_${uid}`;
    const randomLetters = this.setRandomLetters();
    const playerName = `testchi-${uid.substring(0, 7)}`;

    this.setState({
      challengeStatus: true,
      playerId: uid,
      randomLetters,
      gameId,
      playerName,
    });
    fire.database().ref('games').child(gameId).set({
      status: this.state.status,
      randomLetters,
      numPlayers: 1,
      players: {
        [`${uid}`]: {
          username: playerName,
          points: 0,
        },
      },
    });
  }

  savePlayer = (gameId) => {
    const playerId = UUID.v1();
    const playerName = `testchi-${playerId.substring(0, 7)}`;
    fire.database().ref(`games/${gameId}/players`).update({
      [`${playerId}`]: {
        username: playerName,
        points: 0,
      },
    });
    const gameRef = fire.database().ref(`games/${gameId}`);
    let numPlayers = null;
    gameRef.on('value', (snapshot) => {
      const { randomLetters } = snapshot.val();
      numPlayers = snapshot.val().numPlayers + 1;
      this.setState({
        challengeStatus: true,
        randomLetters,
        gameId,
        playerId,
        playerName,
      });
    });
    gameRef.update({ numPlayers });
  }

  cancelRoom = () => {
    this.setState({ challengeStatus: false });
    fire.database().ref(`games/${this.state.gameId}`).remove();
  }

  render() {
    const { classes } = this.props;
    if (this.state.challengeStatus) {
      return (
        <div>
          <Switch>
            <Route path="/play" component={Play} />
          </Switch>
          <Redirect to={{
            pathname: '/play',
            state: {
              gameId: this.state.gameId,
              randomLetters: this.state.randomLetters,
              playerId: this.state.playerId,
              playerName: this.state.playerName,
            },
          }}
          />;
        </div>
      );
    }

    // const event = this.state.challengeStatus
    //   ? <button onClick={this.cancelRoom}> - CANCEL CHALLENGE </button>
    //   : <button onClick={this.createRoom}> + CHALLENGE </button>;

    return (
      <div className={classes.container}>
        <div className={classes.createRoomWrap}>
          <button className={classes.createRoomButton} onClick={this.createRoom}>Create Room</button>
        </div>
        <div className={classes.listWrap}>
          <h3 className={classes.listTitle}>Lobby List</h3>
          <Scrollbars style={{ height: 216 }}>
            <ul className={classes.list}>
              <Rooms rooms={this.state.list} handleClick={this.savePlayer} />
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default injectSheet(JssGame)(Game);
