import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const jssStyles = {
  container: {
    backgroundColor: '#f0f0f0',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '12px',
    letterSpacing: '0.5px',
    lineHeight: 1,
    width: '500px',
  },
  ul: {
    listStyle: 'none',
    backgroundColor: '#ffffff',
    paddingLeft: 0,
    '& li': {
      padding: '5px 0 5px 10px',
    },
  },
};

const PlayerBox = ({
  classes,
  player,
  username,
  words,
}) => {
  const wordList = words.map(word =>
    <li>{word}</li>,
  );

  return (
    <div className={classes.container}>
      <h4>Player {player}: {username}</h4>
      <ul className={classes.ul}>
        {wordList}
      </ul>
    </div>
  );
};

PlayerBox.propTypes = {
  player: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape().isRequired,
};


export default injectSheet(jssStyles)(PlayerBox);
