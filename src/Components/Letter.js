import React from 'react';
import PropTypes from 'prop-types';

const Letter = (props) => {
  const LetterStyle = {
    letter: {
      color: props.color,
    },
  };

  return (
    <div style={LetterStyle.letter}>{props.letter}</div>
  );
};

Letter.propTypes = {
  color: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
};

export default Letter;
