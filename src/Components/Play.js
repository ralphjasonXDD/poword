import React, { Component } from 'react';
import fire from '.././fire';
import PlayerBox from './PlayerBox';

class Play extends Component {
  constructor() {
    super();
    this.state = {
      words: [],
    };
  }

  componentWillMount() {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByKey().limitToLast(100);
    wordsRef.on('child_added', snapshot => {
      /* Update React state when word is added at Firebase Database */
      const word = { text: snapshot.val(), id: snapshot.key };
      this.setState({ words: [word].concat(this.state.words) });
    });
  }

  addWord(e) {
    e.preventDefault();
    /* Send the word to Firebase */
    fire.database().ref('words').push(this.inputWord.value);
    this.inputWord.value = '';
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <form className="" onSubmit={this.addWord.bind(this)}>
            <input type="text" ref={el => this.inputWord = el} placeholder="blah" />
            <input type="submit" />
          </form>
        </div>
        <PlayerBox player="1" username="kizuchie" words={this.state.words} />
      </div>
    );
  }
}

export default Play;
