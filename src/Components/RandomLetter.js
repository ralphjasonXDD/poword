import React from 'react';
import Letter from './Letter';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import JssStyle from '../Resources/jss_styles.js';

const jssStyles = JssStyle.randomLetter;

const RandomLetter = ({
  classes,
  randomLetters,
}) => {
  const letters = letter => (
    letter.map((l, i) => (
      <Letter key={i} letter={l[0]} letterStyle={l[1]} />
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
};

export default injectSheet(jssStyles)(RandomLetter);
