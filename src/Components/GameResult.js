import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResult } from '../Resources/jss_styles.js';
import GameResultScore from './GameResultScore';

const GameResult = (props) => {
  const status = function() {
    if (props.gameData.player['score'] === props.gameData.opponent['score'])
      return "DRAW";
    else if (props.gameData.player['score'] > props.gameData.opponent['score'])
      return "YOU WIN";
    else
      return "YOU LOSE";
  };

  return (
    <div className={props.classes.gameResultWrap}>
      <div className={props.classes.gameResultHeader}>
        <h2 className={props.classes.gameResultTitle}>Game over!</h2>
      </div>
      <h3 className={props.classes.status}>
        { status() }
      </h3>
      <div className={props.classes.gameResultCol}>
        <GameResultScore data={props.gameData} />
      </div>
      <div className={props.classes.gameResultCol}>
        <GameResultScore data={props.gameData} isOpponent/>
      </div>
    </div>
  );
};

export default injectSheet(JssGameResult)(GameResult);
