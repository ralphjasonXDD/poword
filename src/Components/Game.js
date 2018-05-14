import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import UUID from 'uuid';
import fire from '.././fire';
import { JssRoom } from '../Resources/jss_styles';
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
    const gamesRef = fire.database().ref('game');
    gamesRef.on('child_added', (snapshot) => {
      const { opponentAvailable } = snapshot.val();
      if (opponentAvailable) return;
      const gameId = snapshot.key;
      this.setState(prevState => ({
        list: prevState.list.concat(gameId),
      }));
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
    });
  }

  addPlayer = (gameId) => {
    const playerId = UUID.v1();
    const playerName = `testchi-${playerId.substring(0, 7)}`;

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

    return (
      <div style={JssRoom.container}>
        <div style={JssRoom.challenger}>
          <button onClick={this.createRoom}> + CHALLENGE </button>
        </div>
        <ul>
          <Rooms rooms={this.state.list} handleClick={this.addPlayer} />
        </ul>
      </div>
    );
  }
}

export default Game;
