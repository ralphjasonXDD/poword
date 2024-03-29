import React from 'react';
import injectSheet from 'react-jss';
import { JssGameResultScore } from '../Resources/jss_styles.js';

const GameResultScore = (props) => {
  const data = props.isOpponent ? props.data.opponent : props.data.player;

  return (
    <div>
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
