import React from 'react';
import PropTypes from 'prop-types';

const MuteButton = ({ toggleMute }) => (
  <div className="switch">
    <input type="checkbox" className="switch-checkbox" id="myswitch" onClick={toggleMute} defaultChecked />
    <label className="switch-label" htmlFor="myswitch">
      <span className="switch-inner" />
      <span className="switch-switch" />
    </label>
  </div>
);

MuteButton.propTypes = {
  toggleMute: PropTypes.func.isRequired,
};

export default MuteButton;
