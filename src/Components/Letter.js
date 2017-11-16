import React from 'react';

const Letter = (props) => {

  const LetterStyle = {
    letter: {
      color: props.color
    }
  };

  return (
    <div style={ LetterStyle.letter }>{ props.letter }</div>
  );
}

export default Letter;
