import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Scrollbars } from 'react-custom-scrollbars';
import { JssPlayerBox } from '../Resources/jss_styles';

const PlayerBox = (props) => {
  const wordList = props.words.map((word, index) => (
    <li key={index}>
      {word[1]}
      <span className={props.classes.score}>{word[0]}</span>
    </li>
  ));

  return (
    <div>
      <div className={props.classes.container}>
        <h4>
          {props.username}
          <span className={props.classes.totalscore}>{props.totalScore(props.words)}</span>
        </h4>
        <Scrollbars style={{ height: 281 }}>
          <ul>
            <CSSTransitionGroup
              transitionName="word-list"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {wordList}
            </CSSTransitionGroup>
          </ul>
        </Scrollbars>
      </div>
    </div>
  );
};

PlayerBox.propTypes = {
  username: PropTypes.string.isRequired,
  words: PropTypes.array.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default injectSheet(JssPlayerBox)(PlayerBox);
