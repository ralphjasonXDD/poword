import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Letter from './Letter';
import { JssRandomLetter } from '../Resources/jss_styles';

const RandomLetter = ({
  classes,
  randomLetters,
  isPlay,
}) => {
  const letters = letter => (
    letter.map((l, i) => (
      <Letter key={i} letter={l[0]} letterStyle={l[1]} isPlay={isPlay} />
    ))
  );

  const letterRows = randomLetters.map((row, i) => (
    <div key={i} className={classes.wordRow}>{letters(row)}</div>
  ));

  return (
    <div>{letterRows}</div>
  );
};

RandomLetter.propTypes = {
  randomLetters: PropTypes.arrayOf(PropTypes.array).isRequired,
  classes: PropTypes.shape().isRequired,
  isPlay: PropTypes.bool.isRequired,
};

export default injectSheet(JssRandomLetter)(RandomLetter);
