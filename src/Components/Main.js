import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game';
import Play from './Play';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Game} />
      <Route path="/play" component={Play} />
    </Switch>
  </main>
);

export default Main;
