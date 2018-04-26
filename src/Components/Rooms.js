import React from 'react';
import PropTypes from 'prop-types';

const Rooms = ({
  rooms,
  handleClick,
}) => (
  rooms.map((room, index) => (
    <li key={index}>
      <button onClick={() => handleClick(room)}> {room} </button>
    </li>
  ))
);


Rooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Rooms;
