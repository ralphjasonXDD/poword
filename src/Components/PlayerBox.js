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
    '& ul': {
      height: '485px',
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
  playerName: {
    backgroundColor: props => (props.isOpponent ? '#ffb22b' : '#e74a25'),
    borderRadius: '4px 4px 0 0',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'normal',
    padding: '12px 18px',
    margin: '0 auto',
  },
};

const PlayerBox = ({
  classes,
  username,
  words,
}) => {
  const wordList = words.map(word =>
    <li key={word.id}>{word.text}</li>,
  );

  return (
    <div>
      <div className={classes.container}>
        <h4 className={classes.playerName}>{username}</h4>
        <ul> {wordList} </ul>
      </div>
    </div>
  );
};

PlayerBox.propTypes = {
  username: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(jssStyles)(PlayerBox);
