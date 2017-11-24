import React from 'react';
import { Link } from 'react-router-dom';
import { JssRoom } from '../Resources/jss_styles.js';

const Room = () => {
  return (
    <div style={JssRoom.container}>
      <div style={JssRoom.challenger}>
        <Link to="/play" style={JssRoom.link}>+ challenge</Link>
      </div>
      <div style={JssRoom.listChallenger}>
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
