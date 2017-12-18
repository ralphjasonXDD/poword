import React from 'react';
import PropTypes from 'prop-types';
import LetterScores from '../Resources/keycodes.json';

const Letter = (props) => {
  const LetterStyle = {
    letter: {
      color: props.letterStyle[0],
      backgroundColor: props.letterStyle[1]
    },
  };

  return (
    <div style={LetterStyle.letter}>
      {props.letter}
      <span>{ LetterScores.words_score[props.letter] }</span>
    </div>
  );
};

Letter.propTypes = {
  letterStyle: PropTypes.arrayOf(PropTypes.string).isRequired,
  letter: PropTypes.string.isRequired,
};

export default Letter;
