import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { JssRooms } from '../Resources/jss_styles';

const Rooms = ({
  rooms,
  handleClick,
  classes,
}) => (
  rooms.map((room) => {
    return (
      <li key={room} className={classes.entry}>
        {room}
        <button className={classes.button} onClick={() => handleClick(room)}>Join</button>
      </li>
    );
  })
);

Rooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default injectSheet(JssRooms)(Rooms);
