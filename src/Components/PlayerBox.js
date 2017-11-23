import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const jssStyles = {
  container: {
    backgroundColor: '#fff',
    border: '1px solid #e5ebec',
    borderRadius: '4px',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '12px',
    letterSpacing: '0.5px',
    lineHeight: 1,
    '& h4': {
      backgroundColor: props => (props.isOpponent ? '#ffb22b' : '#e74a25'),
      borderRadius: '4px 4px 0 0',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 'normal',
      padding: '10px 15px',
      margin: '0 auto',
    },
    '& ul': {
      height: '323px',
      listStyle: 'none',
      margin: '0 auto',
      overflowY: 'auto',
      paddingLeft: 0,
      '& li': {
        borderBottom: '1px solid #e6eaee',
        color: '#7f8fa4',
        fontSize: '13px',
        padding: '12px 15px',
      },
    },
  },
};

const PlayerBox = ({
  classes,
  username,
  words,
}) => {
  const wordList = words.map((word, index) => (
    <li key={index}>{word}</li>
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
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(jssStyles)(PlayerBox);
