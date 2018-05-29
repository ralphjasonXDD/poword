import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResult } from '../Resources/jss_styles.js';
import GameResultScore from './GameResultScore';

const GameResult = (props) => {
  const insertClass = props.gameDone ? "SHOWN" : "HIDDEN";
  return (
    <div>
      <span>
        this will be:
        {insertClass}
      </span>
      <GameResultScore data={props.gameData} />
      <GameResultScore data={props.gameData} isOpponent/>
    </div>
  );
};

export default injectSheet(JssGameResult)(GameResult);
