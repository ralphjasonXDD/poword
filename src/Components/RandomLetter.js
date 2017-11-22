import React from 'react';
import Letter from './Letter';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const jssStyles = {
  wordRow: {
    display: 'flex',
    fontFamily: 'Boogaloo',
    fontSize: '44px',
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
      height: '70px',
      justifyContent: 'center',
      width: '70px',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
};

const RandomLetter = ({
  classes,
  randomLetters,
}) => {
  const letters = letter => (
    letter.map((l, i) => (
      <Letter key={i} letter={l[0]} color={l[1]} />
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
