import React from 'react';
import PropTypes from 'prop-types';

const MuteButton = ({ toggleMute }) => (
  <div className="switch-wrap">
    <span className="switch-label">Sound</span>
    <div className="switch">
      <input type="checkbox" className="switch-checkbox" id="myswitch" onClick={toggleMute} defaultChecked />
      <label className="switch-label" htmlFor="myswitch">
        <span className="switch-inner" />
        <span className="switch-switch" />
      </label>
    </div>
  </div>
);

MuteButton.propTypes = {
  toggleMute: PropTypes.func.isRequired,
};

export default MuteButton;
