import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game';
import Play from './Play';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Game} />
      <Route path="/play/:id" component={Play} />
    </Switch>
  </div>
);

export default Main;
