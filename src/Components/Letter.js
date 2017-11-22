import React from 'react';
import PropTypes from 'prop-types';

const Letter = (props) => {
  const LetterStyle = {
    letter: {
      color: props.letterStyle[0],
      backgroundColor: props.letterStyle[1]
    },
  };

  return (
    <div style={LetterStyle.letter}>{props.letter}</div>
  );
};

Letter.propTypes = {
  letterStyle: PropTypes.arrayOf(PropTypes.array).isRequired,
  letter: PropTypes.string.isRequired,
};

export default Letter;
