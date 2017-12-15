export const JssUserAnswer = {
  answerHolder: {
    alignItems: 'center',
    backgroundColor: '#3e3c4b',
    borderRadius: '4px',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'text',
    display: 'flex',
    fontFamily: 'Boogaloo',
    fontSize: '40px',
    fontWeight: 'bold',
    height: '40px',
    justifyContent: 'center',
    letterSpacing: '10px',
    margin: '30px auto',
    maxWidth: '46%',
    padding: '15px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

export const JssTimer = {
  time: {
    color: '#fff',
    fontSize: '30px',
    margin: '10px auto 0',
  },
  timeHeading: {
    color: 'rgba(255,255,255,0.6)',
    margin: '0 auto',
  },
};

export const JssRoom = {
  container: {
    margin: '30px 30% 5% 30%',
  },
  listChallenger: {
    border: '1px solid',
  },
  challenger: {
    margin: '5px 0 5px 0',
    textAlign: 'right',
  },
  link: {
    textDecoration: 'none',
  },
};

export const JssPlayerBox = {
  container: {
    backgroundColor: '#3e3c4b',
    borderRadius: '4px',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '12px',
    letterSpacing: '0.5px',
    lineHeight: 1,
    '& h4': {
      backgroundColor: '#383646',
      borderTop: props => (props.isOpponent ? '3px solid #1bbf89' : '3px solid #56c0e0'),
      borderRadius: '4px 4px 0 0',
      color: props => (props.isOpponent ? '#1bbf89' : '#56c0e0'),
      fontSize: '16px',
      fontWeight: 'normal',
      padding: '15px',
      margin: '0 auto',
    },
    '& ul': {
      height: '100%',
      listStyle: 'none',
      margin: '0 auto',
      paddingLeft: 0,
      '& li': {
        borderBottom: '1px solid #33363f',
        color: '#b9b3c1',
        fontSize: '13px',
        padding: '12px 15px',
      },
    },
  },
  score: {
    backgroundColor: props => (props.isOpponent ? 'rgba(27, 191, 137, 0.12)' : 'rgba(86, 192, 224, 0.12)'),
    border: props => (props.isOpponent ? '1px solid rgba(27, 191, 137, 0.50)' : '1px solid rgba(86, 192, 224, 0.50)'),
    borderRadius: '2px',
    color: props => (props.isOpponent ? '#1bbf89' : '#56c0e0'),
    fontSize: '10px',
    float: 'right',
    padding: '3px 7px',
  },
};

export const JssPlay = {
  container: {
    maxWidth: '720px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  playWrap: {
    display: 'flex',
    marginLeft: '-15px',
    marginRight: '-15px',
    marginTop: '45px',
  },
  sideBar: {
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '25%',
  },
  wordWrap: {
    backgroundColor: '#3e3c4b',
    borderRadius: '4px',
    padding: '20px',
    width: '50%',
  },
  wordRow: {
    display: 'flex',
    fontSize: '72px',
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
      height: '60px',
      justifyContent: 'center',
      width: '60px',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
  playHeader: {
    alignItems: 'center',
    backgroundColor: '#363344',
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    textAlign: 'center',
  },
};

export const JssRandomLetter = {
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
