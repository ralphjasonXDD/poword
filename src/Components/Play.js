import React, { Component } from 'react';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import injectSheet from 'react-jss';

const jssStyles = {
  container: {
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  playWrap: {
    display: 'flex',
    marginLeft: '-15px',
    marginRight: '-15px'
  },
  sideBar: {
    flex: '0 0 25%',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  wordWrap: {
    flex: '0 0 50%',
    paddingLeft: '15px',
    paddingRight: '15px'
  }
}

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
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.playWrap}>
          <div className={classes.sideBar}>
            <PlayerBox player="1" username="kizuchie" words={this.state.words} />
          </div>
          <div className={classes.wordWrap}>
            box
          </div>
          <div className={classes.sideBar}>
            sidebar
          </div>
        </div>
        <div>
          <div className="form-group">
            <form className="" onSubmit={this.addWord.bind(this)}>
              <input type="text" ref={el => this.inputWord = el} placeholder="blah" />
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(jssStyles)(Play);
