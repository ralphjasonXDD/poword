import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { JssPlayerBox } from '../Resources/jss_styles.js';

const PlayerBox = (props) => {

  const wordList = props.words.map((word, index) => (
    <li key={index}>
      {word}
      <span> {props.getWordScore(word)} </span>
    </li>
  ));

  return (
    <div>
      <div className={props.classes.container}>
        <h4>{props.username}</h4>
        <ul>{wordList}</ul>
      </div>
    </div>
  );
};

PlayerBox.propTypes = {
  username: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  getWordScore: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssPlayerBox)(PlayerBox);
