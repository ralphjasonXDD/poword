import React from 'react';
import { Link } from 'react-router-dom';
import JssStyle from '../Resources/jss_styles.js';

const RoomStyle = JssStyle.roomStyle;

const Room = () => {
  return (
    <div style={RoomStyle.container}>
      <div style={RoomStyle.challenger}>
        <Link to="/play" style={RoomStyle.link}>+ challenge</Link>
      </div>
      <div style={RoomStyle.listChallenger}>
        <ul>
          <li>Tarzan</li>
          <li>erecka7</li>
          <li>jejemon</li>
          <li>hunterXhunter</li>
        </ul>
      </div>
    </div>
  );
}

export default Room;
