import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResult } from '../Resources/jss_styles.js';
import GameResultScore from './GameResultScore';

const GameResult = (props) => {
  return (
    <div className={props.classes.gameResultWrap}>
      <div className={props.classes.gameResultHeader}>
        <h2 className={props.classes.gameResultTitle}>Victory!</h2>
      </div>
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
