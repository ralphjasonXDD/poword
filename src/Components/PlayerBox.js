import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import JssStyle from '../Resources/jss_styles.js';

const PlayerBox = ({
  classes,
  username,
  words,
}) => {
  const wordList = words.map(word => (
    <li key={word.id}>{word.text}</li>
  ));

  return (
    <div>
      <div className={classes.container}>
        <h4>{username}</h4>
        <ul>{wordList}</ul>
      </div>
    </div>
  );
};

PlayerBox.propTypes = {
  username: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssStyle.playerBox)(PlayerBox);
