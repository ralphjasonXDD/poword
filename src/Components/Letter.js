import React from 'react';
import PropTypes from 'prop-types';
import LetterScores from '../Resources/keycodes.json';

const Letter = (props) => {
  const LetterStyle = {
    letter: {
      color: props.isPlay ? props.letterStyle[0] : '#f6f8f7' ,
      backgroundColor: props.letterStyle[1],
      boxShadow: props.letterStyle[2],
    },
    wordScore: {
      fontSize: '13px',
      position: 'absolute',
      right: '7px',
      top: '3px',
    },
  };

  return (
    <div style={LetterStyle.letter}>
      {props.letter}
      <span style={LetterStyle.wordScore}>{ LetterScores.words_score[props.letter] }</span>
    </div>
  );
};

Letter.propTypes = {
  letterStyle: PropTypes.arrayOf(PropTypes.string).isRequired,
  letter: PropTypes.string.isRequired,
};

export default Letter;
