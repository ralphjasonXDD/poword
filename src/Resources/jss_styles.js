export const JssUserAnswer = {
  answerHolder: {
    alignItems: 'center',
    backgroundColor: '#e0e5e9',
    border: '1px solid #d8dcdf',
    borderRadius: '4px',
    color: '#9d9e9f',
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
    color: '#4e4e4e',
    fontSize: '30px',
    margin: '10px auto 0',
  },
  timeHeading: {
    color: '#7f8fa4',
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
    backgroundColor: '#fff',
    border: '1px solid #e6eaee',
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
    backgroundColor: '#fff',
    borderBottom: '1px solid #e6eaee',
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
