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
    let roomList = [];
    const gamesRef = fire.database().ref('game');

    gamesRef.on('child_added', (snapshot) => {
      if (snapshot.val().opponentAvailable) return;
      roomList.push(snapshot.key);
      this.setState({ list: roomList });
    });
    gamesRef.on('child_removed', (snapshot) => {
      this.updateRoomList(snapshot);
    });
    gamesRef.on('child_changed', (snapshot) => {
      this.updateRoomList(snapshot);
    });
  }

  updateRoomList(snapshot) {
    let roomList = this.state.list;
    roomList = roomList.filter(r => r !== snapshot.key);

    this.setState({ list: roomList });
  }

  createRoom = () => {
    const uid = UUID.v1();
    const gameId = `game_id_${uid}`;
    const randomLetters = this.setRandomLetters();
    const playerName = `player-${uid.substring(0, 7)}`;

    this.setState({
      challengeStatus: true,
      playerId: uid,
      randomLetters,
      gameId,
      playerName,
    });

    fire.database().ref('game').child(gameId).set({
      opponentAvailable: false,
      status: this.state.status,
      randomLetters,
    });

    this.savePlayer(uid, playerName, gameId);
  }

  savePlayer = (id, username, gameId) => {
    fire.database().ref('player').push({
      id,
      username,
      gameId,
      isReady: false,
    });
  }

  addPlayer = (gameId) => {
    const playerId = UUID.v1();
    const playerName = `player-${playerId.substring(0, 7)}`;

    this.savePlayer(playerId, playerName, gameId);

    const gameRef = fire.database().ref(`game/${gameId}`);
    gameRef.once('value', (snapshot) => {
      const { randomLetters } = snapshot.val();
      this.setState({
        challengeStatus: true,
        randomLetters,
        gameId,
        playerId,
        playerName,
      });
    });

    gameRef.update({ opponentAvailable: true });
  }

  render() {
    const { classes } = this.props;
    const address = '/play/' + this.state.gameId;

    if (this.state.challengeStatus) {
      return (
        <div>
          <Switch>
            <Route path={address} component={Play} />
          </Switch>
          <Redirect to={{
            pathname: address,
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

    return (
      <div className={classes.container}>
        <div className={classes.createRoomWrap}>
          <button className={classes.createRoomButton} onClick={this.createRoom}>Create Room</button>
        </div>
        <div className={classes.listWrap}>
          <h3 className={classes.listTitle}>Lobby List</h3>
          <Scrollbars style={{ height: 216 }}>
            <ul className={classes.list}>
              <Rooms rooms={this.state.list} handleClick={this.addPlayer} />
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default injectSheet(JssGame)(Game);
