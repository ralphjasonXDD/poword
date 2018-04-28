export const JssUserAnswer = {
  answerHolder: {
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
    borderRadius: '4px',
    color: '#545454',
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
    color: '#969696',
    fontSize: '30px',
    margin: '10px auto 0',
  },
  timeHeading: {
    color: '4f4f4f',
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
    backgroundColor: '#efefef',
    borderRadius: '4px',
    color: '#333333',
    fontFamily: 'Lato',
    fontSize: '12px',
    letterSpacing: '0.5px',
    lineHeight: 1,
    '& h4': {
      alignItems: 'baseline',
      backgroundColor: props => (props.isOpponent ? '#1bbf89' : '#56c0e0'),
      borderRadius: '4px 4px 0 0',
      color: '#fff',
      display: 'flex',
      fontSize: '16px',
      fontWeight: 'normal',
      justifyContent: 'space-between',
      padding: '15px',
      margin: '0 auto',
    },
    '& ul': {
      height: '100%',
      listStyle: 'none',
      margin: '0 auto',
      paddingLeft: 0,
      transform: 'rotate(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      '& li': {
        alignItems: 'baseline',
        borderBottom: '1px solid #d8d7d7',
        color: '#4f4f4f',
        display: 'flex',
        fontSize: '13px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        padding: '12px 15px',
        transform: 'rotate(-180deg)',
      },
    },
  },
  score: {
    backgroundColor: props => (props.isOpponent ? 'rgba(27, 191, 137, 0.12)' : 'rgba(86, 192, 224, 0.12)'),
    border: props => (props.isOpponent ? '1px solid rgba(27, 191, 137, 0.50)' : '1px solid rgba(63, 160, 190, 0.30)'),
    borderRadius: '2px',
    color: props => (props.isOpponent ? '#1bbf89' : '#3fa0be'),
    fontSize: '10px',
    padding: '3px 7px',
  },
  totalscore: {
    fontSize: '13px;'
  }
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
    width: '24%',
  },
  wordWrap: {
    borderRadius: '4px',
    width: '52%',
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
    backgroundColor: '#efefef',
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
      backgroundColor: '#e9edee',
      color: '#4e4e4e',
      cursor: 'default',
      display: 'flex',
      height: '80px',
      justifyContent: 'center',
      position: 'relative',
      width: '80px',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
};
