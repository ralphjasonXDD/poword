import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResultScore } from '../Resources/jss_styles.js';

const GameResultScore = (props) => {
  const data = props.isOpponent ? props.data.opponent : props.data.player;
  const status = function() {
    if (props.data.player['score'] === props.data.opponent['score'])
      return "DRAW";
    else
      return resultStatus() ? "YOU WIN" : "YOU LOSE";
  };
  const resultStatus = function () {
    let playerWin = props.data.player['score'] > props.data.opponent['score'];
    if (props.isOpponent) playerWin = !playerWin;
    return playerWin;
  }

  return (
    <div>
      <h3 className={props.classes.status}>
        { status() }
      </h3>
      <h4 className={props.classes.playerName}>
        { data['name'] }
      </h4>
      <div className={props.classes.scoreWrap}>
        <h3 className={props.classes.score}>
          { data['score'] }
        </h3>
      </div>
    </div>
  );
};

export default injectSheet(JssGameResultScore)(GameResultScore);
