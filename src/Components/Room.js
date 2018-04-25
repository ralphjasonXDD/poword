import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import UUID from 'uuid';
import fire from '.././fire';
import { JssRoom } from '../Resources/jss_styles';
import Play from './Play';



class Room extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      randomLetters: this.setRandomLetters(),
      status: 'available',
      challengeStatus: null,
      gameId: null,
      playerId: null,
      playerName: "",
    };
  }

  componentWillMount() {
    this.getRooms();
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

  getRooms() {
    const gamesRef = fire.database().ref('games');
    gamesRef.on('value', snapshot => {
      const list = Object.keys(snapshot.val() || {});
      this.setState({list});
    });
  }

  createRoom = () => {
    const uid = UUID.v1();
    const gameId = `game_id_${uid}`;
    const randomLetters = this.setRandomLetters();
    const playerId = uid;
    const playerName = `testchi-${UUID.v1().substring(0, 7)}`;

    this.setState({
      challengeStatus: true,
      randomLetters,
      gameId,
      playerId,
      playerName,
    });
    fire.database().ref('games').child(gameId).set({
      [`${uid}_points`]: 0,
      status: this.state.status,
      [`${uid}`]: playerName,
      randomLetters,
    });
  }

  cancelRoom = () => {
    this.setState({ challengeStatus: false });
    fire.database().ref(`games/${this.state.gameId}`).remove();
  }

  render() {
    if (this.state.challengeStatus === true) {
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

    const rooms = this.state.list.map((room, index) => (
      <li key={index}>
        {room}
      </li>
    ));

    // const event = this.state.challengeStatus
    //   ? <button onClick={this.cancelRoom}> - CANCEL CHALLENGE </button>
    //   : <button onClick={this.createRoom}> + CHALLENGE </button>;

    return (
      <div style={JssRoom.container}>
        <div style={JssRoom.challenger}>
          <button onClick={this.createRoom}> + CHALLENGE </button>
        </div>
        <ul>{rooms}</ul>
      </div>
    );
  }
}

export default Room;
