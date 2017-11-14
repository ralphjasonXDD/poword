import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import fire from '.././fire';
import PlayerBox from './PlayerBox';

const jssStyles = {
  container: {
    maxWidth: '960px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  playWrap: {
    display: 'flex',
    marginLeft: '-15px',
    marginRight: '-15px',
    marginTop: '45px'
  },
  sideBar: {
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '210px',
  },
  wordWrap: {
    backgroundColor: '#fff',
    border: '1px solid #e6eaee',
    borderRadius: '4px',
    marginTop: '30px',
    padding: '20px',
    width: '500px',
  },
  wordRow: {
    display: 'flex',
    fontSize: '72px',
    fontWeight: 'bold',
    marginBottom: '15px',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    '& div': {
      alignItems: 'center',
      backgroundColor: '#e4e6eb',
      color: '#4e4e4e',
      cursor: 'default',
      display: 'flex',
      height: '110px',
      justifyContent: 'center',
      width: '110px',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
};

class Play extends Component {
  constructor() {
    super();
    this.state = {
      player: {
        id: 5,
        username: 'kizuchie',
        words: [],
      },
      opponent: {
        id: 2,
        username: 'chi',
        words: [],
      },
    };
  }

  componentWillMount() {
    this.getWords(this.state.player.id, 'player');
    this.getWords(this.state.opponent.id, 'opponent');
  }

  getWords(id, thePlayer) {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByChild('id').equalTo(id);
    wordsRef.on('child_added', snapshot => {
      /* Update React state when word is added at Firebase Database */
      const word = { text: snapshot.val().text, id: snapshot.key };
      this.setState({
        [thePlayer]: {
          ...this.state[thePlayer],
          words: [word].concat(this.state[thePlayer].words),
        },
      });
    });
  }

  addWord(e) {
    e.preventDefault();
    /* Send the word to Firebase */
    fire.database().ref('words').push({
      id: this.state.player.id,
      text: this.inputWord.value,
    });
    this.inputWord.value = '';
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.playWrap}>
          <div className={classes.sideBar}>
            <PlayerBox username={this.state.player.username} words={this.state.player.words} />
          </div>
          <div className={classes.wordWrap}>
            <div>
              <div className={classes.wordRow}>
                <div>s</div>
                <div>a</div>
                <div>j</div>
                <div>o</div>
              </div>
              <div className={classes.wordRow}>
                <div>s</div>
                <div>a</div>
                <div>j</div>
                <div>o</div>
              </div>
              <div className={classes.wordRow}>
                <div>s</div>
                <div>a</div>
                <div>j</div>
                <div>o</div>
              </div>
              <div className={classes.wordRow}>
                <div>s</div>
                <div>a</div>
                <div>j</div>
                <div>o</div>
              </div>
            </div>
          </div>
          <div className={classes.sideBar}>
            <PlayerBox username={this.state.opponent.username} words={this.state.opponent.words} />
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

Play.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(jssStyles)(Play);
