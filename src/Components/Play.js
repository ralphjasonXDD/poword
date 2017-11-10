import React, { Component } from 'react';

import PlayerBox from './PlayerBox';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        words: [],
      },
    };
  }

  addWord() {

  }

  render() {
    return (
      <div>
        Taddaaaaa!!!!!
        <PlayerBox player="1" username="kizuchie" words={['one', 'dont', 'pick', 'up', 'the', 'phone']} />
        <PlayerBox player="2" username="chi" words={['two', 'dont', 'let', 'him', 'in']} />
      </div>
    );
  }
}

export default Play;
