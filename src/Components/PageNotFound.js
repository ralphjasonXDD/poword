import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { JssPageNotFound } from '../Resources/jss_styles';
import HomeButton from './HomeButton';

const PageNotFound = ({ classes }) => (
  <div className={classes.display}>
    <h1> PAGE NOT FOUND </h1>
    <HomeButton />
  </div>
);

export default injectSheet(JssPageNotFound)(PageNotFound);
