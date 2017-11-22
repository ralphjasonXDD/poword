import React from 'react';
import { Link } from 'react-router-dom';

const RoomStyle = {
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
