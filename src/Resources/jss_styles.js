export const JssUserAnswer = {
  answerHolder: {
    textAlign: 'center'
  },
  answerBox: {
    alignItems: 'center',
    backgroundColor: '#f2b34c',
    boxShadow: 'inset 0 -3px 0 #ba7e1b',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'text',
    display: 'inline-flex',
    fontFamily: 'Boogaloo',
    fontSize: '38px',
    fontWeight: 'bold',
    height: '40px',
    justifyContent: 'center',
    letterSpacing: '10px',
    margin: '20px auto 0',
    padding: '10px 30px 13px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
};

export const JssTimer = {
  time: {
    color: '#fff',
    margin: '0 auto',
    fontSize: '40px',
    fontFamily: 'Boogaloo',
    backgroundColor: '#0599df',
    padding: '3px 30px 8px',
    borderRadius: '20px',
    borderBottom: '3px solid #407b8e',
    boxShadow: 'inset 0 -3px 0 #015e89',
  },
  timeWrap: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  timeLabel: {
    background: '#f4b34f',
    borderRadius: '4px',
    position: 'absolute',
    padding: '4px 8px',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '10px',
    letterSpacing: '2px',
    top: '-10px',
    fontFamily: 'Boogaloo',
  }
};

export const JssGame = {
  container: {
    maxWidth: '720px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
  listWrap: {
    backgroundColor: '#e9e2b4',
    boxShadow: 'inset 0 -5px 0 #c3b873',
    borderBottom: '5px solid #407b8e',
    borderRadius: '20px',
    padding: '30px',
  },
  listTitle: {
    color: '#6b6122',
    fontSize: '25px',
    marginTop: '0',
    textTransform: 'uppercase',
  },
  list: {
    listStyle: 'none',
    margin: '0 auto',
    paddingLeft: '0',
  },
  listChallenger: {
    border: '1px solid',
  },
  createRoomWrap: {
    padding: '40px 10px',
    textAlign: 'center',
  },
  createRoomButton: {
    border: '0',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    padding: '18px 40px',
    fontSize: '18px',
    textTransform: 'uppercase',
    borderRadius: '40px',
    backgroundColor: '#f2b34c',
    boxShadow: '0 6px 0 #ba7e1b',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 4px 0 #ba7e1b',
      top: '2px',
    },
  },
  link: {
    textDecoration: 'none',
  },
};

export const JssRooms = {
  button: {
    border: '0',
    padding: '11px 20px',
    textTransform: 'uppercase',
    backgroundColor: '#60b861',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '4px',
    boxShadow: '0 4px 0 #52a953',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 2px 0 #52a953',
      top: '2px',
    },
  },
  entry: {
    backgroundColor: '#e0d8a4',
    borderRadius: '5px',
    boxShadow: 'inset 0 0 5px #d4cb93',
    color: '#635919',
    marginBottom: '5px',
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

export const JssPlayerBox = {
  container: {
    backgroundColor: '#e9e2b4',
    boxShadow: 'inset 0 -5px 0 #c3b873',
    borderBottom: '5px solid #407b8e',
    color: '#333',
    fontFamily: 'Lato',
    fontSize: '12px',
    letterSpacing: '0.5px',
    lineHeight: 1,
    paddingTop: '5px',
    position: 'relative',
    '& h4': {
      backgroundColor: props => (props.isOpponent ? '#f4777b' : '#56c0e0'),
      boxShadow: props => (props.isOpponent ? 'inset 0 -2px 0 #d64d52' : 'inset 0 -2px 0 #43afd0'),
      borderBottom: '3px solid #d3cb9a',
      color: '#fff',
      fontSize: '16px',
      margin: '0 auto',
      padding: '15px 10px',
      position: 'relative'
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
        borderBottom: '1px dashed #cac187',
        color: '#4f4f4f',
        display: 'flex',
        fontSize: '13px',
        fontWeight: 'bold',
        justifyContent: 'space-between',
        marginLeft: '15px',
        marginRight: '15px',
        paddingBottom: '12px',
        paddingTop: '12px',
        transform: 'rotate(-180deg)',
      },
    },
  },
  score: {
    backgroundColor: 'rgba(202, 193, 135, 0.30)',
    borderRadius: '2px',
    color: '#8e8021',
    fontSize: '10px',
    padding: '4px 7px',
  },
  totalscore: {
    fontSize: '18px',
    position: 'absolute',
    top: '-41px',
    backgroundColor: '#81cdc0',
    minWidth: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textIndent: '0',
    padding: '10px 5px',
    right: '15px',
    zIndex: '-1',
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
    marginTop: '20px',
  },
  sideBar: {
    paddingLeft: '15px',
    paddingRight: '15px',
    width: '24%',
  },
  wordWrap: {
    borderRadius: '4px',
    width: '324px',
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
    display: 'flex',
    padding: '20px 12px',
  },
  playHeaderCol: {
    flex: '0 0 33.333333%',
  }
};

export const JssRandomLetter = {
  wordRow: {
    display: 'flex',
    fontFamily: 'Boogaloo',
    fontSize: '55px',
    fontWeight: 'bold',
    marginBottom: '5px',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    '& div': {
      alignItems: 'center',
      backgroundColor: '#dadfe2',
      borderRadius: '5px',
      color: '#dadfe2',
      cursor: 'default',
      display: 'flex',
      height: '78px',
      justifyContent: 'center',
      position: 'relative',
      width: '78px',
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
};

export const JssReadyButton = {
  readyButton: {
    border: '0',
    padding: '11px 30px',
    borderRadius: '50px',
    textTransform: 'uppercase',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#60b861',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #3b883b',
    fontFamily: 'Lato',
    position: 'relative',
    '&:hover': {
      boxShadow: '0 2px 0 #3b883b',
      top: '2px'
    },
  },
  readyButtonWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
