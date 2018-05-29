import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResultScore } from '../Resources/jss_styles.js';

const GameResultScore = (props) => {
  const data = props.isOpponent ? props.data.opponent : props.data.player;
  const status = function() {
    if (props.data.player['score'] === props.data.opponent['score'])
      return "DRAW";
    else
      return resultStatus() ? "WIN" : "LOSE";
  };
  const resultStatus = function () {
    let playerWin = props.data.player['score'] > props.data.opponent['score'];
    if (props.isOpponent) playerWin = !playerWin;
    return playerWin;
  }

  return (
    <div>
      <div>
        Name:
        { data['name'] }
      </div>
      <div className='score'>
        Score:
        { data['score'] }
      </div>
      <div className='status'>
        Status:
        { status() }
      </div>
    </div>
  );
};

export default injectSheet(JssGameResultScore)(GameResultScore);
