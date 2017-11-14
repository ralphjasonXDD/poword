import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fire from '.././fire';
import PlayerBox from './PlayerBox';
import injectSheet from 'react-jss';

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
  },
  sideBar: {
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '210px',
  },
  wordWrap: {
    backgroundColor: '#20293f',
    padding: '20px',
    width: '500px',
  },
  wordRow: {
    display: 'flex',
    fontSize: '72px',
    fontWeight: 'bold',
    marginBottom: '20px',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    '& div': {
      alignItems: 'center',
      backgroundColor: '#e8f0f3',
      cursor: 'default',
      display: 'flex',
      height: '106px',
      justifyContent: 'center',
      width: '106px',
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
      },
      words: [],
    };
  }

  componentWillMount() {
    /* Create reference to words in Firebase Database */
    const wordsRef = fire.database().ref('words').orderByChild('id').equalTo(this.state.player.id);
    wordsRef.on('child_added', snapshot => {
      /* Update React state when word is added at Firebase Database */
      const word = { text: snapshot.val().text, id: snapshot.key };
      this.setState({ words: [word].concat(this.state.words) });
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
            <PlayerBox player="1" username="kizuchie" words={this.state.words} />
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

Play.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(jssStyles)(Play);
