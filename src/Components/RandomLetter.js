import React, { Component }  from 'react';
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
    }
  }
}

class RandomLetter extends Component {
  constructor (props) {
    super(props);
  }

  letters(letter) {
    return letter.map((l,i) => {
      return <Letter letter = { l[0] } color = { l[1] } />
    });
  }


  render() {
    const { classes } = this.props;

    const letter_rows = this.props.random_letters.map ((row, i) => {
      return <div className = { classes.wordRow }>{ this.letters(row) }</div>
    });

    return (
      <div>{ letter_rows }</div>
    )
  }
}

RandomLetter.propTypes = {
  classes: PropTypes.shape().isRequired,
}

export default injectSheet(jssStyles)(RandomLetter);
