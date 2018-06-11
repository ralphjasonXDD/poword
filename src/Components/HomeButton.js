import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { JssHomeButton } from '../Resources/jss_styles';

const HomeButton = ({ classes }) => (
  <div className={classes.goBackWrap}>
    <Link to="/" className={classes.goBack}>
        Go Back
    </Link>
  </div>
);

export default injectSheet(JssHomeButton)(HomeButton);
